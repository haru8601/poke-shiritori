import { useRouter } from "next/router";
import { setCookie, parseCookies } from "nookies";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import { CookieNames } from "@/const/cookieNames";
import PokeFinishModalPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "gameStatus" | "usedPokeCount" | "scoreAll" | "myIndex"
>;

export default function PokeFinishModal({
  gameStatus,
  usedPokeCount,
  scoreAll,
  myIndex,
}: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(
    (parseCookies() as typeof CookieNames).shiritori_nickname
  );
  const router = useRouter();

  /* gameStatusが切り替わったらmodalを表示 */
  useEffect(() => {
    setShowModal(gameStatus.includes("end"));
  }, [gameStatus]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSubmitNickname = async () => {
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
      usedPokeCount.toString(),
      CONFIG.cookie
    );

    /* リロード */
    router.reload();
  };
  return (
    <PokeFinishModalPresenter
      scoreAll={scoreAll}
      usedPokeCount={usedPokeCount}
      gameStatus={gameStatus}
      showModal={showModal}
      nickname={nickname}
      myIndex={myIndex}
      onCloseModal={handleCloseModal}
      onChangeNickname={handleChangeNickname}
      onSubmitNickname={handleSubmitNickname}
    />
  );
}
