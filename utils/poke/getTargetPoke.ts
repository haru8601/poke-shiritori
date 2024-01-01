import { Poke, PokeMap } from "@/types/Poke";
import getNewestPoke from "../shiritori/getNewestPoke";

export default function getTargetPoke(
  pokeMap: PokeMap,
  firstPoke: Poke,
  isMyTurn: boolean
): Poke {
  const myPoke = getNewestPoke(pokeMap, true);
  const enermyPoke = getNewestPoke(pokeMap, false);

  if (!myPoke) {
    // 初期状態
    return firstPoke;
  } else if (!enermyPoke) {
    // 自分だけ回答した状態
    return myPoke;
  } else if (isMyTurn) {
    // 自分のターン
    return enermyPoke;
  } else {
    // 相手のターン
    return myPoke;
  }
}
