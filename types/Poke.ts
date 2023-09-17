/* 言語別の名前 */
type PokeName = {
  japanese: string;
  english?: string;
  french?: string;
  chinese?: string;
};

/* タイプ */
export type PokeType =
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

type PokeStatus = {
  owner: "me" | "enermy" | "first";
  order: number;
};

/* 種族値やタイプ情報 */
export type Poke = {
  id: number;
  name: PokeName;
  type: PokeType[];
  base: PokeBase;
  imgPath: string;
  status?: PokeStatus;
};

export type PokeMap = { [key: number]: Poke };
