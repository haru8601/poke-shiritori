import {
  ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
} from "react";
import { Badge, Stack } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { GameStatus } from "@/types/GameStatus";
import { Poke } from "@/types/Poke";
import { Score } from "@/types/Score";
import Top from "./contaniner";
import PokeFooter from "../Card/PokeFooter/container";
import PokeHeader from "../Card/PokeHeader/container";
import Thinking from "../Item/Thinking/container";
import Timer from "../Item/Timer/container";
import PokeFinishModal from "../Poke/PokeFinishModal/container";
import PokeFirst from "../Poke/PokeFirst/container";
import PokeHistoryList from "../Poke/PokeHistoryList/container";
import PokeInput from "../Poke/PokeInput/container";
import PokeTarget from "../Poke/PokeTarget/container";

type Props = ComponentProps<typeof Top> & {
  targetPoke: Poke;
  sentPokeName: string;
  pokeErr: string;
  myPokeList: Poke[];
  enermyPokeList: Poke[];
  gameStatus: GameStatus;
  score: number;
  scoreAll: Score[];
  leftPercent: number;
  countDown: number;
  bonus: number;
  toolTarget: MutableRefObject<null>;
  innerWidth: number;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
  onClickStart: () => void;
  onPlayAudio: (e: MouseEvent<HTMLInputElement>) => void;
  onReloadRanking: () => void;
};

export default function TopPresenter({
  pokeList,
  firstPoke,
  targetPoke,
  sentPokeName,
  pokeErr,
  myPokeList,
  enermyPokeList,
  gameStatus,
  score,
  scoreAll,
  leftPercent,
  countDown,
  bonus,
  toolTarget,
  innerWidth,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
  onClickStart,
  onPlayAudio,
  onReloadRanking,
}: Props) {
  return (
    <>
      {gameStatus.includes("end") && (
        <PokeFinishModal
          gameStatus={gameStatus}
          score={score}
          scoreAll={scoreAll}
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
          scoreAll={scoreAll}
          innerWidth={innerWidth}
          onClickStart={onClickStart}
          onPlayAudio={onPlayAudio}
          onReloadRanking={onReloadRanking}
        />
        <p className="ps-3">
          {"現在のスコア: "}
          <Badge bg="primary">{score}</Badge>
        </p>
        <Timer
          leftPercent={leftPercent}
          gameStatus={gameStatus}
          bonus={bonus}
        />
        <PokeTarget targetPoke={targetPoke} gameStatus={gameStatus} />
        <PokeFirst firstPoke={firstPoke} gameStatus={gameStatus} />
        <PokeInput
          pokeList={pokeList}
          sentPokeName={sentPokeName}
          pokeErr={pokeErr}
          gameStatus={gameStatus}
          onKeydown={onKeydown}
          onChangePoke={onChangePoke}
          onSubmitPoke={onSubmitPoke}
        />
        <Thinking gameStatus={gameStatus} toolTarget={toolTarget} />
        <PokeHistoryList
          myPokeList={myPokeList}
          enermyPokeList={enermyPokeList}
          gameStatus={gameStatus}
          toolTarget={toolTarget}
        />
        <PokeFooter />
      </Stack>
    </>
  );
}
