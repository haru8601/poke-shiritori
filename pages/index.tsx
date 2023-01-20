import Head from "next/head";
import Top from "@/components/Top/contaniner";
import { Poke } from "@/types/Poke";
import fs from "fs";

type Props = {
  pokeList: Poke[];
  firstPoke: Poke;
};

export default function TopPage(props: Props) {
  return (
    <>
      <Head>
        <title>ポケモンしりとり</title>
        <meta
          name="description"
          content="ポケモンしりとりオンラインの専用サイトです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "100vh" }} className="mt-2 mx-4">
        <Top pokeList={props.pokeList} firstPoke={props.firstPoke} />
      </main>
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  /* ポケ一覧取得 */
  const pokeList = JSON.parse(
    fs.readFileSync("const/pokedex.json").toString()
  ) as Poke[];
  /* 最初のポケ設定 */
  let firstPoke: Poke | undefined = void 0;
  while (!firstPoke || firstPoke.name.japanese.endsWith("ン")) {
    firstPoke = pokeList[Math.floor(Math.random() * pokeList.length)];
  }

  return { props: { pokeList, firstPoke } };
}
