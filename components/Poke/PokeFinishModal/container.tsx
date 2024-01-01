import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import setRanking from "@/actions/ranking/setRanking";
import styles from "@/app/styles/Top.module.css";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES, COOKIE_VALUES } from "@/const/cookie";
import { GAME_STATUS } from "@/const/gameStatus";
import { usePokeApi } from "@/hook/usePokeApi";
import { PokeMap } from "@/types/Poke";
import { Score } from "@/types/Score";
import { getMonthScoreAll } from "@/utils/getMonthScoreAll";
import { getMyIndex } from "@/utils/getMyIndex";
import { getShiritoriWord } from "@/utils/getShiritoriWord";
import getTargetPoke from "@/utils/poke/getTargetPoke";
import getCandidates from "@/utils/shiritori/getCandidates";
import PokeFinishModalPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "pokeMap"
  | "firstPoke"
  | "gameStatus"
  | "score"
  | "scoreAll"
  | "os"
  | "innerWidth"
>;

export default function PokeFinishModal({
  pokeMap,
  firstPoke,
  gameStatus,
  score,
  scoreAll,
  os,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(true);
  // リスナーで使用
  const showRef = useRef<boolean>(true);
  showRef.current = showModal;
  // cookieが空の場合はnull表記
  const [nickname, setNickname] = useState<string | null>(
    // キーをcookieのキー名としている
    (parseCookies() as typeof COOKIE_NAMES).shiritori_nickname
  );
  const nicknameRef = useRef<string | null>(null);
  nicknameRef.current = nickname;
  const [nicknameErr, setNicknameErr] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [monthRankRowAll, setMonthRankRowAll] = useState<ReactNode>();
  const [myIndex, setMyIndex] = useState<number>(-1);
  const [myMonthIndex, setMyMonthIndex] = useState<number>(-1);
  const [candidateMap, setCandidateMap] = useState<PokeMap>({});
  const { setPokeImg } = usePokeApi();

  useEffect(() => {
    if (!scoreAll.length) {
      /* ランキングが取得できてなければ順位計算しない */
      setMonthRankRowAll("ランキングを取得できませんでした");
    } else {
      // 順位計算
      setMyIndex(getMyIndex(score, scoreAll));

      // 月間順位
      const monthScoreAll = getMonthScoreAll(scoreAll);
      setMyMonthIndex(getMyIndex(score, monthScoreAll));

      // 表示するランキング生成
      setMonthRankRowAll(
        monthScoreAll
          .concat({
            id: -1,
            user: nickname || CONFIG.score.defaultNickname,
            score: score,
          })
          .sort((a, b) => {
            const scoreDiff: number = b.score - a.score;
            /* 2つ目で新規のスコアが既存の以上ならswap */
            if (b.id == -1 && scoreDiff > 0) {
              return 1;
            }
            /* 1つ目が新規で既存のスコアと同じならswapさせない */
            if (a.id == -1 && scoreDiff <= 0) {
              return -1;
            }
            return scoreDiff;
          })
          .slice(0, CONFIG.topRankLimit)
          .map((score: Score, index) => {
            return (
              <tr
                key={index}
                className={`${!score.id || score.id < 0 ? styles.myScore : ""}`}
              >
                <td>{index + 1}</td>
                <td>{score.user}</td>
                <td>{score.score}</td>
              </tr>
            );
          })
      );
    }

    // 回答の候補を調査
    if (gameStatus == GAME_STATUS.endLose) {
      // 相手の最後のポケモンを取得
      const targetPoke = getTargetPoke(pokeMap, firstPoke, true);
      // 相手のポケモンの最後の文字
      const lastWord = getShiritoriWord(targetPoke.name.japanese);
      const tmpCandidates = getCandidates(pokeMap, lastWord);
      if (
        !tmpCandidates.length ||
        tmpCandidates[0].name.japanese.endsWith("ン")
      ) {
        // 候補がなかった場合
      } else {
        // 候補は最大n件
        while (
          Object.keys(candidateMap).length < 3 &&
          tmpCandidates.length > 0
        ) {
          const randomNum = Math.floor(Math.random() * tmpCandidates.length);
          const poke = tmpCandidates[randomNum];
          candidateMap[poke.id] = poke;
          setCandidateMap(JSON.parse(JSON.stringify(candidateMap)));
          setPokeImg(poke, setCandidateMap);
          tmpCandidates.splice(randomNum, 1);
        }
      }
    }

    // キーボードショートカット
    /* 中の変数を動的にするようuseRefを用いる */
    const onKeydown = async (e: globalThis.KeyboardEvent) => {
      if (!showRef.current) return;
      if (e.key === "Enter") {
        // CtrlまたはCommand(Windowsキー)が押されていたら
        if (e.metaKey || e.ctrlKey) {
          await handleSubmitNickname();
        }
      }
    };
    window.addEventListener("keydown", onKeydown);

    return () => {
      window.removeEventListener("keydown", onKeydown);
    };

    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    const tmpName = event.target.value;
    setNickname(tmpName);
    if (tmpName.length > CONFIG.score.nicknameMaxLen) {
      setNicknameErr(
        `ニックネームは${CONFIG.score.nicknameMaxLen}文字以下にしてください`
      );
    } else {
      setNicknameErr("");
    }
  };

  const handleSubmitNickname = async () => {
    if (nicknameErr !== "") {
      return;
    }

    setLoading(true);
    // cookieに名前保存(unownにするのはDBに送信する時のみ)
    // 既存ニックネームが空文字だとなぜかsetできないので除外
    if (nicknameRef.current && nicknameRef.current != "") {
      setCookie(
        null,
        COOKIE_NAMES.shiritori_nickname,
        nicknameRef.current,
        CONFIG.cookie
      );
    } else {
      destroyCookie(null, COOKIE_NAMES.shiritori_nickname);
    }

    const ok = await setRanking(nicknameRef.current || undefined, score);

    if (!ok) {
      console.error("store db failed.");
    }

    /* ランキングの変更を記録 */
    setCookie(null, COOKIE_NAMES.update_flg, COOKIE_VALUES.on, CONFIG.cookie);

    /* リロード */
    location.reload();
  };

  return (
    <PokeFinishModalPresenter
      monthRankRowAll={monthRankRowAll}
      score={score}
      candidateMap={candidateMap}
      showModal={showModal}
      nickname={nickname}
      nicknameErr={nicknameErr}
      myIndex={myIndex}
      myMonthIndex={myMonthIndex}
      isLoading={isLoading}
      os={os}
      innerWidth={innerWidth}
      onCloseModal={handleCloseModal}
      onChangeNickname={handleChangeNickname}
      onSubmitNickname={handleSubmitNickname}
    />
  );
}
