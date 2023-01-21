import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeCardPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "targetPoke"> & {
  small?: boolean;
  zIndex?: number;
};

export default function PokeCard({
  targetPoke,
  small = false,
  zIndex = 0,
}: Props) {
  return (
    <PokeCardPresenter targetPoke={targetPoke} small={small} zIndex={zIndex} />
  );
}
