import { Poke, PokeMap } from "@/types/Poke";

export default function getPokeHistory(
  pokeMap: PokeMap,
  isMine: boolean
): Poke[] {
  return Object.values(pokeMap)
    .filter((poke) => {
      if (isMine) {
        return poke.status?.owner == "me";
      } else {
        return poke.status?.owner == "enermy";
      }
    })
    .sort((a, b) => {
      return a.status!.order - b.status!.order;
    });
}
