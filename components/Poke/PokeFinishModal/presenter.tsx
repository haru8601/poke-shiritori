import { ChangeEvent, ComponentProps, ReactNode } from "react";
import { Badge, Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import Tweet from "@/components/Card/Tweet/container";
import { CONFIG } from "@/const/config";
import { TEXT } from "@/const/text";
import { getRankText } from "@/utils/getMyRank";
import PokeFinishModal from "./container";

type Props = Pick<ComponentProps<typeof PokeFinishModal>, "score"> & {
  monthRankRowAll: ReactNode;
  showModal: boolean;
  nickname: string | null;
  nicknameErr: string;
  isLoading: boolean;
  myIndex: number;
  myMonthIndex: number;
  onCloseModal: () => void;
  onChangeNickname: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmitNickname: () => void;
};

export default function PokeFinishModalPresenter({
  monthRankRowAll,
  score,
  showModal,
  nickname,
  nicknameErr,
  myIndex,
  myMonthIndex,
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
          className="text-primary flex-grow-1 text-center"
          style={{ fontSize: "3rem" }}
        >
          {(myMonthIndex >= 0 &&
            myMonthIndex < CONFIG.rankLimit &&
            `月間${myMonthIndex + 1}位！`) ||
            getRankText(score)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column" style={{ maxHeight: "80vh" }}>
        <Tweet
          score={score}
          myIndex={myIndex}
          myMonthIndex={myMonthIndex}
          className="m-3 mb-4"
        />
        <Badge bg="secondary" className="mb-1 align-self-start">
          ニックネーム
        </Badge>
        <InputGroup
          className={`mx-auto justify-content-center ${styles.pointer}`}
        >
          <Form.Control
            placeholder={CONFIG.score.defaultNickname}
            value={nickname ?? ""}
            onChange={onChangeNickname}
            className={styles.pokeInput}
            isInvalid={nicknameErr !== ""}
          />
          <Button
            variant="primary"
            className={`rounded-end ${styles.submitBtn}`}
            type="submit"
            onClick={!isLoading ? onSubmitNickname : void 0}
            disabled={isLoading}
          >
            {(isLoading && TEXT.loading) || "登録"}
          </Button>
          {nicknameErr && (
            <Form.Control.Feedback type="invalid">
              {nicknameErr}
            </Form.Control.Feedback>
          )}
        </InputGroup>
        <h4 className="mt-3">月間ランキング</h4>
        <div style={{ height: "auto", overflowY: "scroll" }}>
          <Table hover striped>
            <thead className="position-sticky top-0 bg-success">
              <tr>
                <th>順位</th>
                <th>ユーザー</th>
                <th>スコア</th>
              </tr>
            </thead>
            <tbody>{monthRankRowAll}</tbody>
            {myMonthIndex >= CONFIG.rankLimit && (
              <tfoot style={{ borderTop: "3px double black" }}>
                <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                </tr>
                <tr className={styles.myScore}>
                  <td>{myMonthIndex + 1}</td>
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
