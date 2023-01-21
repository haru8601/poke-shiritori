import { PATH } from "@/const/path";
import { ChangeEvent, ComponentProps } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Image,
  Offcanvas,
  OverlayTrigger,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import PokeHeader from "./container";
import styles from "@/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { Diff } from "@/types/Diff";
import { TIPS } from "@/const/tips";

type Props = ComponentProps<typeof PokeHeader> & {
  showSide: boolean;
  onReload: () => void;
  onOpenSide: () => void;
  onCloseSide: () => void;
  onChangeDiff: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function PokeHeaderPresenter({
  showSide,
  finishType,
  diff,
  onReload,
  onOpenSide,
  onCloseSide,
  onChangeDiff,
}: Props) {
  return (
    <header className={`mb-5 d-flex justify-content-between ${styles.header}`}>
      <div className="d-inline-flex mb-2 border-2 border-bottom border-dark">
        <h1
          className={`d-inline-block align-self-center my-0 text-dark fw-bold ${styles.headerTitle}`}
        >
          ポケモンしりとり
        </h1>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>made by haroot</Tooltip>}
        >
          <Image
            className={styles.pokeImage}
            height={CONFIG.spaceBasis}
            width={CONFIG.spaceBasis}
            src={PATH.defaultImg}
            alt=""
          />
        </OverlayTrigger>
      </div>
      <Button variant="dark" type="submit" onClick={onReload}>
        目の前を真っ暗にする
      </Button>
      <Button variant="secondary" onClick={onOpenSide}>
        <i
          style={{ fontSize: "30px" }}
          className={`bi bi-gear-fill ${styles.configBtn}`}
        ></i>
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
        <Offcanvas.Body className="d-flex flex-column justify-content-around">
          <div>
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
                    onClick={async () =>
                      console.log(localStorage.getItem("diff"))
                    }
                    onChange={onChangeDiff}
                  >
                    {type}
                  </ToggleButton>
                </OverlayTrigger>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <p style={{ fontSize: "20px" }}>tips</p>
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
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      {finishType != "" && (
        <h3 className={`my-0 text-success text-uppercase ${styles.finishLogo}`}>
          you {finishType} {finishType == "win" ? "!!" : "..."}
        </h3>
      )}
    </header>
  );
}
