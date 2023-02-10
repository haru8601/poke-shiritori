import { CSSProperties } from "react";
import { CONFIG } from "@/const/config";
import TweetPresenter from "./presenter";

type Props = {
  usedPokeCount: number;
  style?: CSSProperties;
  className?: string;
  myIndex: number;
};

export default function Tweet({
  usedPokeCount,
  myIndex,
  style,
  className,
}: Props) {
  const text: string = `ポケモンしりとりが ${usedPokeCount} 回続い${
    myIndex >= 0 && myIndex < CONFIG.rankLimit
      ? `て、${myIndex + 1}位にランクインし`
      : ""
  }た！`;
  return <TweetPresenter text={text} style={style} className={className} />;
}
