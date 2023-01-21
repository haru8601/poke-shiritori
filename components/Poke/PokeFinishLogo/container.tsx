import PokeFinishLogoPresenter from "./presenter";

type Props = {
  finishType: "win" | "lose";
};

export default function PokeFinishLogo({ finishType }: Props) {
  return <PokeFinishLogoPresenter finishType={finishType} />;
}
