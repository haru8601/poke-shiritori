import fs from "fs";
import path from "path";
import { cache } from "react";
import { Poke } from "@/types/Poke";

/* ポケ一覧取得 */
export const getPokeList = cache(
  () =>
    JSON.parse(
      fs
        .readFileSync(path.join(process.cwd(), "const", "pokedex.json"))
        .toString()
    ) as Poke[]
);
