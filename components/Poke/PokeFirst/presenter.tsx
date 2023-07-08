import { ComponentProps } from "react";
import styles from "@/app/styles/Top.module.css";
import { GAME_STATUS } from "@/const/gameStatus";
import { pokeColorMap } from "@/const/pokeColorMap";
import PokeFirst from "./container";
import PokeCard from "../PokeCard/container";

type Props = ComponentProps<typeof PokeFirst> & {
  imgBase: number;
};

export default function PokeFirstPresenter({
  firstPoke,
  gameStatus,
  imgBase,
}: Props) {
  return (
    <div
      style={{ width: "90%" }}
      className="d-flex my-2 mx-auto justify-content-end"
    >
      <span className="mx-2 align-self-center">最初のポケモン:</span>
      <div
        className={`px-2 rounded d-flex border border-dark border-1  justify-content-center ${
          gameStatus == GAME_STATUS.beforeStart && styles.grayActive
        }`}
        style={{
          height: `${imgBase}px`,
          backgroundColor: firstPoke.type && pokeColorMap[firstPoke.type[0]],
        }}
      >
        <PokeCard
          targetPoke={firstPoke}
          gameStatus={gameStatus}
          small
          imgBase={imgBase}
        />
      </div>
    </div>
  );
}
