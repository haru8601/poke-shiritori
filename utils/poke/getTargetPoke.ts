import { Poke, PokeMap } from "@/types/Poke";
import getNewestPoke from "../shiritori/getNewestPoke";

export default function getTargetPoke(pokeMap: PokeMap, firstPoke: Poke): Poke {
  const myPoke = getNewestPoke(pokeMap, true);
  const enermyPoke = getNewestPoke(pokeMap, false);

  if (myPoke == undefined) {
    // firstPokeのみ存在
    return firstPoke;
  } else if (enermyPoke == undefined) {
    // myPokeのみ存在
    return myPoke;
  } else if (myPoke.status!.order > enermyPoke.status!.order) {
    // myPokeが最新
    return myPoke;
  } else {
    // enermyPokeが最新
    return enermyPoke;
  }
}
