import Image from "next/image";
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
import { CONFIG } from "@/const/config";
import { GAME_STATUS, GameStatus } from "@/const/gameStatus";
import { OS } from "@/const/os";
import { PokeMap } from "@/types/Poke";
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
  pokeMap: PokeMap;
  sentPokeName: string;
  pokeErr: string;
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
  skipLeft: number;
  innerWidth: number;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
  onClickStart: () => void;
  onPlayAudio: (e: MouseEvent<HTMLInputElement>) => void;
  onReloadRanking: () => void;
  onSkip: () => void;
};

export default function TopPresenter({
  pokeMap,
  firstPoke,
  sentPokeName,
  pokeErr,
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
  skipLeft,
  innerWidth,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
  onClickStart,
  onPlayAudio,
  onReloadRanking,
  onSkip,
}: Props) {
  return (
    <>
      {gameStatus.includes("end") && (
        <PokeFinishModal
          pokeMap={pokeMap}
          firstPoke={firstPoke}
          gameStatus={gameStatus}
          score={score}
          scoreAll={scoreAll}
          os={os}
          innerWidth={innerWidth}
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
      {gameStatus == GAME_STATUS.skip && (
        <div
          className="position-fixed top-50 start-0 translate-middle-y bg-dark d-flex justify-content-center"
          style={{
            width: "100vw",
            height: CONFIG.spaceBasis * 2,
            zIndex: 101,
          }}
        >
          <Image
            height={CONFIG.spaceBasis * 2}
            width={CONFIG.spaceBasis * 2}
            src={pokeMap[CONFIG.skipPokeId].imgPath}
            alt={pokeMap[CONFIG.skipPokeId].name.japanese}
            className={GAME_STATUS.skip ? styles.skipImg : ""}
            style={{
              zIndex: 102,
            }}
          />
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
        <PokeTarget
          pokeMap={pokeMap}
          firstPoke={firstPoke}
          gameStatus={gameStatus}
        />
        <PokeFirst firstPoke={firstPoke} gameStatus={gameStatus} />
        <PokeInput
          sentPokeName={sentPokeName}
          pokeErr={pokeErr}
          gameStatus={gameStatus}
          inputRef={inputRef}
          os={os}
          skipPoke={pokeMap[CONFIG.skipPokeId]} // エアームド
          skipLeft={skipLeft}
          innerWidth={innerWidth}
          onKeydown={onKeydown}
          onClickStart={onClickStart}
          onChangePoke={onChangePoke}
          onSubmitPoke={onSubmitPoke}
          onSkip={onSkip}
        />
        <Thinking gameStatus={gameStatus} toolTarget={toolTarget} />
        <PokeHistoryList
          pokeMap={pokeMap}
          gameStatus={gameStatus}
          toolTarget={toolTarget}
        />
        <PokeFooter />
      </Stack>
    </>
  );
}
