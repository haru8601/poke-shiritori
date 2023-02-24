import { ComponentProps } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  ListGroup,
  Offcanvas,
  OverlayTrigger,
  Tab,
  Table,
  Tabs,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { TIPS } from "@/const/tips";
import styles from "@/styles/Top.module.css";
import { Diff } from "@/types/Diff";
import { Score } from "@/types/Score";
import PokeConfig from "./container";

type Props = ComponentProps<typeof PokeConfig> & {
  showSide: boolean;
  onOpenSide: () => void;
  onCloseSide: () => void;
};

export default function PokeConfigPresenter({
  diff,
  showSide,
  scoreAll,
  innerWidth,
  onChangeDiff,
  onOpenSide,
  onCloseSide,
}: Props) {
  return (
    <>
      <Button
        variant="secondary"
        className={`mx-1 ${styles.clickBtn} ${
          innerWidth < 700 ? "align-self-center p-1" : ""
        }`}
        onClick={onOpenSide}
      >
        <i className={`bi bi-gear-fill ${styles.btnIcon}`}></i>
      </Button>
      <Offcanvas
        className={styles.configCanvas}
        placement="end"
        show={showSide}
        onHide={onCloseSide}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>設定</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="py-0">
          <Tabs defaultActiveKey="config" className="mb-3">
            <Tab eventKey="config" title="設定">
              <div>難易度</div>
              <ButtonGroup>
                {Object.keys(CONFIG.diff).map((type, index) => (
                  <OverlayTrigger
                    key={index}
                    placement="bottom"
                    overlay={<Tooltip>{CONFIG.diff[type as Diff]}</Tooltip>}
                  >
                    <ToggleButton
                      id={`${index}`}
                      type="radio"
                      value={type}
                      checked={type == diff}
                      variant="outline-primary"
                      onChange={onChangeDiff}
                    >
                      {type}
                    </ToggleButton>
                  </OverlayTrigger>
                ))}
              </ButtonGroup>
            </Tab>
            <Tab eventKey="ranking" title="ランキング">
              <div
                className="rounded overflow-scroll"
                style={{
                  height: "70vh",
                }}
              >
                <Table hover striped>
                  <thead className="position-sticky top-0 bg-success">
                    <tr>
                      <th>順位</th>
                      <th>ユーザー</th>
                      <th>スコア</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreAll
                      // .slice(0, CONFIG.rankLimit)
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
                </Table>
              </div>
            </Tab>
            <Tab eventKey="rules" title="ルール">
              <ListGroup
                as="ol"
                numbered
                className="overflow-scroll"
                style={{ height: "70vh" }}
              >
                <ListGroup.Item as="li" className="d-flex">
                  <div>
                    <p className="fw-bold">伸ばし棒は無視します</p>
                    <p>{"ex)「キャタピー」->o「ピッピ」"}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex">
                  <div>
                    <p className="fw-bold">{"濁点、半濁点は無視しません"}</p>
                    <p>{"ex)「ボーマンダ」->x「タツベイ」"}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex">
                  <div>
                    <p className="fw-bold">{"小文字は大文字に変換されます"}</p>
                    <p>{"ex)「ゴローニャ」->o「ヤミラミ」"}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex">
                  <div>
                    <p className="fw-bold">
                      {"特殊な文字は一般的な読み方に変換されます"}
                    </p>
                    <p>{"ex1)「ニドラン♀(めす)」->o「スターミー」"}</p>
                    <p>{"ex2)「ポリゴンＺ(ぜっと)」->o「トランセル」"}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item as="li" className="d-flex">
                  <div>
                    <p className="fw-bold">
                      {
                        "直前の相手ポケモンに有利なタイプが有るか無いかで、制限時間が増え方が変わります"
                      }
                    </p>
                    <p>
                      {
                        "ex1)「ヒトカゲ」に対して「ゲッコウガ」を出すと、制限時間が2秒増えます"
                      }
                    </p>
                    <p>
                      {
                        "ex2)「ワニノコ」に対して「コダック」を出しても、0.5秒しか増えません"
                      }
                    </p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
            <Tab eventKey="tips" title="tips">
              <p style={{ fontSize: "14px" }}>※SVまでの情報です</p>
              <Accordion>
                {TIPS.map((tip, index) => (
                  <Accordion.Item key={index} eventKey={`${index}`}>
                    <Accordion.Header
                      className={`border-bottom border-dark rounded-1 ${styles.tipHeader}`}
                    >
                      {tip.title}
                    </Accordion.Header>
                    <Accordion.Body
                      className={`border-bottom border-dark rounded-1 ${styles.tipBody}`}
                    >
                      {tip.body}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
