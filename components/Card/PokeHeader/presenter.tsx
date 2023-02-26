import { ChangeEvent, ComponentProps } from "react";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import styles from "@/styles/Top.module.css";
import PokeHeader from "./container";
import PokeConfig from "../PokeConfig/container";

type Props = ComponentProps<typeof PokeHeader> & {
  innerWidth: number;
  clicked: boolean;
  onReload: () => void;
  onChangeDiff: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickPokeImg: () => void;
};

export default function PokeHeaderPresenter({
  gameStatus,
  diff,
  innerWidth,
  clicked,
  scoreAll,
  onReload,
  onChangeDiff,
  onClickPokeImg,
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
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip>made by haroot</Tooltip>}
          >
            <Image
              /* mobileのhover制御もあるためjsで動的クラス追加 */
              className={`${styles.pokeImg} ${clicked ? styles.jumpImg : ""}`}
              height={CONFIG.spaceBasis}
              width={CONFIG.spaceBasis}
              src={PATH.defaultImg}
              alt="ピカチュウの尻尾の画像です"
              onClick={onClickPokeImg}
            />
          </OverlayTrigger>
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
            scoreAll={scoreAll}
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
