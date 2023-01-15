import { Poke } from "@/types/Poke";
import TopPresenter from "./presenter";

type Props = {
  pokedex: Poke[];
}

export default function Top({pokedex}: Props) {
  return <TopPresenter pokedex={pokedex}/>;
}
