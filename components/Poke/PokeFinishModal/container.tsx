import { destroyCookie, parseCookies, setCookie } from "nookies";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { CookieNames } from "@/const/cookieNames";
import PokeFinishModalPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "gameStatus" | "score" | "scoreAll" | "myIndex"
>;

export default function PokeFinishModal({
  gameStatus,
  score,
  scoreAll,
  myIndex,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(
    (parseCookies() as typeof CookieNames).nickname
  );
  const [nicknameErr, setNicknameErr] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

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
    /* cookieに名前保存 */
    setCookie(null, CookieNames.nickname, nickname ?? "", CONFIG.cookie);

    /* cookieにスコア保存 */
    setCookie(null, CookieNames.score, score.toString(), CONFIG.cookie);

    /* ランキング更新 */
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/ranking`, {
      method: "POST",
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          console.log("response status from ranking is NOT ok.");
        }
      })
      .catch((err: Error) => {
        console.log("error while updating ranking.");
        console.log(err);
      });

    /* スコア削除 */
    destroyCookie(null, CookieNames.score);

    /* ランキングの変更を記録 */
    setCookie(null, CookieNames.updateFlg, "on");

    /* リロード */
    location.reload();
  };
  return (
    <PokeFinishModalPresenter
      scoreAll={scoreAll}
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
