import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import TimerPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "leftPercent" | "gameStatus" | "bonus" | "penalty"
>;

export default function Timer({
  leftPercent,
  gameStatus,
  bonus,
  penalty,
}: Props) {
  return (
    <TimerPresenter
      leftPercent={leftPercent}
      gameStatus={gameStatus}
      bonus={bonus}
      penalty={penalty}
    />
  );
}
