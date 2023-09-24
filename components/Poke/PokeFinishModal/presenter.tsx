import { ChangeEvent, ComponentProps, ReactNode } from "react";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import Tweet from "@/components/Card/Tweet/container";
import { CONFIG } from "@/const/config";
import { OS_KEY } from "@/const/os";
import { PokeMap } from "@/types/Poke";
import { getRankText } from "@/utils/getMyRank";
import PokeFinishModal from "./container";
import PokeCard from "../PokeCard/container";

type Props = Pick<
  ComponentProps<typeof PokeFinishModal>,
  "score" | "os" | "innerWidth"
> & {
  monthRankRowAll: ReactNode;
  showModal: boolean;
  candidateMap: PokeMap;
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
  candidateMap,
  showModal,
  nickname,
  nicknameErr,
  myIndex,
  myMonthIndex,
  isLoading,
  os,
  innerWidth,
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
      <Modal.Header closeButton style={{ height: "10vh" }}>
        <Modal.Title
          className="text-primary flex-grow-1 text-center"
          style={{ fontSize: "2rem" }}
        >
          {(myMonthIndex >= 0 &&
            myMonthIndex < CONFIG.rankLimit &&
            `月間${myMonthIndex + 1}位！`) ||
            getRankText(score)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column" style={{ maxHeight: "90vh" }}>
        <div className="d-flex justify-content-around">
          <Tweet score={score} myIndex={myIndex} myMonthIndex={myMonthIndex} />
          <Button
            variant="primary"
            onClick={!isLoading ? onSubmitNickname : void 0}
            disabled={isLoading}
          >
            <i className="bi bi-forward-fill fs-5"></i>
            {`${
              (innerWidth >= CONFIG.pcMinWidth && `(${OS_KEY[os]}+Enter)`) || ""
            }`}
          </Button>
        </div>
        <h4>候補</h4>
        <div className="d-flex">
          {Object.values(candidateMap).map((poke, index) => (
            <PokeCard key={index} targetPoke={poke}></PokeCard>
          ))}
        </div>
        <h4 className="mt-3">月間ランキング</h4>
        <div style={{ height: "auto", overflowY: "scroll" }}>
          <Table hover striped>
            <thead className="position-sticky top-0 bg-success bg-gradient">
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
                  <td>
                    {" "}
                    <InputGroup
                      className={`${styles.pointer}`}
                      style={{ width: "80%" }}
                    >
                      <Form.Control
                        placeholder={CONFIG.score.defaultNickname}
                        value={nickname ?? ""}
                        onChange={onChangeNickname}
                        className={styles.pokeInput}
                        isInvalid={nicknameErr !== ""}
                        /* デフォのpaddingだと大きすぎるので調整 */
                        style={{ padding: "0.175rem 0.75rem" }}
                      />
                      {nicknameErr && (
                        <Form.Control.Feedback type="invalid">
                          {nicknameErr}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>
                  </td>
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
