import { ComponentProps } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { GAME_STATUS } from "@/const/gameStatus";
import Thinking from "./container";

type Props = ComponentProps<typeof Thinking> & {
  count: number;
};

export default function ThinkingPresenter({
  gameStatus,
  toolTarget,
  count,
}: Props) {
  return (
    <>
      <div style={{ height: "50px", width: "100%" }}></div>
      <Overlay
        placement="top"
        target={toolTarget.current}
        show={gameStatus == GAME_STATUS.playingEnermy}
      >
        <Tooltip style={{ width: "100px" }}>{". ".repeat(count)}</Tooltip>
      </Overlay>
    </>
  );
}
