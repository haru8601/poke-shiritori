import { SetStateAction } from "react";
import { PATH } from "@/const/path";
import { Poke } from "@/types/Poke";
import { PokeApi } from "@/types/PokeApi";

export const usePokeApi = () => {
  /* 今回はprivateでしか使わない */
  const fetchPoke = async (id: number): Promise<PokeApi | void> => {
    return await fetch(`${PATH.pokeapiBaseUrl}/${id}`)
      .then((response: Response) => {
        if (!response.ok) {
          console.log("failed to fetch data from pokeApi.");
          return;
        }
        return response.json() as Promise<PokeApi>;
      })
      .catch((err: Error) => {
        console.log(err);
        return;
      });
  };

  /* 画像を取得し、レンダリングするため再度セッターに追加する */
  const setPokeImg = async (
    targetPoke: Poke,
    setTargetPoke?: (value: SetStateAction<Poke>) => void
  ) => {
    const tmpResponse = await fetchPoke(targetPoke.id);
    targetPoke.imgPath =
      tmpResponse?.sprites.other["official-artwork"].front_default ||
      PATH.defaultImg;
    /* targetPokeが既に他のに変わってたら処理しない */
    setTargetPoke &&
      setTargetPoke(
        (currentTargetPoke) =>
          (currentTargetPoke.id == tmpResponse?.id &&
            (JSON.parse(JSON.stringify(targetPoke)) as Poke)) ||
          currentTargetPoke
      );
  };

  return { setPokeImg } as const;
};
