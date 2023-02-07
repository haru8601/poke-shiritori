import { SPECIAL_WORDS } from "@/const/specialWords";

export const getShiritoriWord = (pokeName: string): string => {
  const specialCharReg = new RegExp(
    Object.keys(SPECIAL_WORDS.shiritoriPronunciationMap).join("|"),
    "g"
  );
  /* 特殊文字の変換処理 */
  const replacedPokeName = pokeName.replaceAll(
    specialCharReg,
    (str) => SPECIAL_WORDS.shiritoriPronunciationMap[str]
  );
  /* 文字を逆順にしてしりとり可能な単語を見つけ次第返却 */
  return (
    replacedPokeName
      .split("")
      .reverse()
      .find((char) => !SPECIAL_WORDS.notLastWordList.includes(char)) || ""
  );
};
