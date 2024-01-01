import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import { GAME_STATUS } from "@/const/gameStatus";
import PokeSkip from "./container";

type Props = ComponentProps<typeof PokeSkip>;

export default function PokeSkipPresenter({ gameStatus, onSkip }: Props) {
  return (
    <Button
      onClick={onSkip}
      disabled={gameStatus != GAME_STATUS.playingMyturn}
    ></Button>
  );
}
