import Head from "next/head";
import Top from "@/components/Top/contaniner";
import { Poke } from "@/types/Poke";
import fs from "fs";

export default function TopPage(props: { pokeList: Poke[] }) {
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
      <main className="p-8 h-screen flex flex-col">
        <Top pokeList={props.pokeList} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  /* ポケ一覧取得 */
  const pokeList = JSON.parse(
    fs.readFileSync("const/pokedex.json").toString()
  ) as Poke[];
  return {
    props: { pokeList },
  };
}
