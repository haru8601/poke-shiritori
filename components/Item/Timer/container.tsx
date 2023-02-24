import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import TimerPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "leftPercent" | "gameStatus" | "isMyTurn" | "bonus"
>;

export default function Timer({
  leftPercent,
  gameStatus,
  isMyTurn,
  bonus,
}: Props) {
  return (
    <TimerPresenter
      leftPercent={leftPercent}
      gameStatus={gameStatus}
      isMyTurn={isMyTurn}
      bonus={bonus}
    />
  );
}
