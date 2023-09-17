import { Dispatch, SetStateAction } from "react";
import { PokeMap } from "@/types/Poke";

export default function changePokeMap(
  pokeMap: PokeMap,
  setter: Dispatch<SetStateAction<PokeMap>>
) {
  // レンダリングさせるためディープコピー
  setter(JSON.parse(JSON.stringify(pokeMap)));
}
