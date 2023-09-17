import { Poke, PokeMap } from "@/types/Poke";
import getCandidates from "./getCandidates";

/**
 * CPU側のアンサー取得
 * @param pokeList ポケリスト
 * @param lastWord ユーザー側の最後の文字
 * @param usedPokeNameList 使用済みポケリスト
 * @returns アンサーポケ
 */
export const getAnswer = (
  pokeMap: PokeMap,
  lastWord: string
): Poke | undefined => {
  /* ポケ一覧からアンサーの候補を取得 */
  const candidateList = getCandidates(pokeMap, lastWord);

  /* 候補からランダムに選択 */
  const tmpTarget =
    (candidateList.length &&
      candidateList[Math.floor(Math.random() * candidateList.length)]) ||
    void 0;
  return tmpTarget;
};
