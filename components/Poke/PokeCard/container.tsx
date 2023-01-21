import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeCardPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "targetPoke" | "spaceBasis"
>;

export default function PokeCard({ targetPoke, spaceBasis }: Props) {
  return <PokeCardPresenter targetPoke={targetPoke} spaceBasis={spaceBasis} />;
}
