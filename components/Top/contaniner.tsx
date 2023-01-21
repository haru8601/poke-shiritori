import { PATH } from "@/const/path";
import { usePokeApi } from "@/hook/usePokeApi";
import { useSleep } from "@/hook/useTimer";
import TopPage from "@/pages";
import { Diff } from "@/types/Diff";
import { Poke } from "@/types/Poke";
import { PokeApi } from "@/types/PokeApi";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TopPresenter from "./presenter";

type Props = React.ComponentProps<typeof TopPage>;

export default function Top({ pokeList, firstPoke }: Props) {
  const [targetPoke, setTargetPoke] = useState<Poke>(firstPoke);
  const [sentPokeName, setSentPokeName] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [myPokeList, setMyPokeList] = useState<Poke[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<Poke[]>([]);
  const [isMyTurn, setMyTurn] = useState<boolean>(true);
  const [finishType, setFinishType] = useState<"" | "win" | "lose">("");
  const [usedPokeCount, setUsedPokeCount] = useState<number>(1);
  const { sleep } = useSleep();
  const { fetchPoke } = usePokeApi();
  const [usedPokeNameList, setUsedPokeNameList] = useState<string[]>([
    firstPoke.name.japanese,
  ]);
  const [diff, setDiff] = useState<Diff>("normal");

  /* strictModeで2回レンダリングされることに注意 */
  useEffect(() => {
    let tmpTargetResponse: PokeApi | undefined = void 0;
    (async () => {
      /* 最初のポケ画像取得 */
      tmpTargetResponse = await fetchPoke(firstPoke.id);
      const imgPath =
        tmpTargetResponse!.sprites.other["official-artwork"].front_default;
      firstPoke.imgPath = imgPath || PATH.defaultImg;
      console.log(firstPoke);
      /* レンダリングさせる(変更を伝える)ためディープコピー */
      setTargetPoke(JSON.parse(JSON.stringify(firstPoke)));
    })();

    /* 難易度をセッションから取得 */
    setDiff((sessionStorage.getItem("diff") as Diff) || "normal");
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
        firstPoke.name.japanese
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
    if (usedPokeNameList.find((pokeName) => pokeName == sentPokeName)) {
      setPokeErr("このポケモンは使用済みです");
      return;
    }
    /****************/

    setMyTurn(false);
    setPokeErr("");
    const sentPoke = pokeList.find(
      (poke) => poke.name.japanese == sentPokeName
    )!;

    /* 使用済みリスト更新 */
    const tmpUsedPokeNameList = Array.from(usedPokeNameList);
    tmpUsedPokeNameList.push(sentPoke.name.japanese);
    setUsedPokeNameList(tmpUsedPokeNameList);
    setUsedPokeCount(tmpUsedPokeNameList.length);

    const sentPokeResponse = await fetchPoke(sentPoke.id);
    const imgPath =
      sentPokeResponse.sprites.other["official-artwork"].front_default;
    sentPoke.imgPath = imgPath || PATH.defaultImg;

    setTargetPoke(sentPoke);

    /* 履歴を配列に格納 */
    const tmpMyPokeList = Array.from(myPokeList);
    tmpMyPokeList.push(sentPoke);
    setMyPokeList(tmpMyPokeList);
    if (sentPoke.name.japanese.endsWith("ン")) {
      setFinishType("lose");
      return;
    }

    const lastWord = getShiritoriWord(sentPokeName);
    /* 自分のポケリセット */
    setSentPokeName("");

    /* 一定時間後に返答 */
    await sleep(3000);

    /* ポケ一覧からアンサーの候補を取得 */
    let tmpTarget = getAnswer(pokeList, lastWord, tmpUsedPokeNameList, diff);

    /* CPUの負け */
    if (!tmpTarget || tmpTarget.name.japanese.endsWith("ン")) {
      setFinishType("win");
    }
    if (!tmpTarget) {
      /* 解答なし */
      tmpTarget = {
        id: -1,
        base: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 },
        name: { japanese: "見つかりませんでした。。" },
        type: ["Normal"],
        imgPath: "",
      };
    } else {
      /* 解答あり */

      /* 画像パス取得 */
      const tmpTargetResponse = await fetchPoke(tmpTarget.id);
      const enermyImgPath =
        tmpTargetResponse.sprites.other["official-artwork"].front_default;
      tmpTarget.imgPath = enermyImgPath || PATH.defaultImg;

      /* 使用済みリスト更新 */
      tmpUsedPokeNameList.push(tmpTarget.name.japanese);
      setUsedPokeNameList(tmpUsedPokeNameList);
      setUsedPokeCount(tmpUsedPokeNameList.length);

      const tmpEnermyPokeList = Array.from(enermyPokeList);
      tmpEnermyPokeList.push(tmpTarget);
      setEnermyPokeList(tmpEnermyPokeList);
    }

    setTargetPoke(tmpTarget);
    setMyTurn(true);
  };

  const handleChangeDiff = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedDiff = event.currentTarget.value as Diff;
    sessionStorage.setItem("diff", checkedDiff);
    setDiff(checkedDiff);
  };

  return (
    <TopPresenter
      pokeList={pokeList}
      isMyTurn={isMyTurn}
      firstPoke={firstPoke}
      targetPoke={targetPoke!}
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      finishType={finishType}
      usedPokeCount={usedPokeCount}
      diff={diff}
      onChangePoke={handleChangePoke}
      onKeydown={handleKeydown}
      onSubmitPoke={handleSubmitPoke}
      onChangeDiff={handleChangeDiff}
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

const getAnswer = (
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
