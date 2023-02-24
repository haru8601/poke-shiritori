import { ComponentProps } from "react";
import { CONFIG } from "@/const/config";
import styles from "@/styles/Top.module.css";
import Timer from "./container";

type Props = ComponentProps<typeof Timer>;

export default function TimerPresenter({
  leftPercent,
  gameStatus,
  isMyTurn,
}: Props) {
  return (
    <div className="my-3">
      <div>
        残り時間:
        {Math.ceil(((leftPercent / 100) * CONFIG.timeLimit) / 1000)}秒
      </div>
      <div
        style={{ height: "25px", width: "100%" }}
        className="border border-1 border-dark rounded"
      >
        <div
          style={{
            height: "100%",
            width: `${leftPercent}%`,
          }}
          className={`${
            leftPercent < 10
              ? "bg-danger"
              : leftPercent < 50
              ? "bg-warning"
              : "bg-primary"
          } ${gameStatus == "playing" && isMyTurn ? styles.flash : ""}`}
        ></div>
      </div>
    </div>
  );
}
