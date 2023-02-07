import { Poke } from "@/types/Poke";
import { ChangeEvent, KeyboardEvent } from "react";
import { Stack } from "react-bootstrap";
import Loading from "../Item/Loading/container";
import PokeFinishModal from "../Poke/PokeFinishLogo/container";
import PokeFirst from "../Poke/PokeFirst/container";
import PokeHeader from "../Card/PokeHeader/container";
import PokeHistoryList from "../Poke/PokeHistoryList/container";
import PokeInput from "../Poke/PokeInput/container";
import PokeTarget from "../Poke/PokeTarget/container";
import PokeFooter from "../Card/PokeFooter/container";
import styles from "@/styles/Top.module.css";
import { Diff } from "@/types/Diff";

type Props = {
  pokeList: Poke[];
  firstPoke: Poke;
  targetPoke: Poke;
  sentPokeName: string;
  pokeErr: string;
  myPokeList: Poke[];
  enermyPokeList: Poke[];
  isMyTurn: boolean;
  finishType: "" | "win" | "lose";
  usedPokeCount: number;
  diff: Diff;
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
  finishType,
  usedPokeCount,
  diff,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
  onChangeDiff,
}: Props) {
  return (
    <>
      {finishType && (
        <PokeFinishModal
          finishType={finishType}
          usedPokeCount={usedPokeCount}
        />
      )}
      <Stack
        className={`justify-content-around ${
          finishType != "" && styles.fadeBg
        }`}
      >
        <PokeHeader
          finishType={finishType}
          diff={diff}
          onChangeDiff={onChangeDiff}
        />
        <PokeTarget targetPoke={targetPoke} />
        <PokeFirst firstPoke={firstPoke} />
        <PokeInput
          pokeList={pokeList}
          sentPokeName={sentPokeName}
          pokeErr={pokeErr}
          finishType={finishType}
          isMyTurn={isMyTurn}
          diff={diff}
          onKeydown={onKeydown}
          onChangePoke={onChangePoke}
          onSubmitPoke={onSubmitPoke}
        />
        <Loading isMyTurn={isMyTurn} finishType={finishType} />
        <PokeHistoryList
          myPokeList={myPokeList}
          enermyPokeList={enermyPokeList}
          isMyTurn={isMyTurn}
        />
        <PokeFooter usedPokeCount={usedPokeCount} />
      </Stack>
    </>
  );
}
