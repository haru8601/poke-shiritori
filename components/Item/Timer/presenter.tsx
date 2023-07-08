import { ComponentProps } from "react";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { GAME_STATUS } from "@/const/gameStatus";
import Timer from "./container";

type Props = ComponentProps<typeof Timer>;

export default function TimerPresenter({
  leftPercent,
  gameStatus,
  bonus,
}: Props) {
  return (
    <div className="mb-3">
      <div
        style={{ height: "25px", width: "100%" }}
        className="border border-1 border-dark rounded"
      >
        <div
          style={{
            height: "100%",
            width: `${leftPercent}%`,
            transition: `${
              (gameStatus == GAME_STATUS.playingEnermy && "width 1s ease") ||
              "none"
            }`,
          }}
          className={`position-relative ${
            leftPercent < 10
              ? "bg-danger"
              : leftPercent < 50
              ? "bg-warning"
              : "bg-primary"
          } ${
            gameStatus == GAME_STATUS.beforeStart
              ? styles.grayActive
              : GAME_STATUS.playingMyturn
              ? styles.flash
              : ""
          } `}
        >
          {gameStatus == GAME_STATUS.playingEnermy && (
            <>
              <div
                style={{
                  height: "100%",
                  width: `${
                    (bonus / ((leftPercent / 100) * CONFIG.timeLimitMillS)) *
                    100
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
