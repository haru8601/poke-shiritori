import { PokeMap } from "@/types/Poke";

export default function getUnusedPokeList(pokeMap: PokeMap) {
  return Object.values(pokeMap).filter((poke) => poke.status == undefined);
}
