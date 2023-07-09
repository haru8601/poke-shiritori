import {
  ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  MouseEvent,
  MutableRefObject,
  RefObject,
} from "react";
import { Alert, Badge, Stack } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { GAME_STATUS, GameStatus } from "@/const/gameStatus";
import { OS } from "@/const/os";
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

type Props = Pick<ComponentProps<typeof Top>, "firstPoke"> & {
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
  penalty: boolean;
  toolTarget: MutableRefObject<null>;
  inputRef: RefObject<HTMLInputElement>;
  os: OS;
  hintShow: boolean;
  innerWidth: number;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
  onClickStart: () => void;
  onPlayAudio: (e: MouseEvent<HTMLInputElement>) => void;
  onReloadRanking: () => void;
};

export default function TopPresenter({
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
  penalty,
  toolTarget,
  inputRef,
  os,
  hintShow,
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
      {gameStatus == GAME_STATUS.willStart && (
        <div
          className="position-fixed top-50 start-50 translate-middle border border-dark rounded-circle border-5"
          style={{
            fontSize: "100px",
            zIndex: 100,
            width: innerWidth * 0.5,
            height: innerWidth * 0.5,
          }}
        >
          <div className="position-absolute top-50 start-50 translate-middle">
            {countDown}
          </div>
        </div>
      )}
      <Alert
        show={hintShow}
        variant="primary"
        className="position-fixed"
        style={{ top: "90%", left: "5%" }}
      >
        <span className="p-1" style={{ backgroundColor: "lightgray" }}>
          /
        </span>
        で入力ボックスに移動します
      </Alert>
      <Stack
        className={`justify-content-around ${
          gameStatus == GAME_STATUS.willStart && styles.grayOut
        }`}
      >
        <PokeHeader
          gameStatus={gameStatus}
          scoreAll={scoreAll}
          innerWidth={innerWidth}
          onPlayAudio={onPlayAudio}
          onReloadRanking={onReloadRanking}
        />
        <p className="ps-3">
          {"現在のスコア: "}
          <Badge
            bg="primary"
            className={`${
              gameStatus == GAME_STATUS.beforeStart && styles.grayActive
            }`}
          >
            {score}
          </Badge>
        </p>
        <Timer
          leftPercent={leftPercent}
          gameStatus={gameStatus}
          bonus={bonus}
          penalty={penalty}
        />
        <PokeTarget targetPoke={targetPoke} gameStatus={gameStatus} />
        <PokeFirst firstPoke={firstPoke} gameStatus={gameStatus} />
        <PokeInput
          sentPokeName={sentPokeName}
          pokeErr={pokeErr}
          gameStatus={gameStatus}
          inputRef={inputRef}
          os={os}
          innerWidth={innerWidth}
          onKeydown={onKeydown}
          onClickStart={onClickStart}
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
        <PokeFooter innerWidth={innerWidth} />
      </Stack>
    </>
  );
}
