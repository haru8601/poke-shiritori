import TopPresenter from "@/components/Top/presenter";
import { ComponentProps } from "react";
import PokeInputPresenter from "./presenter";

type Props = Omit<
  ComponentProps<typeof TopPresenter>,
  "firstPoke" | "targetPoke" | "myPokeList" | "enermyPokeList" | "spaceBasis"
>;

export default function PokeInput({
  pokeList,
  sentPokeName,
  pokeErr,
  isMyTurn,
  finishType,
  onKeydown,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <PokeInputPresenter
      pokeList={pokeList}
      sentPokeName={sentPokeName}
      pokeErr={pokeErr}
      isMyTurn={isMyTurn}
      finishType={finishType}
      onKeydown={onKeydown}
      onChangePoke={onChangePoke}
      onSubmitPoke={onSubmitPoke}
    />
  );
}
