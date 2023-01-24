import { ComponentProps } from "react";
import { Image } from "react-bootstrap";
import PokeCard from "./container";
import styles from "@/styles/Top.module.css";
import { PATH } from "@/const/path";

type Props = Required<ComponentProps<typeof PokeCard>> & {
  isHover: boolean;
  onClickPokeImg: () => void;
};

export default function PokeCardPresenter({
  targetPoke,
  small,
  zIndex,
  imgBase,
  isHover,
  onClickPokeImg,
}: Props) {
  return (
    <>
      <span className="align-self-center">{targetPoke.name.japanese}</span>
      <Image
        /* mobileのhover制御もあるためjsで動的クラス追加 */
        className={isHover ? styles.hoverImg : ""}
        height={small ? imgBase : imgBase * 1.2}
        width={small ? imgBase : imgBase * 1.2}
        src={targetPoke.imgPath ?? PATH.defaultImg}
        alt="ポケモンの画像です。"
        style={{ zIndex: zIndex }}
        onClick={onClickPokeImg}
      />
    </>
  );
}
