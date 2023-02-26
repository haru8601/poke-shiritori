import fs from "fs";
import path from "path";
import { headers } from "next/headers";
import Top from "@/components/Top/contaniner";
import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import limitChecker from "@/lib/limitChecher";
import { Poke } from "@/types/Poke";
import { Score } from "@/types/Score";
import fetchScoreAll from "./mysql/select";

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
    images: [PATH.site + PATH.defaultImg],
    siteId: "1370600922418536449",
    creator: "@haroot_net",
    creatorId: "1370600922418536449",
  },
};

// export default async function Page() {
//   const { fetchScoreAll, storeScore } = mysqlUtils();

//   const cookie = cookies().getAll() as unknown as typeof CookieNames;
//   /* 前回のデータがあればランキング更新 */
//   if (cookie.shiritori_score) {
//     await storeScore(
//       cookie.shiritori_nickname || "unown",
//       cookie.shiritori_score
//     );
//     cookies().delete(CookieNames.shiritori_score);
//   }

//   /* Poke Apiに負荷をかけない為リクエスト上限を設ける */
//   const clientIp = headers().get("x-forwarded-for") || "IP_NOT_FOUND";
//   try {
//     // 上限はポケモン数
//     await limitChecker().check(clientIp);
//   } catch (err) {
//     console.log(err);
//     return {
//       props: {
//         err: {
//           code: 429,
//           message: `Too many requests. Try again after ${
//             CONFIG.requestLimit.expired / 1000
//           } seconds`,
//         },
//       },
//     };
//   }

//   /* ポケ一覧取得 */
//   const pokeList = JSON.parse(
//     fs
//       .readFileSync(path.join(process.cwd(), "const", "pokedex.json"))
//       .toString()
//   ) as Poke[];
//   /* 最初のポケ設定 */
//   let firstPoke: Poke | undefined = void 0;
//   let checkCount = 0;
//   while (!firstPoke || firstPoke.name.japanese.endsWith("ン")) {
//     checkCount++;
//     firstPoke = pokeList[Math.floor(Math.random() * pokeList.length)];
//     if (checkCount > pokeList.length) break;
//   }

//   /* ランキング取得 */
//   const scoreAll: Score[] = await fetchScoreAll();

//   return (
//     <>
//       <main className={styles.main}>
//         <Top pokeList={pokeList} firstPoke={firstPoke} scoreAll={scoreAll} />
//       </main>
//     </>
//   );
// }
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

  /* ランキング取得 */
  const scoreAll: Score[] = (await fetchScoreAll()) as Score[];

  return <Top pokeList={pokeList} firstPoke={firstPoke} scoreAll={scoreAll} />;
}
