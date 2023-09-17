import { Dispatch, SetStateAction } from "react";
import { PATH } from "@/const/path";
import { Poke, PokeMap } from "@/types/Poke";
import { PokeApi } from "@/types/PokeApi";

export const usePokeApi = () => {
  /* 今回はprivateでしか使わない */
  const fetchPoke = async (id: number): Promise<PokeApi | void> => {
    const res = await fetch(`${PATH.pokeapiBaseUrl}/${id}`).catch(
      (err: Error) => {
        console.log("failed to fetch data from pokeApi.");
        console.log(err);
        return;
      }
    );
    if (!res || !res.ok) {
      console.log("fetched data from pokeApi is NOT ok.");
      return;
    }
    return res.json() as Promise<PokeApi>;
  };

  /**
   * 画像を取得してMapに反映
   * @param poke
   * @param setter
   */
  const setPokeImg = async (
    poke: Poke,
    setter: Dispatch<SetStateAction<PokeMap>>
  ) => {
    fetchPoke(poke.id)
      .then((res) =>
        setter((map) => {
          // 非同期で不整合を起こさないよう
          // thenが実行された時の最新のmapを用いて更新
          map[poke.id].imgPath =
            res?.sprites.other["official-artwork"].front_default ||
            PATH.defaultImg;
          // レンダリングさせるためディープコピー
          return JSON.parse(JSON.stringify(map));
        })
      )
      .catch((err: Error) => {
        console.log("get image error.");
        console.log(err);
      });
  };

  return { setPokeImg } as const;
};
