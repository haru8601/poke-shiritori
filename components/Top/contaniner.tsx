"use client";

import { destroyCookie } from "nookies";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { CONFIG } from "@/const/config";
import { CookieNames } from "@/const/cookieNames";
import { PATH } from "@/const/path";
import { usePokeApi } from "@/hook/usePokeApi";
import { useTimer } from "@/hook/useTimer";
import { Diff } from "@/types/Diff";
import { GameStatus } from "@/types/GameStatus";
import { Poke } from "@/types/Poke";
import { PokeApi } from "@/types/PokeApi";
import { Score } from "@/types/Score";
import { getAnswer } from "@/utils/getAnswer";
import getCompatibility from "@/utils/getCompatibility";
import { getShiritoriWord } from "@/utils/getShiritoriWord";
import { hira2kata } from "@/utils/hira2kata";
import { replaceSpecial } from "@/utils/replaceSpecial";
import TopPresenter from "./presenter";

type Props = {
  pokeList: Poke[];
  firstPoke: Poke;
  scoreAll: Score[];
};

export default function Top({ pokeList, firstPoke, scoreAll }: Props) {
  const [targetPoke, setTargetPoke] = useState<Poke>(firstPoke);
  const [sentPokeName, setSentPokeName] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [myPokeList, setMyPokeList] = useState<Poke[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<Poke[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("before_start");
  const [usedPokeNameList, setUsedPokeNameList] = useState<string[]>([
    firstPoke.name.japanese,
  ]);
  const [diff, setDiff] = useState<Diff>("normal");
  const [myIndex, setMyIndex] = useState<number>(-1);
  /* 現在の残り時間 */
  const [leftMillS, setLeftMillS] = useState<number>(CONFIG.timeLimit);
  const [countDown, setCountDown] = useState<number>(3);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const toolTarget = useRef(null);
  const { sleep } = useTimer();
  const { fetchPoke } = usePokeApi();

  /* strictModeで2回レンダリングされることに注意 */
  useEffect(() => {
    /* next/headersのcookiesがreadonlyなためCSR側で削除 */
    destroyCookie(null, CookieNames.shiritori_score);

    let tmpTargetResponse: PokeApi | undefined = void 0;
    (async () => {
      /* 最初のポケ画像取得 */
      tmpTargetResponse = await fetchPoke(firstPoke.id);
      const imgPath =
        tmpTargetResponse!.sprites.other["official-artwork"].front_default;
      firstPoke.imgPath = imgPath || PATH.defaultImg;
      /* レンダリングさせる(変更を伝える)ためディープコピー */
      setTargetPoke(JSON.parse(JSON.stringify(firstPoke)));
    })();

    /* 難易度をセッションから取得 */
    setDiff((sessionStorage.getItem("diff") as Diff) || "normal");
    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      /* 初期値 */
      setInnerWidth(window.innerWidth);

      /* リサイズ処理追加 */
      window.addEventListener("resize", () => {
        setInnerWidth(window.innerWidth);
      });
    }
  }, []);

  /* スタートカウントダウン */
  useEffect(() => {
    if (gameStatus == "will_start") {
      if (countDown > 0) {
        const timeoutId = setTimeout(
          () => setCountDown((countDown) => countDown - 1),
          1000
        );
        return () => clearTimeout(timeoutId);
      } else {
        setGameStatus("playing_myturn");
      }
    }
  }, [countDown, gameStatus]);

  /* タイマー処理 */
  useEffect(() => {
    (async () => {
      let timeoutId;
      await new Promise((resolve) => {
        timeoutId = setTimeout(() => {
          setLeftMillS((leftMillS) => {
            if (leftMillS <= 0) {
              setGameStatus("end_lose");
              return leftMillS;
            } else if (gameStatus != "playing_myturn") {
              return leftMillS;
            }
            return leftMillS - 20;
          });
          resolve("");
        }, 20);
      });
      clearTimeout(timeoutId);
    })();
  }, [gameStatus, leftMillS]);

  /* CPUの回答 */
  useEffect(() => {
    if (gameStatus != "playing_enermy") return;
    (async () => {
      /* ランダムな時間後に返答 */
      await sleep(2000 + Math.random() * 6000);

      const lastWord = getShiritoriWord(targetPoke.name.japanese);
      /* ポケ一覧からアンサーの候補を取得 */
      let tmpTarget = getAnswer(pokeList, lastWord, usedPokeNameList);

      if (!tmpTarget) {
        /* 解答なし */
        tmpTarget = {
          id: -1,
          base: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 },
          name: { japanese: "見つかりませんでした。。" },
          type: ["Normal"],
          imgPath: PATH.defaultImg,
        };
      } else {
        /* 解答あり */

        /* 画像パス取得 */
        const tmpTargetResponse = await fetchPoke(tmpTarget.id);
        const enermyImgPath =
          tmpTargetResponse.sprites.other["official-artwork"].front_default;
        tmpTarget.imgPath = enermyImgPath || PATH.defaultImg;

        /* 使用済みリスト更新 */
        const tmpUsedPokeNameList = Array.from(usedPokeNameList);
        tmpUsedPokeNameList.push(tmpTarget.name.japanese);
        setUsedPokeNameList(tmpUsedPokeNameList);

        const tmpEnermyPokeList = Array.from(enermyPokeList);
        tmpEnermyPokeList.push(tmpTarget);
        setEnermyPokeList(tmpEnermyPokeList);
      }
      setTargetPoke(tmpTarget);
      /* CPUの負け */
      if (tmpTarget.id == -1 || tmpTarget.name.japanese.endsWith("ン")) {
        setScore((score) => score + 10000);
        setGameStatus("end_win");
      } else {
        setGameStatus("playing_myturn");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  /* 終了後の処理 */
  useEffect(() => {
    (async () => {
      if (!gameStatus.includes("end")) {
        return;
      }

      /* 順位計算 */
      const tmpRank = scoreAll.findIndex((row) => row.score <= score);
      setMyIndex(tmpRank != -1 ? tmpRank : scoreAll.length);
    })();
  }, [gameStatus, scoreAll, score]);

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      return;
    }
    /* keyCodeは非推奨だが代替案があまりない(isComposing等は挙動が微妙)のでこのまま使用 */
    if (e.keyCode == 13 && gameStatus == "playing_myturn") {
      handleSubmitPoke();
    }
  };

  const handleChangePoke = (e: ChangeEvent<HTMLInputElement>) => {
    setSentPokeName(e.target.value);
  };

  const handleSubmitPoke = async () => {
    /* カタカナに変換後、特殊記号変換 */
    const kataPokeName = replaceSpecial(hira2kata(sentPokeName));

    /******** バリデーション ********/
    /* しりとりになっているかのチェック */
    const enermyLastWord = getShiritoriWord(
      (enermyPokeList.length &&
        enermyPokeList[enermyPokeList.length - 1].name.japanese) ||
        firstPoke.name.japanese
    );
    if (!kataPokeName.startsWith(enermyLastWord)) {
      setPokeErr(`${enermyLastWord}から始まる名前にしてください`);
      return;
    }
    /* 一覧に存在するかチェック */
    if (!pokeList.find((poke) => poke.name.japanese == kataPokeName)) {
      setPokeErr("存在しないポケモンです");
      return;
    }

    /* 使用済みかのチェック */
    if (usedPokeNameList.find((pokeName) => pokeName == kataPokeName)) {
      setPokeErr("このポケモンは使用済みです");
      return;
    }
    /****************/

    setGameStatus("playing_will_enermy");
    setPokeErr("");
    const sentPoke = pokeList.find(
      (poke) => poke.name.japanese == kataPokeName
    )!;

    /* 使用済みリスト更新 */
    const tmpUsedPokeNameList = Array.from(usedPokeNameList);
    tmpUsedPokeNameList.push(sentPoke.name.japanese);
    setUsedPokeNameList(tmpUsedPokeNameList);

    const sentPokeResponse = await fetchPoke(sentPoke.id);
    const imgPath =
      sentPokeResponse?.sprites.other["official-artwork"].front_default;
    sentPoke.imgPath = imgPath || PATH.defaultImg;

    setTargetPoke(sentPoke);

    /* 履歴を配列に格納 */
    const tmpMyPokeList = Array.from(myPokeList);
    tmpMyPokeList.push(sentPoke);
    setMyPokeList(tmpMyPokeList);
    if (sentPoke.name.japanese.endsWith("ン")) {
      setGameStatus("end_lose");
      return;
    }

    /* ボーナスはタイプ相性*1000点かノーダメなら100点 */
    const tmpBonus = Math.max(
      getCompatibility(
        sentPoke,
        (enermyPokeList.length && enermyPokeList[enermyPokeList.length - 1]) ||
          firstPoke
      ) * 1000,
      100
    );

    /* タイムボーナス */
    setLeftMillS((leftMillS) => {
      setBonus(tmpBonus);
      return Math.min(CONFIG.timeLimit, leftMillS + tmpBonus);
    });
    setScore((score) => {
      return score + tmpBonus;
    });

    /* 自分のポケリセット */
    setSentPokeName("");
    setGameStatus("playing_enermy");
  };

  const handleChangeDiff = (event: ChangeEvent<HTMLInputElement>) => {
    const checkedDiff = event.currentTarget.value as Diff;
    sessionStorage.setItem("diff", checkedDiff);
    setDiff(checkedDiff);
  };

  const handleClickStart = async () => {
    setGameStatus("will_start");
  };

  return (
    <TopPresenter
      pokeList={pokeList}
      firstPoke={firstPoke}
      targetPoke={targetPoke!}
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      myPokeList={myPokeList}
      enermyPokeList={enermyPokeList}
      gameStatus={gameStatus}
      diff={diff}
      score={score}
      scoreAll={scoreAll}
      myIndex={myIndex}
      leftPercent={(leftMillS / CONFIG.timeLimit) * 100}
      countDown={countDown}
      bonus={bonus}
      toolTarget={toolTarget}
      innerWidth={innerWidth}
      onChangePoke={handleChangePoke}
      onKeydown={handleKeydown}
      onSubmitPoke={handleSubmitPoke}
      onChangeDiff={handleChangeDiff}
      onClickStart={handleClickStart}
    />
  );
}
