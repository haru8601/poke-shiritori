import { AxiosResponse } from "axios";
import { ResultSetHeader } from "mysql2";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import TopPresenter from "@/components/Top/presenter";
import { useScore } from "@/hook/useScore";
import { Score } from "@/types/Score";
import PokeFinishModalPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "finishType" | "usedPokeCount" | "scoreAll" | "myIndex"
>;

export default function PokeFinishModal({
  finishType,
  usedPokeCount,
  scoreAll,
  myIndex,
}: Props) {
  const { storeScore, updateName } = useScore();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>(
    sessionStorage.getItem("nickname") ?? ""
  );
  const [myScore, setMyScore] = useState<Score>({
    id: -1,
    user: nickname != "" ? nickname : "unown",
    score: usedPokeCount,
  });
  const [insertId, setInsertId] = useState<number>(-1);
  const [nameErr, setNameErr] = useState<string>("");

  useEffect(() => {
    (async () => {
      /* DBに結果保存 */
      const res: AxiosResponse<ResultSetHeader> | void = await storeScore(
        myScore
      );
      res && setInsertId(res.data.insertId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* finishTypeが切り替わったらmodalを表示 */
  useEffect(() => {
    setShowModal(finishType != "");
  }, [finishType]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleSubmitNickname = async () => {
    if (!nickname) {
      setNameErr("nicknameを入力してください");
      return;
    }
    setNameErr("");
    /* レンダリングされるようディープコピー */
    const tmpMyScore = JSON.parse(JSON.stringify(myScore));
    tmpMyScore.user = nickname;
    /* DBにスコアを保存 */
    await updateName({ id: insertId, user: nickname });
    /* 表示を変更 */
    setMyScore(tmpMyScore);
    /* ストレージに保存 */
    sessionStorage.setItem("nickname", nickname);
  };
  return (
    <PokeFinishModalPresenter
      scoreAll={scoreAll}
      myScore={myScore}
      finishType={finishType}
      showModal={showModal}
      nickname={nickname}
      nameErr={nameErr}
      myIndex={myIndex}
      onCloseModal={handleCloseModal}
      onChangeNickname={handleChangeNickname}
      onSubmitNickname={handleSubmitNickname}
    />
  );
}
