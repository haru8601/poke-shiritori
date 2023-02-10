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
  finishType,
  diff,
  innerWidth,
  clicked,
  scoreAll,
  onReload,
  onChangeDiff,
  onClickPokeImg,
}: Props) {
  return (
    <header
      className={`mt-1 mb-3 d-flex justify-content-between ${styles.header}`}
    >
      <div className="d-inline-flex me-auto border-2 border-bottom border-dark ">
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
      <Button
        className={`mx-3 ${styles.clickBtn}`}
        variant="dark"
        type="submit"
        onClick={onReload}
      >
        {(innerWidth >= 700 && "目の前を真っ暗にする") || (
          <i className={`bi bi-arrow-clockwise ${styles.btnIcon}`}></i>
        )}
      </Button>
      <PokeConfig diff={diff} scoreAll={scoreAll} onChangeDiff={onChangeDiff} />
      {finishType != "" && (
        <h3 className={`my-0 text-success text-uppercase ${styles.finishLogo}`}>
          you {finishType} {finishType == "win" ? "!!" : "..."}
        </h3>
      )}
    </header>
  );
}
