import { PATH } from "@/const/path";
import { ComponentProps } from "react";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import PokeHeader from "./container";

type Props = ComponentProps<typeof PokeHeader> & {
  onReload: () => void;
};

export default function PokeHeaderPresenter({
  spaceBasis,
  finishType,
  onReload,
}: Props) {
  return (
    <header className="m-3 mb-5 d-flex justify-content-between">
      <div className="d-inline-flex border-2 border-bottom border-dark">
        <h1 className="text-dark fs-1 fw-bold">ポケモンしりとり</h1>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>made by haroot</Tooltip>}
        >
          <Image
            className="inline-block"
            height={spaceBasis}
            width={spaceBasis}
            src={PATH.defaultImg}
            alt=""
            style={{ animation: "" }}
          />
        </OverlayTrigger>
      </div>
      {finishType != "" && (
        <h3 className="my-0 text-success text-uppercase">
          you {finishType} {finishType == "win" ? "!!" : "..."}
        </h3>
      )}
      <Button variant="dark" type="submit" onClick={onReload}>
        目の前を真っ暗にする
      </Button>
    </header>
  );
}
