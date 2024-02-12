import { ComponentProps } from "react";
import PokeSkipPresenter from "./presenter";
import PokeInputPresenter from "../PokeInput/presenter";

type Props = Pick<
  ComponentProps<typeof PokeInputPresenter>,
  "skipPoke" | "skipLeft" | "gameStatus" | "onSkip"
>;

export default function PokeSkip({
  skipPoke,
  skipLeft,
  gameStatus,
  onSkip,
}: Props) {
  return (
    <PokeSkipPresenter
      skipPoke={skipPoke}
      skipLeft={skipLeft}
      gameStatus={gameStatus}
      onSkip={onSkip}
    />
  );
}
