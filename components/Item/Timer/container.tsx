import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import TimerPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  "leftPercent" | "gameStatus" | "isMyTurn"
>;

export default function Timer({ leftPercent, gameStatus, isMyTurn }: Props) {
  return (
    <TimerPresenter
      leftPercent={leftPercent}
      gameStatus={gameStatus}
      isMyTurn={isMyTurn}
    />
  );
}
