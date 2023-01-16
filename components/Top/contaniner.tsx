import { useSleep } from "@/hook/useTimer";
import { Poke } from "@/types/Poke";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TopPresenter from "./presenter";

type Props = {
  pokeList: Poke[];
};

export default function Top({ pokeList }: Props) {
  const [targetPoke, setTargetPoke] = useState<string>("");
  const [sentPoke, setSentPoke] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [myPokeList, setMyPokeList] = useState<string[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<string[]>([]);
  const { sleep } = useSleep();

  useEffect(() => {
    /* 最初のワード設定 */
    let firstPokeName = "";
    while (!firstPokeName.length || firstPokeName.endsWith("ン")) {
      firstPokeName =
        pokeList[Math.floor(Math.random() * pokeList.length)].name.japanese;
    }
    setTargetPoke(firstPokeName);
    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      return;
    }
    /* keyCodeは非推奨だが代替案があまりない(isComposing等は挙動が微妙)のでこのまま使用 */
    if (e.keyCode == 13) {
      handleSubmitPoke();
    }
  };

  const handleChangePoke = (e: ChangeEvent<HTMLInputElement>) => {
    setSentPoke(e.target.value);
  };
  const handleSubmitPoke = () => {
    /* しりとりになっているかのチェック */
    const target =
      (enermyPokeList.length && enermyPokeList[enermyPokeList.length - 1]) ||
      targetPoke;
    const enermyLastWord = getShiritoriWord(target);
    if (!sentPoke.startsWith(enermyLastWord)) {
      setPokeErr(`${enermyLastWord}から始まる名前にしてください`);
      return;
    }
    /* 一覧に存在するかチェック */
    if (!pokeList.find((poke) => poke.name.japanese == sentPoke)) {
      setPokeErr("存在しないポケモンです");
      return;
    }

    setPokeErr("");
    setTargetPoke(sentPoke);

    /* 記録として配列に格納 */
    const tmpMyPokeList = Array.from(myPokeList);
    tmpMyPokeList.push(sentPoke);
    setMyPokeList(tmpMyPokeList);

    const lastWord = getShiritoriWord(sentPoke);
    /* ポケ一覧からアンサーの候補を取得 */
    const candidateNameList = pokeList
      .filter((poke) => poke.name.japanese.startsWith(lastWord))
      .map((poke) => poke.name.japanese);
    const tmpEnermyPokeList = Array.from(enermyPokeList);
    /* 候補からランダムに選択 */
    const tmpTarget =
      candidateNameList[Math.floor(Math.random() * candidateNameList.length)];
    tmpEnermyPokeList.push(tmpTarget);
    /* 自分のポケリセット */
    setSentPoke("");
    (async () => {
      await sleep(3000);
      /* 一定時間後に返答 */
      setTargetPoke(tmpTarget);
      setEnermyPokeList(tmpEnermyPokeList);
    })();
  };
  return (
    <TopPresenter
      pokeList={pokeList}
      targetPoke={targetPoke}
      sentPoke={sentPoke}
      pokeErr={pokeErr}
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      onChangePoke={handleChangePoke}
      onKeydown={handleKeydown}
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
