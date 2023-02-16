import fs from "fs";
import path from "path";
import { NextApiRequest } from "next";
import Error from "next/error";
import Head from "next/head";
import Top from "@/components/Top/contaniner";
import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import limitChecker from "@/lib/limitChecher";
import styles from "@/styles/Top.module.css";
import { Poke } from "@/types/Poke";

type Props = {
  err?: {
    code: number;
    message: string;
  };
  data?: {
    pokeList: Poke[];
    firstPoke: Poke;
  };
};

export default function TopPage(props: Props) {
  if (props.err) {
    return <Error statusCode={props.err.code} title={props.err.message} />;
  }
  return (
    <>
      <Head>
        <title>ポケモンしりとり by haroot</title>
        <meta
          name="description"
          content="ポケモンしりとりオンラインの専用サイトです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="harootが作成したポケモンしりとり用サイトです。"
        />
        {/* Twitterカード用 */}
        {/* twitter以外でも使えるやつ */}
        <meta property="og:type" content="website" />
        <meta id="share-title" property="og:title" content="ポケモンしりとり" />
        <meta
          id="share-detail"
          property="og:description"
          content="harootが作成したポケモンの名前でしりとりが出来るサイトです。"
        />
        <meta id="share-url" property="og:url" content={PATH.site} />
        <meta property="og:site_name" content="haroot.net" />
        <meta property="og:image" content={PATH.site + PATH.defaultImg} />
        {/* <!--twitter特有の設定--> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@haroot_net" />
      </Head>
      <main className={styles.main}>
        <Top
          pokeList={props.data!.pokeList}
          firstPoke={props.data!.firstPoke}
        />
      </main>
    </>
  );
}

export async function getServerSideProps({
  req,
}: {
  req: NextApiRequest;
}): Promise<{ props: Props }> {
  /* Poke Apiに負荷をかけない為リクエスト上限を設ける */
  const clientIp = (req.headers["x-real-ip"] as string) || "IP_NOT_FOUND";
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

  return { props: { data: { pokeList, firstPoke } } };
}
