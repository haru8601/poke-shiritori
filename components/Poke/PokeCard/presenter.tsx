import Image from "next/image";
import { ComponentProps } from "react";
import styles from "@/app/styles/Top.module.css";
import PokeCard from "./container";

type Props = Required<
  Pick<ComponentProps<typeof PokeCard>, "imgBase" | "small" | "zIndex">
> & {
  pokeName: string;
  pokeImg: string;
  entered: boolean;
  onEnterPokeImg: () => void;
};

export default function PokeCardPresenter({
  pokeName,
  pokeImg,
  small,
  zIndex,
  imgBase,
  entered,
  onEnterPokeImg,
}: Props) {
  return (
    <>
      <span className="align-self-center">{pokeName}</span>
      <Image
        className={entered ? styles.jumpImg : ""}
        height={small ? imgBase : imgBase * 1.2}
        width={small ? imgBase : imgBase * 1.2}
        src={pokeImg}
        alt={pokeName}
        style={{ zIndex: zIndex }}
        onClick={onEnterPokeImg}
        onMouseEnter={onEnterPokeImg}
      />
    </>
  );
}
