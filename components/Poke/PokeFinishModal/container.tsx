import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  ChangeEvent,
  ComponentProps,
  ReactNode,
  useEffect,
  useState,
} from "react";
import styles from "@/app/styles/Top.module.css";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES, COOKIE_VALUES } from "@/const/cookie";
import { Score } from "@/types/Score";
import PokeFinishModalPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "gameStatus" | "score" | "myIndex" | "scoreAll"
>;

export default function PokeFinishModal({
  gameStatus,
  score,
  scoreAll,
  myIndex,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  // cookieが空の場合はnull表記
  const [nickname, setNickname] = useState<string | null>(
    (parseCookies() as typeof COOKIE_NAMES).nickname
  );
  const [nicknameErr, setNicknameErr] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [rankRowAll, setRankRowAll] = useState<ReactNode>();

  useEffect(() => {
    (async () => {
      // 表示するランキング生成
      setRankRowAll(
        scoreAll
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
          .slice(0, CONFIG.rankLimit)
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
    })();
    // 初回のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* gameStatusが切り替わったらmodalを表示 */
  useEffect(() => {
    setShowModal(gameStatus.includes("end"));
  }, [gameStatus]);

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
    /* cookieに名前保存(unownにするのはDBに送信する時のみ) */
    setCookie(null, COOKIE_NAMES.nickname, nickname ?? "", CONFIG.cookie);
    /* cookieにスコア保存 */
    setCookie(null, COOKIE_NAMES.score, score.toString(), CONFIG.cookie);

    /* ランキング更新 */
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ranking`, {
      method: "POST",
      cache: "no-store",
    }).catch((err: Error) => {
      console.log("error while updating ranking.");
      console.log(err);
    });

    if (res && !res.ok) {
      console.log("response status from ranking is NOT ok.");
    }

    /* スコア削除 */
    destroyCookie(null, COOKIE_NAMES.score);

    /* ランキングの変更を記録 */
    setCookie(null, COOKIE_NAMES.updateFlg, COOKIE_VALUES.on, CONFIG.cookie);

    /* リロード */
    location.reload();
  };

  return (
    <PokeFinishModalPresenter
      rankRowAll={rankRowAll}
      score={score}
      gameStatus={gameStatus}
      showModal={showModal}
      nickname={nickname}
      nicknameErr={nicknameErr}
      myIndex={myIndex}
      isLoading={isLoading}
      onCloseModal={handleCloseModal}
      onChangeNickname={handleChangeNickname}
      onSubmitNickname={handleSubmitNickname}
    />
  );
}
