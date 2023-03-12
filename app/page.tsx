import fs from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import Top from "@/components/Top/contaniner";
import { CONFIG } from "@/const/config";
import { CookieNames } from "@/const/cookieNames";
import { PATH } from "@/const/path";
import limitChecker from "@/lib/limitChecher";
import { Poke } from "@/types/Poke";
import { Score } from "@/types/Score";
import { getCurrentUrl } from "@/utils/getCurrentUrl";

export const metadata = {
  title: "ポケモンしりとり by haroot",
  description: "harootが作成したポケモンしりとり用サイトです。",
  icons: {
    icon: "/favicon.ico",
  },
  //  Twitterカード用
  twitter: {
    card: "summary",
    title: "ポケモンしりとり",
    description: "harootが作成したポケモンの名前でしりとりが出来るサイトです。",
    images: [`${getCurrentUrl()}${PATH.defaultImg}`],
    siteId: "1370600922418536449",
    creator: "@haroot_net",
    creatorId: "1370600922418536449",
  },
};

export default async function Page() {
  //TODO: リクエストIP取得
  /* Poke Apiに負荷をかけない為リクエスト上限を設ける */
  const clientIp = headers().get("x-forwarded-for") || "IP_NOT_FOUND";
  try {
    // 上限はポケモン数
    await limitChecker().check(clientIp);
  } catch (err) {
    console.log(err);
    return {
      props: {
        err: {
          code: 429,
          message: `Too many requests. Try again after ${
            CONFIG.requestLimit.expired / 1000
          } seconds`,
        },
      },
    };
  }

  /* ポケ一覧取得 */
  const pokeList = JSON.parse(
    fs
      .readFileSync(path.join(process.cwd(), "const", "pokedex.json"))
      .toString()
  ) as Poke[];
  /* 最初のポケ設定 */
  let firstPoke: Poke | undefined = void 0;
  let checkCount = 0;
  while (!firstPoke || firstPoke.name.japanese.endsWith("ン")) {
    checkCount++;
    firstPoke = pokeList[Math.floor(Math.random() * pokeList.length)];
    if (checkCount > pokeList.length) break;
  }

  /* ランキング取得はawaitしなくていい */
  const scoreAllPromise: Promise<Score[]> = fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/ranking`,
    {
      cache: cookies().get(CookieNames.updateFlg) ? "no-store" : "force-cache",
    }
  )
    .then((response) => {
      if (!response.ok) {
        console.log("response status from ranking is NOT ok.");
        return [];
      }
      return response.json().catch((err) => {
        console.log("err while parsing scoreAll.");
        console.log(err);
        return [];
      }) as Promise<Score[]>;
    })
    .catch((err: Error) => {
      console.log("error while fetching ranking.");
      console.log(err);
      return [];
    });

  return (
    <Top
      pokeList={pokeList}
      firstPoke={firstPoke}
      scoreAllPromise={scoreAllPromise}
    />
  );
}
