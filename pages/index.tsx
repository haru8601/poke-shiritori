import Top from "@/components/Top/contaniner";
import { Poke } from "@/types/Poke";
import fs from "fs";

export default function TopPage(props: { pokedex: Poke[] }) {
  return <Top pokedex={props.pokedex}/>;
}

export async function getServerSideProps() {
  /* ポケ一覧取得 */
  const pokedex = JSON.parse(
    fs.readFileSync("const/pokedex.json").toString()
  ) as Poke[];
  return {
    props: { pokedex },
  };
}