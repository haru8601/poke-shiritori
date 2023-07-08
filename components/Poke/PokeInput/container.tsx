import { ComponentProps } from "react";
import TopPresenter from "@/components/Top/presenter";
import PokeInputPresenter from "./presenter";

type Props = Pick<
  ComponentProps<typeof TopPresenter>,
  | "sentPokeName"
  | "pokeErr"
  | "gameStatus"
  | "onKeydown"
  | "onClickStart"
  | "onChangePoke"
  | "onSubmitPoke"
>;

export default function PokeInput({
  sentPokeName,
  pokeErr,
  gameStatus,
  onKeydown,
  onClickStart,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <PokeInputPresenter
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      gameStatus={gameStatus}
      onKeydown={onKeydown}
      onClickStart={onClickStart}
      onChangePoke={onChangePoke}
      onSubmitPoke={onSubmitPoke}
    />
  );
}
