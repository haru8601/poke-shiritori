import { ComponentProps } from "react";
import { Image } from "react-bootstrap";
import PokeCard from "./container";
import styles from "@/styles/Top.module.css";

type Props = Required<ComponentProps<typeof PokeCard>>;

export default function PokeCardPresenter({
  targetPoke,
  spaceBasis,
  small,
  zIndex,
}: Props) {
  return (
    <>
      <span className="align-self-center">{targetPoke.name.japanese}</span>
      <Image
        className={styles.pokeImage}
        height={small ? spaceBasis : spaceBasis * 1.2}
        width={small ? spaceBasis : spaceBasis * 1.2}
        src={targetPoke.imgPath ?? "/pikachu.png"}
        alt=""
        style={{ zIndex: zIndex }}
      />
    </>
  );
}
