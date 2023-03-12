import { ChangeEvent, ComponentProps, ReactNode } from "react";
import { Badge, Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import Tweet from "@/components/Card/Tweet/container";
import { CONFIG } from "@/const/config";
import PokeFinishModal from "./container";

type Props = Pick<
  ComponentProps<typeof PokeFinishModal>,
  "gameStatus" | "score" | "myIndex"
> & {
  rankRowAll: ReactNode;
  showModal: boolean;
  nickname: string | null;
  nicknameErr: string;
  isLoading: boolean;
  onCloseModal: () => void;
  onChangeNickname: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitNickname: () => void;
};

export default function PokeFinishModalPresenter({
  rankRowAll,
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
            <tbody>{rankRowAll}</tbody>
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
