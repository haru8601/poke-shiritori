import { parseCookies, setCookie } from "nookies";
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
    (parseCookies() as typeof CookieNames).shiritori_nickname
  );
  const [nicknameErr, setNicknameErr] = useState<string>("");

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
    if (tmpName.length > 10) {
      setNicknameErr("ニックネームは10文字以下にしてください");
    } else {
      setNicknameErr("");
    }
  };

  const handleSubmitNickname = async () => {
    if (nicknameErr !== "") {
      return;
    }
    /* cookieにスコアを保存 */
    setCookie(
      null,
      CookieNames.shiritori_nickname,
      nickname ?? "",
      CONFIG.cookie
    );
    setCookie(
      null,
      CookieNames.shiritori_score,
      score.toString(),
      CONFIG.cookie
    );

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
      onCloseModal={handleCloseModal}
      onChangeNickname={handleChangeNickname}
      onSubmitNickname={handleSubmitNickname}
    />
  );
}
