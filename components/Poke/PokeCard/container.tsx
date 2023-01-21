import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeCardPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "targetPoke" | "spaceBasis"
> & {
  small?: boolean;
  zIndex?: number;
};

export default function PokeCard({
  targetPoke,
  spaceBasis,
  small = false,
  zIndex = 0,
}: Props) {
  return (
    <PokeCardPresenter
      targetPoke={targetPoke}
      spaceBasis={spaceBasis}
      small={small}
      zIndex={zIndex}
    />
  );
}
