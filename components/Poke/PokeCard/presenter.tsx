import { ComponentProps } from "react";
import { Image } from "react-bootstrap";
import PokeCard from "./container";

type Props = Required<ComponentProps<typeof PokeCard>>;

export default function PokeCardPresenter({
  targetPoke,
  spaceBasis,
  small,
}: Props) {
  return (
    <>
      <span className="align-self-center">{targetPoke.name.japanese}</span>
      <Image
        className="inline-block"
        height={small ? spaceBasis : spaceBasis * 1.2}
        width={small ? spaceBasis : spaceBasis * 1.2}
        src={targetPoke.imgPath ?? "/pikachu.png"}
        alt=""
      />
    </>
  );
}
