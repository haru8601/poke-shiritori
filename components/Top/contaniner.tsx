import { Poke } from "@/types/Poke";
import { ChangeEvent, useState } from "react";
import TopPresenter from "./presenter";

type Props = {
  pokedex: Poke[];
};

export default function Top({ pokedex }: Props) {
  const [sentPoke, setSentPoke] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [myPokeList, setMyPokeList] = useState<string[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<string[]>([]);
  const handleChangePoke = (e: ChangeEvent<HTMLInputElement>) => {
    setSentPoke(e.target.value);
  };
  const handleSubmitPoke = () => {
    const candidateNameList: string[] = [];
    /* しりとりになっているかのチェック */
    if (enermyPokeList.length) {
      const enermyLastWord = getShiritoriWord(
        enermyPokeList[enermyPokeList.length - 1]
      );
      if (!sentPoke.startsWith(enermyLastWord)) {
        setPokeErr(`${enermyLastWord}から始まる名前にしてください`);
        return;
      }
    }
    /* 存在するかチェック */
    if (!pokedex.find((poke) => poke.name.japanese == sentPoke)) {
      setPokeErr("存在しないポケモンです");
      return;
    }

    setPokeErr("");
    /* 記録として配列に格納 */
    const tmpMyPokeList = myPokeList;
    tmpMyPokeList.push(sentPoke);
    setMyPokeList(tmpMyPokeList);

    const lastWord = getShiritoriWord(sentPoke);
    console.log(lastWord);
    /* ポケ一覧からアンサーの候補を取得 */
    pokedex.forEach((poke) => {
      if (poke.name.japanese.startsWith(lastWord)) {
        candidateNameList.push(poke.name.japanese);
      }
    });
    const tmpEnermyPokeList = enermyPokeList;
    /* 候補からランダムに選択 */
    tmpEnermyPokeList.push(
      candidateNameList[Math.floor(Math.random() * candidateNameList.length)]
    );
    setEnermyPokeList(tmpEnermyPokeList);
    /* 自分のポケリセット */
    setSentPoke("");
  };
  return (
    <TopPresenter
      pokedex={pokedex}
      targetPoke={sentPoke}
      pokeErr={pokeErr}
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      onChangePoke={handleChangePoke}
      onSubmitPoke={handleSubmitPoke}
    />
  );
}

const getShiritoriWord = (pokeName: string): string => {
  const notLastList = ["ー", "：", "・", "ッ"];
  const specialCharMap: { [key: string]: string } = {
    "２": "ツー",
    Ｚ: "ゼット",
    "♂": "オス",
    "♀": "メス",
    ァ: "ア",
    ィ: "イ",
    ゥ: "ウ",
    ェ: "エ",
    ォ: "オ",
    ャ: "ヤ",
    ュ: "ユ",
    ョ: "ヨ",
    ヮ: "ワ",
  };
  const specialCharReg = new RegExp(Object.keys(specialCharMap).join("|"), "g");
  /* 特殊文字の変換処理 */
  const replacedPokeName = pokeName.replaceAll(
    specialCharReg,
    (str) => specialCharMap[str]
  );
  for (let i = 0; i < replacedPokeName.length; i++) {
    const targetChar = replacedPokeName.charAt(replacedPokeName.length - 1 - i);
    /* 文字がしりとり出来ない文字でなければ */
    if (!notLastList.includes(targetChar)) {
      return targetChar.toUpperCase();
    }
  }
  return "";
};

if (typeof window !== "undefined") {
  const form = document && document.querySelector("#form");
  form?.addEventListener("submit", (event) => {
    event.stopPropagation();
    event.preventDefault();
  });
}
