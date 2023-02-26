import { ComponentProps } from "react";
import { CONFIG } from "@/const/config";
import styles from "@/styles/Top.module.css";
import Timer from "./container";

type Props = ComponentProps<typeof Timer>;

export default function TimerPresenter({
  leftPercent,
  gameStatus,
  bonus,
}: Props) {
  return (
    <div className="my-3">
      <div
        style={{ height: "25px", width: "100%" }}
        className="border border-1 border-dark rounded"
      >
        <div
          style={{
            height: "100%",
            width: `${leftPercent}%`,
            transition: `${
              (gameStatus == "playing_enermy" && "width 1s ease") || "none"
            }`,
          }}
          className={`position-relative ${
            leftPercent < 10
              ? "bg-danger"
              : leftPercent < 50
              ? "bg-warning"
              : "bg-primary"
          } ${gameStatus == "playing_myturn" ? styles.flash : ""}`}
        >
          {gameStatus == "playing_enermy" && (
            <>
              <div
                style={{
                  height: "100%",
                  width: `${
                    (bonus / ((leftPercent / 100) * CONFIG.timeLimit)) * 100
                  }%`,
                }}
                className={`position-absolute bg-info top-0 end-0 ${styles.flashOnce}`}
              ></div>
              <p
                className={`position-absolute bottom-0 end-0 ${styles.flashOnce}`}
              >
                +{bonus}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
