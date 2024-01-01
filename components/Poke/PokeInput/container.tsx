import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeInputPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "sentPokeName"
  | "pokeErr"
  | "gameStatus"
  | "inputRef"
  | "os"
  | "innerWidth"
  | "onKeydown"
  | "onClickStart"
  | "onChangePoke"
  | "onSubmitPoke"
  | "onSkip"
>;

export default function PokeInput({
  sentPokeName,
  pokeErr,
  gameStatus,
  inputRef,
  os,
  innerWidth,
  onKeydown,
  onClickStart,
  onChangePoke,
  onSubmitPoke,
  onSkip,
}: Props) {
  return (
    <PokeInputPresenter
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
      onSkip={onSkip}
    />
  );
}
