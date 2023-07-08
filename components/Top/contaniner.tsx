"use client";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES, COOKIE_VALUES } from "@/const/cookie";
import { PATH } from "@/const/path";
import { usePokeApi } from "@/hook/usePokeApi";
import { useTimer } from "@/hook/useTimer";
import { GameStatus } from "@/types/GameStatus";
import { Poke } from "@/types/Poke";
import { Score } from "@/types/Score";
import { getAnswer } from "@/utils/getAnswer";
import { getAudioRandomPath } from "@/utils/getAudioRandomPath";
import getCompatibility from "@/utils/getCompatibility";
import { getShiritoriWord } from "@/utils/getShiritoriWord";
import { hira2kata } from "@/utils/hira2kata";
import { replaceSpecial } from "@/utils/replaceSpecial";
import TopPresenter from "./presenter";

type Props = {
  pokeList: Poke[];
  firstPoke: Poke;
};

export default function Top({ pokeList, firstPoke }: Props) {
  const [targetPoke, setTargetPoke] = useState<Poke>(firstPoke);
  const [sentPokeName, setSentPokeName] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [myPokeList, setMyPokeList] = useState<Poke[]>([]);
  const [enermyPokeList, setEnermyPokeList] = useState<Poke[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("before_start");
  const [usedPokeNameList, setUsedPokeNameList] = useState<string[]>([
    firstPoke.name.japanese,
  ]);
  /* 現在の残り時間 */
  const [leftMillS, setLeftMillS] = useState<number>(CONFIG.timeLimit);
  const [countDown, setCountDown] = useState<number>(3);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const toolTarget = useRef(null);
  const { sleep } = useTimer();
  const { setPokeImg } = usePokeApi();

  const [pokeAudio, setPokeAudio] = useState<HTMLAudioElement>();
  /* 取得するまでは空配列 */
  const [scoreAll, setScoreAll] = useState<Score[]>([]);

  /* strictModeで2回レンダリングされることに注意 */
  useEffect(() => {
    /* 更新時はキャッシュを使わない */
    fetchScoreAll(
      parseCookies(null)[COOKIE_NAMES.updateFlg] != COOKIE_VALUES.on
    );
    /* next/headersのcookiesがreadonlyなためCSR側で削除 */
    destroyCookie(null, COOKIE_NAMES.score);
    destroyCookie(null, COOKIE_NAMES.updateFlg);
    destroyCookie(null, COOKIE_NAMES.audio);

    setTargetPoke(firstPoke);
    /* 最初のポケ画像取得 */
    setPokeImg(firstPoke, setTargetPoke);

    /* レンダリングさせる(変更を伝える)ためディープコピー */
    setTargetPoke(JSON.parse(JSON.stringify(firstPoke)));

    const tmpPokeAudio = new Audio(getAudioRandomPath("op"));
    tmpPokeAudio.volume = 0.2;
    tmpPokeAudio.loop = true;
    setPokeAudio(tmpPokeAudio);
    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /* 初期値 */
    setInnerWidth(window.innerWidth);

    /* リサイズ処理追加 */
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (
      parseCookies(null)[COOKIE_NAMES.audio] != COOKIE_VALUES.on ||
      !pokeAudio
    )
      return;
    switch (gameStatus) {
      case "will_start":
        pokeAudio.src = getAudioRandomPath("launch");
        pokeAudio.play();
        break;
      case "playing_myturn":
        // 初回スタート時のみ変更
        if (pokeAudio.src.includes("launch")) {
          pokeAudio.src = getAudioRandomPath("battle");
          pokeAudio.play();
        }
        break;
      case "end_win":
      case "end_lose":
        pokeAudio.src = getAudioRandomPath("ed");
        pokeAudio.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

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

    const lastWord = getShiritoriWord(targetPoke.name.japanese);
    /* ポケ一覧からアンサーの候補を取得 */
    let tmpTarget = getAnswer(pokeList, lastWord, usedPokeNameList);

    /* ランダムな時間後に返答 */
    sleep(2000 + Math.random() * 6000).then(() => {
      if (!tmpTarget) {
        /* 解答なし */
        tmpTarget = {
          id: -1,
          base: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 },
          name: { japanese: "見つかりませんでした。。" },
          type: ["Normal"],
          imgPath: PATH.defaultImg,
        };
        setTargetPoke(tmpTarget);
      } else {
        /* 解答あり */
        /* 使用済みリスト更新 */
        const tmpUsedPokeNameList = Array.from(usedPokeNameList);
        tmpUsedPokeNameList.push(tmpTarget.name.japanese);
        setUsedPokeNameList(tmpUsedPokeNameList);

        const tmpEnermyPokeList = Array.from(enermyPokeList);
        tmpEnermyPokeList.push(tmpTarget);
        setEnermyPokeList(tmpEnermyPokeList);
        setTargetPoke(tmpTarget);
        setPokeImg(tmpTarget, setTargetPoke);
      }

      /* CPUの負け */
      if (tmpTarget.id == -1 || tmpTarget.name.japanese.endsWith("ン")) {
        setScore((score) => score + 10000);
        setGameStatus("end_win");
      } else {
        setGameStatus("playing_myturn");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

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

    setTargetPoke(sentPoke);
    setPokeImg(sentPoke, setTargetPoke);

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

  const handleClickStart = () => {
    setGameStatus("will_start");
  };

  const handlePlayAudio = (e: MouseEvent<HTMLInputElement>) => {
    const audioSwitcher = e.currentTarget;
    if (audioSwitcher.checked) {
      setCookie(null, COOKIE_NAMES.audio, COOKIE_VALUES.on, CONFIG.cookie);
      pokeAudio && pokeAudio.play();
    } else {
      destroyCookie(null, COOKIE_NAMES.audio);
      pokeAudio && pokeAudio.pause();
    }
  };

  const handleScoreReset = async () => {
    /* リロード時はキャッシュを使わない */
    fetchScoreAll(false);
  };

  const fetchScoreAll = (useCache: boolean) => {
    /* ランキング取得はawaitしなくていい */
    fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ranking`, {
      cache: useCache ? "force-cache" : "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          console.log("response status from ranking is NOT ok.");
          return [];
        }
        (async () => {
          // fetchが完了したら変数保存
          const res: Score[] = await (response.json().catch((err) => {
            console.log("err while parsing scoreAll.");
            console.log(err);
            return [];
          }) as Promise<Score[]>);
          setScoreAll(res);
        })();
      })
      .catch((err: Error) => {
        console.log("error while fetching ranking.");
        console.log(err);
        return [];
      });
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
      score={score}
      scoreAll={scoreAll}
      leftPercent={(leftMillS / CONFIG.timeLimit) * 100}
      countDown={countDown}
      bonus={bonus}
      toolTarget={toolTarget}
      innerWidth={innerWidth}
      onChangePoke={handleChangePoke}
      onKeydown={handleKeydown}
      onSubmitPoke={handleSubmitPoke}
      onClickStart={handleClickStart}
      onPlayAudio={handlePlayAudio}
      onReloadRanking={handleScoreReset}
    />
  );
}
