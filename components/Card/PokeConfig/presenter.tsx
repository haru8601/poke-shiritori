import { parseCookies } from "nookies";
import { ComponentProps, ReactNode, SyntheticEvent } from "react";
import {
  Accordion,
  Button,
  Dropdown,
  Form,
  ListGroup,
  Offcanvas,
  Tab,
  Table,
  Tabs,
} from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { COOKIE_NAMES, COOKIE_VALUES } from "@/const/cookie";
import { RULES } from "@/const/rules";
import { TIPS } from "@/const/tips";
import { getDescHistories } from "@/utils/getDescHistories";
import PokeConfig from "./container";

type Props = Pick<
  ComponentProps<typeof PokeConfig>,
  "innerWidth" | "onPlayAudio" | "onReloadRanking"
> & {
  rankRowAll: ReactNode;
  monthRankRowAll: ReactNode;
  oldRankRowAll: ReactNode;
  showSide: boolean;
  version: number;
  versionList: number[];
  onOpenSide: () => void;
  onCloseSide: () => void;
  onSwitchVersion: (
    eventKey: string | null,
    e: SyntheticEvent<unknown>
  ) => void;
};

export default function PokeConfigPresenter({
  showSide,
  rankRowAll,
  monthRankRowAll,
  oldRankRowAll,
  version,
  versionList,
  innerWidth,
  onOpenSide,
  onCloseSide,
  onPlayAudio,
  onReloadRanking,
  onSwitchVersion,
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
          <Tabs defaultActiveKey="ranking" className="mb-3">
            <Tab eventKey="ranking" title="ランキング">
              <div
                className="d-flex flex-column rounded overflow-scroll"
                style={{
                  height: "70vh",
                }}
              >
                <Button
                  variant="link"
                  onClick={onReloadRanking}
                  className={`align-self-end p-0 pe-3 ${styles.clickBtn}`}
                >
                  <i className="bi bi-arrow-clockwise fs-5"></i>
                </Button>
                <Tabs defaultActiveKey="month-rank" className="mb-3" justify>
                  <Tab eventKey="month-rank" title="月間">
                    <Table hover striped>
                      <thead className="position-sticky top-0 bg-success bg-gradient">
                        <tr>
                          <th>順位</th>
                          <th>ユーザー</th>
                          <th>スコア</th>
                        </tr>
                      </thead>
                      <tbody>{monthRankRowAll}</tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="total-rank" title="総合">
                    <Table hover striped>
                      <thead className="position-sticky top-0 bg-success bg-gradient">
                        <tr>
                          <th>順位</th>
                          <th>ユーザー</th>
                          <th>スコア</th>
                        </tr>
                      </thead>
                      <tbody>{rankRowAll}</tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="old-rank" title="旧ver.">
                    <Dropdown onSelect={onSwitchVersion}>
                      <Dropdown.Toggle variant="primary" id="test">
                        ver. {version}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {versionList.map((version, index) => (
                          <Dropdown.Item key={index} eventKey={version}>
                            ver. {version}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <br></br>
                    <Table hover striped>
                      <thead className="position-sticky top-0 bg-success bg-gradient">
                        <tr>
                          <th>順位</th>
                          <th>ユーザー</th>
                          <th>スコア</th>
                        </tr>
                      </thead>
                      <tbody>{oldRankRowAll}</tbody>
                    </Table>
                  </Tab>
                </Tabs>
              </div>
            </Tab>
            <Tab eventKey="config" title="設定">
              <div className={`d-flex mb-3 ${styles.pointer}`}>
                <Form>
                  <Form.Check
                    type="switch"
                    id="audio-switch"
                    label="BGM"
                    reverse
                    defaultChecked={
                      parseCookies(null)[COOKIE_NAMES.shiritori_audio] ==
                      COOKIE_VALUES.on
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
            <Tab eventKey="history" title="変更履歴">
              <Table hover striped>
                <thead className="position-sticky top-0 bg-success bg-gradient">
                  <tr>
                    <th className={styles.fontSm}>バージョン</th>
                    <th className={styles.fontMd}>変更内容</th>
                    <th className={styles.fontSm}>変更日付</th>
                  </tr>
                </thead>
                <tbody>
                  {getDescHistories().map((history, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.fontSm}>{history.version}</td>
                        <td className={styles.fontMd}>{history.content}</td>
                        <td className={styles.fontSm}>
                          {history.createdAt.replaceAll(
                            /(\d{4})(\d{2})(\d{2})/g,
                            "$1/$2/$3"
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
