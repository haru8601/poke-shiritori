import { ChangeEvent, ComponentProps, Fragment } from "react";
import Top from "./contaniner";

type Props = ComponentProps<typeof Top> & {
  targetPoke: string;
  pokeErr: string;
  myPokeList: string[];
  enermyPokeList: string[];
  onChangePoke: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmitPoke: () => void;
};

export default function TopPresenter({
  pokedex,
  targetPoke,
  pokeErr,
  myPokeList,
  enermyPokeList,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <div className="m-3">
      <h1 className="m-3 font-bold text-center">ポケモンしりとり</h1>
      <div className="text-center m-3">
        <p className="text-red-400 h-10">{pokeErr}</p>
        <input
          value={targetPoke}
          onChange={onChangePoke}
          placeholder="ポケモンを入力してください"
        />
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
