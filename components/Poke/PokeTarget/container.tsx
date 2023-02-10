import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import { CONFIG } from "@/const/config";
import PokeTargetPresenter from "./presenter";

type Props = Pick<ComponentProps<typeof TopPresenter>, "targetPoke">;

export default function PokeTarget({ targetPoke }: Props) {
  const imgBase = CONFIG.spaceBasis;
  return <PokeTargetPresenter targetPoke={targetPoke} imgBase={imgBase} />;
}
