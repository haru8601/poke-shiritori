import { usePokeApi } from "@/hook/usePokeApi";
import { useSleep } from "@/hook/useTimer";
import TopPage from "@/pages";
import { Poke } from "@/types/Poke";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TopPresenter from "./presenter";

type Props = React.ComponentProps<typeof TopPage>;

export default function Top({ pokeList, firstPoke }: Props) {
  const [targetPoke, setTargetPoke] = useState<Poke>();
  const [sentPokeName, setSentPokeName] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [myPokeList, setMyPokeList] = useState<Poke[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<Poke[]>([]);
  const [isMyTurn, setMyTurn] = useState<boolean>(true);
  const { sleep } = useSleep();
  const { fetchPoke } = usePokeApi();

  /* strictModeで2回レンダリングされることに注意 */
  useEffect(() => {
    (async () => {
      /* 最初のポケ設定 */
      const tmpTargetResponse = await fetchPoke(firstPoke.id);
      const imgPath =
        tmpTargetResponse.sprites.other["official-artwork"].front_default;
      firstPoke.imgPath = imgPath || "";
      // tmp
      if (!firstPoke.type) {
        firstPoke.type = ["Bug"];
      }
      setTargetPoke(firstPoke);
    })();
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
    setSentPokeName(e.target.value);
  };

  const handleSubmitPoke = async () => {
    /******** バリデーション ********/
    /* しりとりになっているかのチェック */
    const enermyLastWord = getShiritoriWord(
      (enermyPokeList.length &&
        enermyPokeList[enermyPokeList.length - 1].name.japanese) ||
        targetPoke?.name.japanese ||
        ""
    );
    if (!sentPokeName.startsWith(enermyLastWord)) {
      setPokeErr(`${enermyLastWord}から始まる名前にしてください`);
      return;
    }
    /* 一覧に存在するかチェック */
    if (!pokeList.find((poke) => poke.name.japanese == sentPokeName)) {
      setPokeErr("存在しないポケモンです");
      return;
    }

    /* 使用済みかのチェック */
    if (
      myPokeList
        .concat(enermyPokeList)
        .find((poke) => poke.name.japanese == sentPokeName)
    ) {
      setPokeErr("このポケモンは使用済みです");
      return;
    }
    /****************/

    setMyTurn(false);
    setPokeErr("");
    const sentPoke = pokeList.find(
      (poke) => poke.name.japanese == sentPokeName
    )!;
    const sentPokeResponse = await fetchPoke(sentPoke.id);
    const imgPath =
      sentPokeResponse.sprites.other["official-artwork"].front_default;
    sentPoke.imgPath = imgPath || "";
    // tmp
    if (!sentPoke.type) {
      sentPoke.type = ["Bug"];
    }

    setTargetPoke(sentPoke);

    /* 履歴を配列に格納 */
    const tmpMyPokeList = Array.from(myPokeList);
    tmpMyPokeList.push(sentPoke);
    setMyPokeList(tmpMyPokeList);

    const lastWord = getShiritoriWord(sentPokeName);
    /* ポケ一覧からアンサーの候補を取得 */
    const candidateList = pokeList.filter((poke) =>
      poke.name.japanese.startsWith(lastWord)
    );
    const tmpEnermyPokeList = Array.from(enermyPokeList);
    /* 候補からランダムに選択 */
    const tmpTarget =
      candidateList[Math.floor(Math.random() * candidateList.length)];
    const tmpTargetResponse = await fetchPoke(tmpTarget.id);
    const enermyImgPath =
      tmpTargetResponse.sprites.other["official-artwork"].front_default;
    tmpTarget.imgPath = enermyImgPath || "";
    if (!tmpTarget.type) {
      tmpTarget.type = ["Bug"];
    }
    tmpEnermyPokeList.push(tmpTarget);
    /* 自分のポケリセット */
    setSentPokeName("");

    await sleep(3000);
    /* 一定時間後に返答 */
    setTargetPoke(tmpTarget);
    setEnermyPokeList(tmpEnermyPokeList);
    setMyTurn(true);
  };
  return (
    <TopPresenter
      pokeList={pokeList}
      isMyTurn={isMyTurn}
      targetPoke={targetPoke!}
      sentPokeName={sentPokeName}
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
