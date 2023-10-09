import { ChangeEvent, ComponentProps, ReactNode } from "react";
import {
  Badge,
  Button,
  Form,
  InputGroup,
  Modal,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import Tweet from "@/components/Card/Tweet/container";
import { CONFIG } from "@/const/config";
import { OS_KEY } from "@/const/os";
import { TEXT } from "@/const/text";
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
      <Modal.Header closeButton>
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
      <Modal.Body className="d-flex flex-column">
        <div className="d-flex justify-content-around mb-3">
          <Tweet score={score} myIndex={myIndex} myMonthIndex={myMonthIndex} />
        </div>
        <div className="mb-3">
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
              {(isLoading && TEXT.loading) || (
                <span>
                  保存
                  {innerWidth >= CONFIG.pcMinWidth && `(${OS_KEY[os]}+Enter)`}
                </span>
              )}
            </Button>
            {nicknameErr && (
              <Form.Control.Feedback type="invalid">
                {nicknameErr}
              </Form.Control.Feedback>
            )}
          </InputGroup>
        </div>
        <Tabs defaultActiveKey="candidates" className="mb-3">
          <Tab eventKey="candidates" title="候補">
            <div className="d-flex flex-column">
              {Object.values(candidateMap).map((poke, index) => (
                <div key={index} className="mb-2">
                  <PokeCard targetPoke={poke}></PokeCard>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="ranking" title="月間ランキング">
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
                      <td>{nickname || CONFIG.score.defaultNickname}</td>
                      <td>{score}</td>
                    </tr>
                  </tfoot>
                )}
              </Table>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
