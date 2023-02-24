import { ComponentProps } from "react";
import styles from "@/styles/Top.module.css";
import Timer from "./container";

type Props = ComponentProps<typeof Timer>;

export default function TimerPresenter({
  leftPercent,
  gameStatus,
  isMyTurn,
  bonus,
}: Props) {
  return (
    <div className="my-3">
      <div
        style={{ height: "25px", width: "100%" }}
        className="d-flex border border-1 border-dark rounded"
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
          } ${gameStatus.includes("playing") && isMyTurn ? styles.flash : ""}`}
        ></div>
        {gameStatus == "playing_enermy" && (
          <p className={styles.flashOnce}>{`+${bonus}`}</p>
        )}
      </div>
    </div>
  );
}
