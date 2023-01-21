import { Poke } from "@/types/Poke";
import { ChangeEvent, KeyboardEvent } from "react";
import { Stack } from "react-bootstrap";
import Loading from "../Item/Loading/container";
import PokeFinishLogo from "../Poke/PokeFinishLogo/container";
import PokeFirst from "../Poke/PokeFirst/container";
import PokeHeader from "../Card/PokeHeader/container";
import PokeHistoryList from "../Poke/PokeHistoryList/container";
import PokeInput from "../Poke/PokeInput/container";
import PokeTarget from "../Poke/PokeTarget/container";
import PokeFooter from "../Card/PokeFooter/container";

type Props = {
  pokeList: Poke[];
  firstPoke: Poke;
  targetPoke: Poke;
  sentPokeName: string;
  pokeErr: string;
  myPokeList: Poke[];
  enermyPokeList: Poke[];
  spaceBasis: number;
  isMyTurn: boolean;
  finishType: "" | "win" | "lose";
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
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
  spaceBasis,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
}: Props) {
  return (
    <>
      {finishType != "" && <PokeFinishLogo finishType={finishType} />}
      <Stack
        style={{
          animation:
            finishType != ""
              ? "fade-keyframe-bg 5s ease 0.5s 1 forwards"
              : "null",
        }}
        className="justify-content-around"
      >
        <PokeHeader spaceBasis={spaceBasis} finishType={finishType} />
        <PokeTarget targetPoke={targetPoke} spaceBasis={spaceBasis} />
        <PokeFirst firstPoke={firstPoke} spaceBasis={spaceBasis} />
        <PokeInput
          pokeList={pokeList}
          sentPokeName={sentPokeName}
          pokeErr={pokeErr}
          finishType={finishType}
          isMyTurn={isMyTurn}
          onKeydown={onKeydown}
          onChangePoke={onChangePoke}
          onSubmitPoke={onSubmitPoke}
        />
        <Loading
          isMyTurn={isMyTurn}
          finishType={finishType}
          spaceBasis={spaceBasis}
        />
        <PokeHistoryList
          myPokeList={myPokeList}
          enermyPokeList={enermyPokeList}
          isMyTurn={isMyTurn}
          spaceBasis={spaceBasis}
        />
        <PokeFooter />
      </Stack>
    </>
  );
}
