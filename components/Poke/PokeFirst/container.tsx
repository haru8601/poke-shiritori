import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import PokeFirstPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "firstPoke">;

export default function PokeFirst({ firstPoke }: Props) {
  const imgBase = CONFIG.spaceBasis * 0.8;
  return <PokeFirstPresenter firstPoke={firstPoke} imgBase={imgBase} />;
}
