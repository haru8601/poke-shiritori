import { ComponentProps } from "react";
import styles from "@/app/styles/Top.module.css";
import { GAME_STATUS } from "@/const/gameStatus";
import { pokeColorMap } from "@/const/pokeColorMap";
import PokeTarget from "./container";
import PokeCard from "../PokeCard/container";

type Props = ComponentProps<typeof PokeTarget> & {
  imgBase: number;
};

export default function PokeTargetPresenter({
  targetPoke,
  gameStatus,
  imgBase,
}: Props) {
  return (
    <div
      className={`px-2 mb-1 rounded d-flex mx-auto border border-dark border-1 justify-content-center ${
        gameStatus == GAME_STATUS.beforeStart && styles.grayActive
      }`}
      style={{
        height: `${imgBase}px`,
        width: "20%",
        minWidth: "200px",
        backgroundColor: targetPoke.type && pokeColorMap[targetPoke.type[0]],
      }}
    >
      <PokeCard
        targetPoke={targetPoke}
        gameStatus={gameStatus}
        small
        imgBase={imgBase}
      />
    </div>
  );
}
