import { headers } from "next/headers";
import Top from "@/components/Top/contaniner";
import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import { getPokeList } from "@/lib/getPokeList";
import limitChecker from "@/lib/limitChecher";
import { getPokeImg } from "@/lib/pokeapi/getPokeImg";
import { Poke, PokeMap } from "@/types/Poke";

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
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}${PATH.defaultImg}`],
    siteId: "1370600922418536449",
    creator: "@haroot_net",
    creatorId: "1370600922418536449",
  },
};

export default async function Page() {
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
  const pokeList = getPokeList();
  /* 最初のポケ設定 */
  let firstPoke: Poke | undefined = void 0;
  let checkCount = 0;
  while (!firstPoke || firstPoke.name.japanese.endsWith("ン")) {
    checkCount++;
    firstPoke = pokeList[Math.floor(Math.random() * pokeList.length)];
    if (checkCount > pokeList.length) break;
  }
  const pokeMap: PokeMap = {};
  /* ポケモンMapの初期化 */
  for (const poke of pokeList) {
    pokeMap[poke.id] = poke;
  }
  /* 最初のポケモンを登録 */
  pokeMap[firstPoke.id].status = {
    owner: "first",
    order: 0,
  };
  /* 最初のポケモンだけ別管理のため画像も先に取得 */
  firstPoke.imgPath = await getPokeImg(firstPoke);

  // (最初)サーバーのみの情報が出る時にCSSが変わってしまうので
  // firstPokeも渡す
  return <Top initMap={pokeMap} firstPoke={firstPoke} />;
}
