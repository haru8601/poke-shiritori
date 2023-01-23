import { ComponentProps } from "react";
import { Image } from "react-bootstrap";
import PokeCard from "./container";
import styles from "@/styles/Top.module.css";
import { PATH } from "@/const/path";

type Props = Required<ComponentProps<typeof PokeCard>>;

export default function PokeCardPresenter({
  targetPoke,
  small,
  zIndex,
  imgBase,
}: Props) {
  return (
    <>
      <span className="align-self-center">{targetPoke.name.japanese}</span>
      <Image
        className={styles.pokeImage}
        height={small ? imgBase : imgBase * 1.2}
        width={small ? imgBase : imgBase * 1.2}
        src={targetPoke.imgPath ?? PATH.defaultImg}
        alt=""
        style={{ zIndex: zIndex }}
      />
    </>
  );
}
