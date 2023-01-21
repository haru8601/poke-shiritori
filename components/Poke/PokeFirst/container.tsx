import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeFirstPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "firstPoke">;

export default function PokeFirst({ firstPoke }: Props) {
  return <PokeFirstPresenter firstPoke={firstPoke} />;
}
