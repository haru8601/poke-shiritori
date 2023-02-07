import { SPECIAL_WORDS } from "@/const/specialWords";

/**
 * 特殊文字の表記揺れを置換して統一
 * @param kata カタカナ
 * @returns 置換後のカタカナ
 */
export const replaceSpecial = (kata: string): string => {
  Object.entries(SPECIAL_WORDS.spellingFixMap).forEach((entry) => {
    kata = kata.replace(new RegExp(entry[0]), entry[1]);
  });
  return kata;
};
