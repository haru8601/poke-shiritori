import { parseCookies } from "nookies";
import { ComponentProps, ReactNode } from "react";
import {
  Accordion,
  Button,
  Form,
  ListGroup,
  Offcanvas,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { CookieNames } from "@/const/cookieNames";
import { RULES } from "@/const/rules";
import { TIPS } from "@/const/tips";
import PokeConfig from "./container";

type Props = Pick<
  ComponentProps<typeof PokeConfig>,
  "innerWidth" | "onPlayAudio"
> & {
  rankRowAll: ReactNode;
  showSide: boolean;
  onOpenSide: () => void;
  onCloseSide: () => void;
};

export default function PokeConfigPresenter({
  showSide,
  rankRowAll,
  innerWidth,
  onOpenSide,
  onCloseSide,
  onPlayAudio,
}: Props) {
  return (
    <>
      <Button
        variant="secondary"
        className={`mx-1 ${styles.clickBtn} ${
          innerWidth < CONFIG.pcMinWidth ? "align-self-center p-1" : ""
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
        <Offcanvas.Body className="pt-0">
          <Tabs defaultActiveKey="config" className="mb-3">
            <Tab eventKey="config" title="設定">
              <div className={`d-flex mb-3 ${styles.pointer}`}>
                <Form>
                  <Form.Check
                    type="switch"
                    id="audio-switch"
                    label="BGM"
                    reverse
                    defaultChecked={
                      parseCookies(null)[CookieNames.audio] == "on"
                    }
                    onClick={onPlayAudio}
                  ></Form.Check>
                </Form>
              </div>
              <p style={{ fontSize: "12px" }}>
                ©2023 Pokémon. ©1995-2023 Nintendo/Creatures Inc./GAME FREAK
                inc. これは「Pokémon Game Sound
                Library」の利用規約に同意し作成されたコンテンツです。
              </p>
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
                  <tbody>{rankRowAll}</tbody>
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
