import { ComponentProps } from "react";
import { ProgressBar } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import Timer from "./container";

type Props = ComponentProps<typeof Timer>;

export default function TimerPresenter({
  leftPercent,
  gameStatus,
  isMyTurn,
  innerWidth,
}: Props) {
  return (
    <div className="my-3">
      <div>
        残り時間:
        {Math.ceil(((leftPercent / 100) * CONFIG.timeLimit) / 1000)}秒
      </div>
      <ProgressBar
        now={leftPercent}
        animated={innerWidth >= 700 && gameStatus == "playing" && isMyTurn}
        variant={
          leftPercent < 10 ? "danger" : leftPercent < 50 ? "warning" : ""
        }
        style={{ height: "25px" }}
      />
    </div>
  );
}
