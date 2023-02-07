import { Diff } from "@/types/Diff";
import { Poke } from "@/types/Poke";

/**
 * CPU側のアンサー取得
 * @param pokeList ポケリスト
 * @param lastWord ユーザー側の最後の文字
 * @param usedPokeNameList 使用済みポケリスト
 * @param diff 難易度
 * @returns アンサーポケ
 */
export const getAnswer = (
  pokeList: Poke[],
  lastWord: string,
  usedPokeNameList: string[],
  diff: Diff
): Poke | undefined => {
  /* ポケ一覧からアンサーの候補を取得 */
  let candidateList = pokeList.filter(
    (poke) =>
      poke.name.japanese.startsWith(lastWord) &&
      !usedPokeNameList.includes(poke.name.japanese)
  );

  /* hardの場合はなるべく負けない選択 */
  if (diff == "hard") {
    const tmpCandidateList = candidateList.filter(
      (poke) => !poke.name.japanese.endsWith("ン")
    );
    if (tmpCandidateList.length) {
      candidateList = tmpCandidateList;
    }
  }

  /* 候補からランダムに選択 */
  const tmpTarget =
    (candidateList.length &&
      candidateList[Math.floor(Math.random() * candidateList.length)]) ||
    void 0;
  return tmpTarget;
};
