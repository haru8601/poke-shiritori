import { Dispatch, SetStateAction } from "react";
import { getPokeImg } from "@/lib/pokeapi/getPokeImg";
import { Poke, PokeMap } from "@/types/Poke";

export const usePokeApi = () => {
  /**
   * 画像を取得してMapに反映
   * @param poke
   * @param setter
   */
  const setPokeImg = async (
    poke: Poke,
    setter: Dispatch<SetStateAction<PokeMap>>
  ) => {
    getPokeImg(poke)
      .then((res) =>
        setter((map) => {
          // 非同期で不整合を起こさないよう
          // thenが実行された時の最新のmapを用いて更新
          map[poke.id].imgPath = res;
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
