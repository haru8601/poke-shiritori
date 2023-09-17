import { Poke, PokeMap } from "@/types/Poke";

/**
 * 自分(または相手)の最後に出したポケモンを抽出
 */
export default function getNewestPoke(
  pokeMap: PokeMap,
  isMine: boolean
): Poke | undefined {
  let lastestId = -1;
  let newestPoke: Poke | undefined = void 0;
  const pokeList = Object.values(pokeMap).filter((poke) => {
    if (isMine == true) {
      return poke.status?.owner == "me";
    }
    return poke.status?.owner == "enermy";
  });
  for (const poke of pokeList) {
    if (poke.status && lastestId < poke.status.order) {
      newestPoke = poke;
      lastestId = poke.status.order;
    }
  }
  return newestPoke;
}
