import { Poke, PokeMap } from "@/types/Poke";

export default function getUnusedPokeList(pokeMap: PokeMap): Poke[] {
  return Object.values(pokeMap).filter((poke) => poke.status == undefined);
}
