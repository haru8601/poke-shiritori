import Image from "next/image";
import { ComponentProps, MutableRefObject } from "react";
import { Button, Overlay, Tooltip } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { GAME_STATUS } from "@/const/gameStatus";
import pikachuPic from "@/public/pikachu.png";
import PokeHeader from "./container";
import PokeConfig from "../PokeConfig/container";

type Props = ComponentProps<typeof PokeHeader> & {
  innerWidth: number;
  entered: boolean;
  toolTarget: MutableRefObject<null>;
  onReload: () => void;
  onEnterPokeImg: () => void;
};

export default function PokeHeaderPresenter({
  gameStatus,
  innerWidth,
  entered,
  monthScoreAll,
  totalScoreAll,
  toolTarget,
  onReload,
  onEnterPokeImg,
  onPlayAudio,
  onReloadRanking,
}: Props) {
  return (
    <div className="mb-3">
      <header className="mt-1 d-flex flex-row justify-content-between position-relative">
        <div className="d-inline-flex border-2 border-bottom border-dark">
          <h1
            className="d-inline-block align-self-center text-dark fw-bold"
            style={{ fontSize: "30px" }}
          >
            ポケモンしりとりSV
          </h1>
          {innerWidth >= CONFIG.pcMinWidth && (
            <>
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
            </>
          )}
        </div>
        <div className="d-flex">
          <Button
            className={`mx-1 text-nowrap bg-gradient ${styles.clickBtn} ${
              innerWidth < CONFIG.pcMinWidth ? "align-self-center p-1" : ""
            } ${gameStatus == GAME_STATUS.beforeStart && styles.grayOut}`}
            variant="dark"
            type="submit"
            onClick={onReload}
          >
            {(innerWidth >= CONFIG.pcMinWidth && "目の前を真っ暗にする") ||
              "リセット"}
          </Button>
          <PokeConfig
            monthScoreAll={monthScoreAll}
            totalScoreAll={totalScoreAll}
            innerWidth={innerWidth}
            onPlayAudio={onPlayAudio}
            onReloadRanking={onReloadRanking}
          />
        </div>
      </header>
      <h3
        className={`my-0 text-success text-uppercase ${
          gameStatus.includes("end") ? "" : "d-none"
        }`}
      >
        {gameStatus == GAME_STATUS.endWin ? "YOU WIN!!!" : "FINISH!"}
      </h3>
    </div>
  );
}
