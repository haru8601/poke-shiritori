import { ComponentProps } from "react";
import PokeSkipPresenter from "./presenter";
import PokeInputPresenter from "../PokeInput/presenter";

type Props = Pick<
  ComponentProps<typeof PokeInputPresenter>,
  "gameStatus" | "onSkip"
>;

export default function PokeSkip({ gameStatus, onSkip }: Props) {
  return <PokeSkipPresenter gameStatus={gameStatus} onSkip={onSkip} />;
}
