import { ComponentProps, Fragment, MutableRefObject } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  ListGroup,
  Offcanvas,
  Overlay,
  Tab,
  Table,
  Tabs,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { RULES } from "@/const/rules";
import { TIPS } from "@/const/tips";
import { Diff } from "@/types/Diff";
import { Score } from "@/types/Score";
import PokeConfig from "./container";

type Props = ComponentProps<typeof PokeConfig> & {
  showSide: boolean;
  toolTarget: MutableRefObject<null>;
  onOpenSide: () => void;
  onCloseSide: () => void;
};

export default function PokeConfigPresenter({
  diff,
  showSide,
  scoreAll,
  innerWidth,
  toolTarget,
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
              <p>※ 停止中</p>
              <ButtonGroup>
                {Object.keys(CONFIG.diff).map((type, index) => (
                  <Fragment key={index}>
                    <ToggleButton
                      id={`${index}`}
                      type="radio"
                      value={type}
                      checked={type == diff}
                      variant="outline-primary"
                      onChange={onChangeDiff}
                      disabled
                      ref={toolTarget}
                    >
                      {type}
                    </ToggleButton>
                    <Overlay placement="bottom" target={toolTarget}>
                      <Tooltip>{CONFIG.diff[type as Diff]}</Tooltip>
                    </Overlay>
                  </Fragment>
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
                    {scoreAll.map((score: Score, index) => {
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
                {RULES.map((rule, index) => (
                  <ListGroup.Item key={index} as="li" className="d-flex">
                    <div>
                      <p className="fw-bold">{rule.title}</p>
                      {rule.body}
                    </div>
                  </ListGroup.Item>
                ))}
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
