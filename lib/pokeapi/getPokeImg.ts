import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import { Poke } from "@/types/Poke";
import { PokeApi } from "@/types/PokeApi";

/**
 * ポケモンの画像取得
 */
export const getPokeImg = async (poke: Poke) => {
  const res = await fetch(`${PATH.pokeapiBaseUrl}/${poke.id}`, {
    next: { revalidate: CONFIG.revalidate.api },
  })
    .then((res) => {
      if (!res || !res.ok) {
        console.log("fetched data from pokeApi is NOT ok.");
        return;
      }
      return res.json() as Promise<PokeApi>;
    })
    .catch((err: Error) => {
      console.log("failed to fetch data from pokeApi.");
      console.log(err);
      return;
    });
  return (
    res?.sprites.other["official-artwork"].front_default || PATH.defaultImg
  );
};
