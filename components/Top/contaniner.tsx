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
import getRanking from "@/actions/ranking/getRanking";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES, COOKIE_VALUES } from "@/const/cookie";
import { GAME_STATUS, GameStatus } from "@/const/gameStatus";
import { NOT_FOUND_POKE } from "@/const/notFoundPoke";
import { OS, OS_LIST } from "@/const/os";
import { usePokeApi } from "@/hook/usePokeApi";
import { useTimer } from "@/hook/useTimer";
import { Poke, PokeMap } from "@/types/Poke";
import { Score } from "@/types/Score";
import { getAudioRandomPath } from "@/utils/getAudioRandomPath";
import getCompatibility from "@/utils/getCompatibility";
import { getShiritoriWord } from "@/utils/getShiritoriWord";
import { hira2kata } from "@/utils/hira2kata";
import changePokeMap from "@/utils/poke/changePokeMap";
import getTargetPoke from "@/utils/poke/getTargetPoke";
import getUnusedPokeList from "@/utils/poke/getUnusedPokeList";
import { replaceSpecial } from "@/utils/replaceSpecial";
import { getAnswer } from "@/utils/shiritori/getAnswer";
import getNewestPoke from "@/utils/shiritori/getNewestPoke";
import TopPresenter from "./presenter";

type Props = {
  initMap: PokeMap;
  firstPoke: Poke;
};

export default function Top({ initMap, firstPoke }: Props) {
  const [pokeMap, setPokeMap] = useState<PokeMap>(initMap);
  const [sentPokeName, setSentPokeName] = useState<string>("");
  const [pokeErr, setPokeErr] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GAME_STATUS.beforeStart
  );
  /* 現在の残り時間 */
  const [leftMillS, setLeftMillS] = useState<number>(CONFIG.timeLimitMillS);
  const [countDown, setCountDown] = useState<number>(3);
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [penalty, setPenalty] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [os, setOs] = useState<OS>(OS_LIST.mac);
  const [hintShow, setHintShow] = useState<boolean>(false);
  const toolTarget = useRef(null);
  const { sleep } = useTimer();
  const { setPokeImg } = usePokeApi();

  const [pokeAudio, setPokeAudio] = useState<HTMLAudioElement>();
  /* 取得するまでは空配列 */
  const [scoreAll, setScoreAll] = useState<Score[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  /* リスナーで使用 */
  const statusRef = useRef<GameStatus>(GAME_STATUS.beforeStart);
  statusRef.current = gameStatus;

  /* strictModeで2回レンダリングされることに注意 */
  useEffect(() => {
    // 更新時はキャッシュを使わない
    fetchScoreAll(
      parseCookies(null)[COOKIE_NAMES.update_flg] != COOKIE_VALUES.on
    );

    // next/headersのcookiesがreadonlyなためCSR側で削除
    // https://nextjs.org/docs/app/api-reference/functions/cookies#deleting-cookies
    destroyCookie(null, COOKIE_NAMES.update_flg);
    destroyCookie(null, COOKIE_NAMES.shiritori_audio);

    const tmpPokeAudio = new Audio(getAudioRandomPath("op"));
    tmpPokeAudio.volume = 0.2;
    tmpPokeAudio.loop = true;
    setPokeAudio(tmpPokeAudio);

    const ua = window.navigator.userAgent.toLowerCase();

    // OS_LISTだとreadonlyなので抽出
    const osListVals = Object.values(OS_LIST);
    for (let os of osListVals) {
      if (ua.indexOf(os) !== -1) {
        setOs(OS_LIST[os]);
      }
    }

    // キーボードショートカット
    const onKeydown = (e: globalThis.KeyboardEvent) => {
      switch (statusRef.current) {
        case GAME_STATUS.beforeStart:
          if (e.key === "Enter") {
            // CtrlまたはCommand(Windowsキー)が押されていたら
            if (e.metaKey || e.ctrlKey) {
              handleClickStart();
              return;
            }
          }
          break;
        case GAME_STATUS.playingMyturn:
        case GAME_STATUS.playingEnermy:
        case GAME_STATUS.playingWillEnermy:
          if (document.activeElement != inputRef.current) {
            if (e.key === "/") {
              e.preventDefault();
              inputRef.current?.focus();
            } else if (e.key.match(/^[a-z]{1}$/)) {
              setHintShow(true);
              setTimeout(() => {
                setHintShow(false);
              }, 2000);
            }
          }
          break;
      }
    };
    window.addEventListener("keydown", onKeydown);

    /* リサイズ処理 */
    const onResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    onResize(); // 初期値設定

    const onChangeVisibility = () => {
      /* バックグランドからの帰還を検知 */
      if (document.visibilityState === "visible") {
        // ペナルティ(useStateだと初期値になるのでuseRefを使用)
        if (statusRef.current == GAME_STATUS.playingMyturn) {
          setLeftMillS((leftMillS) => {
            // スコアの計算とペナルティ付与のタイミングを揃える
            setPenalty(true);
            setTimeout(() => {
              setPenalty(false);
            }, 2000);
            return leftMillS - 5000;
          });
        }
      }
    };
    window.addEventListener("visibilitychange", onChangeVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("visibilitychange", onChangeVisibility);
      window.removeEventListener("keydown", onKeydown);
    };

    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // BGMの変更
  useEffect(() => {
    if (
      parseCookies(null)[COOKIE_NAMES.shiritori_audio] != COOKIE_VALUES.on ||
      !pokeAudio
    )
      return;
    switch (gameStatus) {
      case GAME_STATUS.willStart:
        pokeAudio.src = getAudioRandomPath("launch");
        pokeAudio.play();
        break;
      case GAME_STATUS.playingMyturn:
        // 初回スタート時のみ変更
        if (pokeAudio.src.includes("launch")) {
          pokeAudio.src = getAudioRandomPath("battle");
          pokeAudio.play();
        }
        break;
      case GAME_STATUS.endWin:
      case GAME_STATUS.endLose:
        pokeAudio.src = getAudioRandomPath("ed");
        pokeAudio.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  /* スタートカウントダウン */
  useEffect(() => {
    if (gameStatus == GAME_STATUS.willStart) {
      if (countDown > 0) {
        const timeoutId = setTimeout(
          () => setCountDown((countDown) => countDown - 1),
          1000
        );
        return () => clearTimeout(timeoutId);
      } else {
        setGameStatus(GAME_STATUS.playingMyturn);
        inputRef.current?.focus();
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
              setGameStatus(GAME_STATUS.endLose);
              return leftMillS;
            } else if (gameStatus != GAME_STATUS.playingMyturn) {
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
    if (gameStatus != GAME_STATUS.playingEnermy) return;
    const targetPoke = getTargetPoke(pokeMap, firstPoke);

    const lastWord = getShiritoriWord(targetPoke.name.japanese);
    /* ポケ一覧からアンサーの候補を取得 */
    let tmpTarget = getAnswer(pokeMap, lastWord);

    /* ランダムな時間後に返答 */
    sleep(2000 + Math.random() * 6000).then(() => {
      if (!tmpTarget) {
        /* 有効な解答無し */
        pokeMap[NOT_FOUND_POKE.id] = NOT_FOUND_POKE;
        tmpTarget = NOT_FOUND_POKE;
      } else {
        const newestEnermy = getNewestPoke(pokeMap, false);
        pokeMap[tmpTarget.id].status = {
          owner: "enermy",
          order: newestEnermy?.status?.order
            ? newestEnermy.status.order + 1
            : 1,
        };
      }
      changePokeMap(pokeMap, setPokeMap);
      setPokeImg(tmpTarget, setPokeMap);

      /* CPUの負け */
      if (
        tmpTarget.id == NOT_FOUND_POKE.id ||
        tmpTarget.name.japanese.endsWith("ン")
      ) {
        setScore((score) => score + 10000);
        setGameStatus(GAME_STATUS.endWin);
      } else {
        setGameStatus(GAME_STATUS.playingMyturn);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus]);

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key != "Enter") {
      return;
    }
    // IMEの入力中のEnterは弾きたい
    /* keyCodeは非推奨だが代替案があまりない(isComposing等は挙動が微妙)のでこのまま使用 */
    if (e.keyCode == 13 && gameStatus == GAME_STATUS.playingMyturn) {
      handleSubmitPoke();
    }
  };

  const handleChangePoke = (e: ChangeEvent<HTMLInputElement>) => {
    setSentPokeName(e.target.value);
  };

  const handleSubmitPoke = async () => {
    const enermyTarget = getTargetPoke(pokeMap, firstPoke);
    /* カタカナに変換後、特殊記号変換 */
    const kataPokeName = replaceSpecial(hira2kata(sentPokeName));

    /******** バリデーション ********/
    /* しりとりになっているかのチェック */
    const enermyLastWord = getShiritoriWord(enermyTarget.name.japanese);
    if (!kataPokeName.startsWith(enermyLastWord)) {
      setPokeErr(`${enermyLastWord}から始まる名前にしてください`);
      return;
    }
    /* 一覧に存在するかチェック */
    if (
      !Object.values(pokeMap).find((poke) => poke.name.japanese == kataPokeName)
    ) {
      setPokeErr("存在しないポケモンです");
      return;
    }

    /* 使用済みかのチェック */
    if (
      !getUnusedPokeList(pokeMap).find(
        (poke) => poke.name.japanese == kataPokeName
      )
    ) {
      setPokeErr("このポケモンは使用済みです");
      return;
    }
    /****************/

    setGameStatus(GAME_STATUS.playingWillEnermy);
    setPokeErr("");
    const sentPoke = Object.values(pokeMap).find(
      (poke) => poke.name.japanese == kataPokeName
    )!;

    const newestPoke = getNewestPoke(pokeMap, true);
    pokeMap[sentPoke.id].status = {
      owner: "me",
      order: newestPoke?.status ? newestPoke.status?.order + 1 : 1,
    };
    changePokeMap(pokeMap, setPokeMap);
    setPokeImg(sentPoke, setPokeMap);

    if (sentPoke.name.japanese.endsWith("ン")) {
      setGameStatus(GAME_STATUS.endLose);
      return;
    }

    /* ボーナスはタイプ相性*1000点かノーダメなら100点 */
    const tmpBonus = Math.max(
      getCompatibility(sentPoke, enermyTarget) * 1000,
      100
    );

    /* タイムボーナス */
    setLeftMillS((leftMillS) => {
      setBonus(tmpBonus);
      return Math.min(CONFIG.timeLimitMillS, leftMillS + tmpBonus);
    });
    setScore((score) => {
      return score + tmpBonus;
    });

    /* 自分のポケリセット */
    setSentPokeName("");
    setGameStatus(GAME_STATUS.playingEnermy);
  };

  const handleClickStart = () => {
    setGameStatus(GAME_STATUS.willStart);
  };

  const handlePlayAudio = (e: MouseEvent<HTMLInputElement>) => {
    const audioSwitcher = e.currentTarget;
    if (audioSwitcher.checked) {
      setCookie(
        null,
        COOKIE_NAMES.shiritori_audio,
        COOKIE_VALUES.on,
        CONFIG.cookie
      );
      pokeAudio && pokeAudio.play();
    } else {
      destroyCookie(null, COOKIE_NAMES.shiritori_audio);
      pokeAudio && pokeAudio.pause();
    }
  };

  const handleScoreReset = async () => {
    /* リロード時はキャッシュを使わない */
    fetchScoreAll(false);
  };

  const fetchScoreAll = (useCache: boolean) => {
    /* ランキング取得はawaitしなくていい */
    // fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ranking`, {
    //   cache: useCache ? "force-cache" : "no-store",
    // })
    getRanking()
      .then((response) => {
        (async () => {
          // fetchが完了したら変数保存
          setScoreAll(response);
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
      pokeMap={pokeMap}
      firstPoke={firstPoke}
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      gameStatus={gameStatus}
      score={score}
      scoreAll={scoreAll}
      leftPercent={(leftMillS / CONFIG.timeLimitMillS) * 100}
      countDown={countDown}
      bonus={bonus}
      penalty={penalty}
      toolTarget={toolTarget}
      inputRef={inputRef}
      os={os}
      hintShow={hintShow}
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
