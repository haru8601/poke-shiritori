import { PATH } from "@/const/path";
import { Poke } from "@/types/Poke";
import { PokeApi } from "@/types/PokeApi";

/**
 * SSR側で画像を同期的に取得
 */
export const getPokeImg = async (poke: Poke) => {
  const res = await fetch(`${PATH.pokeapiBaseUrl}/${poke.id}`)
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
