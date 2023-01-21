import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeCardPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "targetPoke" | "spaceBasis"
> & {
  small?: boolean;
};

export default function PokeCard({
  targetPoke,
  spaceBasis,
  small = false,
}: Props) {
  return (
    <PokeCardPresenter
      targetPoke={targetPoke}
      spaceBasis={spaceBasis}
      small={small}
    />
  );
}
