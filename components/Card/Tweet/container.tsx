import { CSSProperties } from "react";
import TweetPresenter from "./presenter";

type Props = {
  usedPokeCount: number;
  style?: CSSProperties;
  className?: string;
};

export default function Tweet({ usedPokeCount, style, className }: Props) {
  return (
    <TweetPresenter
      usedPokeCount={usedPokeCount}
      style={style}
      className={className}
    />
  );
}
