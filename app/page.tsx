import { Metadata } from "next";
import { headers } from "next/headers";
import TooManyRequest from "@/components/Error/429";
import Top from "@/components/Top/contaniner";
import { PATH } from "@/const/path";
import { getPokeList } from "@/lib/getPokeList";
import limitChecker from "@/lib/limitChecker";
import { getPokeImg } from "@/lib/pokeapi/getPokeImg";
import { Poke, PokeMap } from "@/types/Poke";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_URL ||
      "https://www.pikachu-unown.com/"
  ),
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
    images: [PATH.defaultImg],
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
    return <TooManyRequest />;
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
    poke.skip = false;
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
