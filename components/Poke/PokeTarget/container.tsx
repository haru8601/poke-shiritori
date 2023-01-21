import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeTargetPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "targetPoke" | "spaceBasis"
>;

export default function PokeTarget({ targetPoke, spaceBasis }: Props) {
  return (
    <PokeTargetPresenter targetPoke={targetPoke} spaceBasis={spaceBasis} />
  );
}
