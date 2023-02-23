import { ComponentProps } from "react";
import { Image } from "react-bootstrap";
import styles from "@/styles/Top.module.css";
import PokeCard from "./container";

type Props = Required<
  Pick<ComponentProps<typeof PokeCard>, "imgBase" | "small" | "zIndex">
> & {
  pokeName: string;
  pokeImg: string;
  clicked: boolean;
  onClickPokeImg: () => void;
};

export default function PokeCardPresenter({
  pokeName,
  pokeImg,
  small,
  zIndex,
  imgBase,
  clicked,
  onClickPokeImg,
}: Props) {
  return (
    <>
      <span className="align-self-center">{pokeName}</span>
      <Image
        /* mobileのhover制御はjsで動的クラス追加 */
        className={`${styles.pokeImg} ${clicked ? styles.jumpImg : ""}`}
        height={small ? imgBase : imgBase * 1.2}
        width={small ? imgBase : imgBase * 1.2}
        src={pokeImg}
        alt="ポケモンの画像です。"
        style={{ zIndex: zIndex }}
        onClick={onClickPokeImg}
      />
    </>
  );
}
