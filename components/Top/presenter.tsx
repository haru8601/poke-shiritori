import { ChangeEvent, KeyboardEvent } from "react";
import { ProgressBar, Stack } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import styles from "@/styles/Top.module.css";
import { Diff } from "@/types/Diff";
import { GameStatus } from "@/types/GameStatus";
import { Poke } from "@/types/Poke";
import { Score } from "@/types/Score";
import PokeFooter from "../Card/PokeFooter/container";
import PokeHeader from "../Card/PokeHeader/container";
import Loading from "../Item/Loading/container";
import PokeFinishModal from "../Poke/PokeFinishModal/container";
import PokeFirst from "../Poke/PokeFirst/container";
import PokeHistoryList from "../Poke/PokeHistoryList/container";
import PokeInput from "../Poke/PokeInput/container";
import PokeTarget from "../Poke/PokeTarget/container";

type Props = {
  pokeList: Poke[];
  firstPoke: Poke;
  targetPoke: Poke;
  sentPokeName: string;
  pokeErr: string;
  myPokeList: Poke[];
  enermyPokeList: Poke[];
  isMyTurn: boolean;
  gameStatus: GameStatus;
  usedPokeCount: number;
  diff: Diff;
  scoreAll: Score[];
  myIndex: number;
  leftPercent: number;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
  onChangeDiff: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function TopPresenter({
  pokeList,
  isMyTurn,
  firstPoke,
  targetPoke,
  sentPokeName,
  pokeErr,
  myPokeList,
  enermyPokeList,
  gameStatus,
  usedPokeCount,
  diff,
  scoreAll,
  myIndex,
  leftPercent,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
  onChangeDiff,
}: Props) {
  return (
    <>
      {myIndex != -1 && (
        <PokeFinishModal
          gameStatus={gameStatus}
          usedPokeCount={usedPokeCount}
          scoreAll={scoreAll}
          myIndex={myIndex}
        />
      )}
      <Stack
        className={`justify-content-around ${
          gameStatus.includes("end") && styles.fadeBg
        }`}
      >
        <PokeHeader
          gameStatus={gameStatus}
          diff={diff}
          onChangeDiff={onChangeDiff}
          scoreAll={scoreAll}
        />
        <div className="my-3">
          <div>
            残り時間:
            {Math.ceil(((leftPercent / 100) * CONFIG.timeLimit) / 1000)}秒
          </div>
          <ProgressBar
            now={leftPercent}
            animated
            variant={
              leftPercent < 10 ? "danger" : leftPercent < 50 ? "warning" : ""
            }
            style={{ height: "25px" }}
          />
        </div>
        <PokeTarget targetPoke={targetPoke} />
        <PokeFirst firstPoke={firstPoke} />
        <PokeInput
          pokeList={pokeList}
          sentPokeName={sentPokeName}
          pokeErr={pokeErr}
          gameStatus={gameStatus}
          isMyTurn={isMyTurn}
          diff={diff}
          onKeydown={onKeydown}
          onChangePoke={onChangePoke}
          onSubmitPoke={onSubmitPoke}
        />
        <Loading isMyTurn={isMyTurn} gameStatus={gameStatus} />
        <PokeHistoryList
          myPokeList={myPokeList}
          enermyPokeList={enermyPokeList}
          isMyTurn={isMyTurn}
        />
        <PokeFooter usedPokeCount={usedPokeCount} myIndex={myIndex} />
      </Stack>
    </>
  );
}
