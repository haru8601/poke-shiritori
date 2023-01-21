import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeFirstPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "firstPoke" | "spaceBasis"
>;

export default function PokeFirst({ firstPoke, spaceBasis }: Props) {
  return <PokeFirstPresenter firstPoke={firstPoke} spaceBasis={spaceBasis} />;
}
