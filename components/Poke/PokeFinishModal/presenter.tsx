import { ChangeEvent, ComponentProps } from "react";
import { Badge, Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import Tweet from "@/components/Card/Tweet/container";
import { CONFIG } from "@/const/config";
import { Score } from "@/types/Score";
import PokeFinishModal from "./container";

type Props = Pick<
  ComponentProps<typeof PokeFinishModal>,
  "gameStatus" | "score"
> & {
  scoreAll: Score[];
  showModal: boolean;
  nickname: string | null;
  myIndex: number;
  nicknameErr: string;
  isLoading: boolean;
  onCloseModal: () => void;
  onChangeNickname: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitNickname: () => void;
};

export default function PokeFinishModalPresenter({
  scoreAll,
  score,
  gameStatus,
  showModal,
  nickname,
  nicknameErr,
  myIndex,
  isLoading,
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
          {gameStatus == "end_win" ? "YOU WIN!!!" : "FINISH!"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column" style={{ maxHeight: "80vh" }}>
        <Tweet score={score} myIndex={myIndex} className="m-3 mb-4" />
        <Badge bg="secondary" className="mb-1 align-self-start">
          ニックネーム
        </Badge>
        <InputGroup className="mx-auto justify-content-center">
          <Form.Control
            placeholder={CONFIG.score.defaultNickname}
            value={nickname ?? ""}
            onChange={onChangeNickname}
            className={styles.pokeInput}
            isInvalid={nicknameErr !== ""}
          />
          <Button
            variant="primary"
            className="rounded-end"
            type="submit"
            style={{ fontSize: "16px", width: "170px" }}
            onClick={!isLoading ? onSubmitNickname : void 0}
            disabled={isLoading}
          >
            {(isLoading && "Loading...") || "記録して次の対戦へ"}
          </Button>
          {nicknameErr && (
            <Form.Control.Feedback type="invalid">
              {nicknameErr}
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
                .concat({
                  id: -1,
                  user: nickname || CONFIG.score.defaultNickname,
                  score: score,
                })
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
                      className={`${
                        !score.id || score.id < 0 ? styles.myScore : ""
                      }`}
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
                  <td>{nickname || CONFIG.score.defaultNickname}</td>
                  <td>{score}</td>
                </tr>
              </tfoot>
            )}
          </Table>
        </div>
      </Modal.Body>
    </Modal>
  );
}
