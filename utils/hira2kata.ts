/**
 * ひらがなをカタカナに変換
 * @param hira ひらがな
 * @returns カタカナ
 */
export const hira2kata = (hira: string): string => {
  return hira.replaceAll(/[ぁ-ん]/g, (word) =>
    String.fromCharCode(
      ...word.split("").map((char) => char.charCodeAt(0) + 96)
    )
  );
};
