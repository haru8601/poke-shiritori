import { ChangeEvent, KeyboardEvent } from "react";
import { Stack } from "react-bootstrap";
import styles from "@/styles/Top.module.css";
import { Diff } from "@/types/Diff";
import { GameStatus } from "@/types/GameStatus";
import { Poke } from "@/types/Poke";
import { Score } from "@/types/Score";
import PokeFooter from "../Card/PokeFooter/container";
import PokeHeader from "../Card/PokeHeader/container";
import Loading from "../Item/Loading/container";
import Timer from "../Item/Timer/container";
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
  countDown: number;
  innerWidth: number;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
  onChangeDiff: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickStart: () => void;
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
  countDown,
  innerWidth,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
  onChangeDiff,
  onClickStart,
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
      {gameStatus == "will_start" && (
        <div
          className="position-fixed top-50 start-50 translate-middle border border-dark rounded-circle border-5"
          style={{
            fontSize: "100px",
            zIndex: 100,
            width: "300px",
            height: "300px",
          }}
        >
          <div className="position-absolute top-50 start-50 translate-middle">
            {countDown}
          </div>
        </div>
      )}
      <Stack
        className={`justify-content-around ${
          gameStatus == "will_start" && styles.grayOut
        }`}
      >
        <PokeHeader
          gameStatus={gameStatus}
          diff={diff}
          scoreAll={scoreAll}
          innerWidth={innerWidth}
          onChangeDiff={onChangeDiff}
          onClickStart={onClickStart}
        />
        <Timer
          leftPercent={leftPercent}
          gameStatus={gameStatus}
          isMyTurn={isMyTurn}
        />
        <PokeTarget targetPoke={targetPoke} gameStatus={gameStatus} />
        <PokeFirst firstPoke={firstPoke} gameStatus={gameStatus} />
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
