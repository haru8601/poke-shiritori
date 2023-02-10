import { ChangeEvent, ComponentProps } from "react";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import Tweet from "@/components/Card/Tweet/container";
import { CONFIG } from "@/const/config";
import { USER } from "@/const/user";
import styles from "@/styles/Top.module.css";
import { Score } from "@/types/Score";
import PokeFinishModal from "./container";

type Props = Pick<ComponentProps<typeof PokeFinishModal>, "finishType"> & {
  scoreAll: Score[];
  myScore: Score;
  showModal: boolean;
  nickname: string;
  nameErr: string;
  myIndex: number;
  onCloseModal: () => void;
  onChangeNickname: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitNickname: () => void;
};

export default function PokeFinishModalPresenter({
  scoreAll,
  myScore,
  finishType,
  showModal,
  nickname,
  nameErr,
  myIndex,
  onCloseModal,
  onChangeNickname,
  onSubmitNickname,
}: Props) {
  return (
    <Modal
      show={showModal}
      onHide={onCloseModal}
      className={`${styles.finishModal} overflow-hidden`}
      backdrop="static"
    >
      <Modal.Header closeButton style={{ height: "15vh" }}>
        <Modal.Title
          className="text-success text-uppercase flex-grow-1 text-center"
          style={{ fontSize: "3rem" }}
        >
          you {finishType} {finishType == "win" ? "!!" : "..."}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column" style={{ maxHeight: "80vh" }}>
        <Tweet
          usedPokeCount={myScore.score}
          myIndex={myIndex}
          className="m-3 mb-5"
        />
        <InputGroup className="mx-auto justify-content-center">
          <InputGroup.Text>ニックネーム</InputGroup.Text>
          <Form.Control
            placeholder={USER.defaultName}
            value={nickname}
            onChange={onChangeNickname}
            isInvalid={nameErr != ""}
            className={styles.pokeInput}
          />
          <Button
            variant="primary"
            className="rounded-end"
            type="submit"
            onClick={onSubmitNickname}
          >
            変更
          </Button>
          {nameErr && (
            <Form.Control.Feedback type="invalid" tooltip>
              {nameErr}
            </Form.Control.Feedback>
          )}
        </InputGroup>
        <h4 className="mt-3">ランキング</h4>
        <div style={{ height: "auto", overflowY: "scroll" }}>
          <Table>
            <thead>
              <tr>
                <th>順位</th>
                <th>ユーザー</th>
                <th>スコア</th>
              </tr>
            </thead>
            <tbody>
              {scoreAll
                .concat(myScore)
                .sort((a, b) => {
                  const scoreDiff = b.score - a.score;
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
                      className={`${score.id < 0 ? styles.myScore : ""}`}
                    >
                      <td>{index + 1}</td>
                      <td>{score.user}</td>
                      <td>{score.score}</td>
                    </tr>
                  );
                })}
            </tbody>
            {myIndex >= CONFIG.rankLimit && (
              <tfoot style={{ borderTop: "3px double black" }}>
                <tr className={styles.myScore}>
                  <td>{myIndex + 1}</td>
                  <td>{myScore.user}</td>
                  <td>{myScore.score}</td>
                </tr>
              </tfoot>
            )}
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}
