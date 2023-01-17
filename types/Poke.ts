/* 種族値やタイプ情報 */
export type Poke = {
  id: number;
  name: PokeName;
  type: PokeType[];
  base: PokeBase;
  imgPath: string;
};

/* 言語別の名前 */
type PokeName = {
  japanese: string;
  english?: string;
  french?: string;
  chinese?: string;
};

/* タイプ */
type PokeType =
  | "Normal"
  | "Fire"
  | "Water"
  | "Grass"
  | "Electric"
  | "Ice"
  | "Fighting"
  | "Poison"
  | "Ground"
  | "Flying"
  | "Psychic"
  | "Bug"
  | "Rock"
  | "Ghost"
  | "Dragon"
  | "Dark"
  | "Steel"
  | "Fairy";

/* 種族値 */
type PokeBase = {
  h: number;
  a: number;
  b: number;
  c: number;
  d: number;
  s: number;
};
