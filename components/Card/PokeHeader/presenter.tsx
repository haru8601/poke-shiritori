import Image from "next/image";
import { ChangeEvent, ComponentProps, MutableRefObject } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import pikachuPic from "@/public/pikachu.png";
import PokeHeader from "./container";
import PokeConfig from "../PokeConfig/container";

type Props = ComponentProps<typeof PokeHeader> & {
  innerWidth: number;
  entered: boolean;
  toolTarget: MutableRefObject<null>;
  onReload: () => void;
  onChangeDiff: (event: ChangeEvent<HTMLInputElement>) => void;
  onEnterPokeImg: () => void;
};

export default function PokeHeaderPresenter({
  gameStatus,
  diff,
  innerWidth,
  entered,
  scoreAllPromise,
  toolTarget,
  onReload,
  onChangeDiff,
  onEnterPokeImg,
  onClickStart,
}: Props) {
  return (
    <div className="mb-3">
      <header className="mt-1 d-flex flex-row justify-content-between position-relative">
        <div className="d-inline-flex border-2 border-bottom border-dark">
          <h1
            className="d-inline-block align-self-center text-dark fw-bold"
            style={{ fontSize: "30px" }}
          >
            ポケモンしりとりSV(β版)
          </h1>
          <Image
            className={entered ? styles.jumpImg : ""}
            height={CONFIG.spaceBasis}
            width={CONFIG.spaceBasis}
            src={pikachuPic}
            alt="ピカチュウの尻尾の画像です"
            onClick={onEnterPokeImg}
            onMouseEnter={onEnterPokeImg}
            ref={toolTarget}
          />
          <Overlay placement="right" target={toolTarget} show={entered}>
            <Tooltip>made by haroot</Tooltip>
          </Overlay>
        </div>
        <div className="d-flex">
          {(gameStatus == "before_start" && (
            <Button
              className={`mx-1 text-nowrap ${styles.clickBtn} ${
                innerWidth < 700 ? "align-self-center p-1" : ""
              }`}
              variant="success"
              type="submit"
              onClick={onClickStart}
            >
              スタート
            </Button>
          )) || (
            <Button
              className={`mx-1 text-nowrap ${styles.clickBtn} ${
                innerWidth < 700 ? "align-self-center p-1" : ""
              }`}
              variant="dark"
              type="submit"
              onClick={onReload}
            >
              {(innerWidth >= 700 && "目の前を真っ暗にする") || "リセット"}
            </Button>
          )}
          <PokeConfig
            diff={diff}
            scoreAllPromise={scoreAllPromise}
            innerWidth={innerWidth}
            onChangeDiff={onChangeDiff}
          />
        </div>
      </header>
      <h3
        className={`my-0 text-success text-uppercase ${
          gameStatus.includes("end") ? "" : "d-none"
        }`}
      >
        {gameStatus == "end_win" ? "YOU WIN!!!" : "FINISH!"}
      </h3>
    </div>
  );
}
