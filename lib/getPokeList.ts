import fs from "fs";
import path from "path";
import { Poke } from "@/types/Poke";

// リロードで再取得しないよう手動でサーバー側にキャッシュを作成
let pokeList: Poke[] = [];

/* ポケ一覧取得 */
export const getPokeList = () => {
  if (pokeList.length == 0) {
    pokeList = JSON.parse(
      fs
        .readFileSync(path.join(process.cwd(), "const", "pokedex.json"))
        .toString()
    );
  }
  return pokeList;
};
