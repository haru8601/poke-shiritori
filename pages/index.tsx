import Top from "@/components/Top/contaniner";
import { Poke } from "@/types/Poke";
import fs from "fs";

export default function TopPage(props: { pokeList: Poke[] }) {
  return <Top pokeList={props.pokeList} />;
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
