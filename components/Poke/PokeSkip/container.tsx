import { ComponentProps, useState } from "react";
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
  const [entered, setEntered] = useState<boolean>(false);

  const handleEnterSkip = () => {
    setEntered(true);
  };
  const handleLeaveSkip = () => {
    setEntered(false);
  };

  return (
    <PokeSkipPresenter
      skipPoke={skipPoke}
      skipLeft={skipLeft}
      gameStatus={gameStatus}
      entered={entered}
      onSkip={onSkip}
      onEnterSkip={handleEnterSkip}
      onLeaveSkip={handleLeaveSkip}
    />
  );
}
