import { ComponentProps } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Offcanvas,
  OverlayTrigger,
  ToggleButton,
  Tooltip,
} from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { TIPS } from "@/const/tips";
import styles from "@/styles/Top.module.css";
import { Diff } from "@/types/Diff";
import PokeConfig from "./container";

type Props = ComponentProps<typeof PokeConfig> & {
  showSide: boolean;
  onOpenSide: () => void;
  onCloseSide: () => void;
};

export default function PokeConfigPresenter({
  diff,
  showSide,
  onChangeDiff,
  onOpenSide,
  onCloseSide,
}: Props) {
  return (
    <>
      <Button
        variant="secondary"
        className={`mx-3 ${styles.clickBtn}`}
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
    </>
  );
}
