import { Poke, PokeMap } from "@/types/Poke";
import getUnusedPokeList from "../poke/getUnusedPokeList";

export default function getCandidates(
  pokeMap: PokeMap,
  lastWord: string
): Poke[] {
  /* ポケ一覧からアンサーの候補を取得 */
  let candidateList: Poke[] = getUnusedPokeList(pokeMap).filter((poke) =>
    poke.name.japanese.startsWith(lastWord)
  );

  /* なるべく負けない選択 */
  const tmpCandidateList = candidateList.filter(
    (poke) => !poke.name.japanese.endsWith("ン")
  );
  if (tmpCandidateList.length) {
    candidateList = tmpCandidateList;
  }
  return candidateList;
}
