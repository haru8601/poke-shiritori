import { Poke } from "@/types/Poke";
import { ChangeEvent, KeyboardEvent } from "react";

type Props = {
  pokedex: Poke[];
  sentPoke: string;
  targetPoke: string;
  pokeErr: string;
  myPokeList: string[];
  enermyPokeList: string[];
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeydown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
};

export default function TopPresenter({
  pokedex,
  sentPoke,
  targetPoke,
  pokeErr,
  myPokeList,
  enermyPokeList,
  onChangePoke,
  onKeydown,
  onSubmitPoke,
}: Props) {
  return (
    <div className="m-3">
      <h1 className="m-3 font-bold text-center">ポケモンしりとり</h1>
      <div className="text-center">{targetPoke}</div>
      <div className="text-center m-3">
        <p className="text-red-400 h-10">{pokeErr}</p>
        <input
          id="poke-input"
          list="poke-list"
          className="m-3"
          value={sentPoke}
          onChange={onChangePoke}
          onKeyDown={onKeydown}
          placeholder="ポケモンを入力してください"
        />
        <datalist id="poke-list">
          {pokedex.map((poke) => {
            return <option key={poke.id}>{poke.name.japanese}</option>;
          })}
        </datalist>
        <input type="submit" onClick={onSubmitPoke} />
      </div>
      <div className="flex place-content-around">
        <div className="my">
          {myPokeList
            .map((myPoke, index) => {
              return <p key={index}>{myPoke}</p>;
            })
            .reverse()}
        </div>
        <div>
          {enermyPokeList
            .map((enermyPoke, index) => {
              return <p key={index}>{enermyPoke}</p>;
            })
            .reverse()}
        </div>
      </div>
    </div>
  );
}
