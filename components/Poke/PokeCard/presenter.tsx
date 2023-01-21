import { ComponentProps } from "react";
import { Image } from "react-bootstrap";
import PokeCard from "./container";

type Props = ComponentProps<typeof PokeCard>;

export default function PokeCardPresenter({ targetPoke, spaceBasis }: Props) {
  return (
    <>
      <span>{targetPoke.name.japanese}</span>
      <Image
        className="inline-block"
        height={spaceBasis * 0.8}
        width={spaceBasis * 0.8}
        src={targetPoke.imgPath ?? "/pikachu.png"}
        alt=""
      />
    </>
  );
}
