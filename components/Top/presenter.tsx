import { ComponentProps } from "react";
import Top from "./contaniner";

type Props = ComponentProps<typeof Top>

export default function TopPresenter({pokedex}: Props) {
  return (
    <div>
      <h1 className="font-bold">test</h1>
      <p>{pokedex[12].name.japanese}</p>
    </div>
  );
}
