import { CSSProperties } from "react";
import { CONFIG } from "@/const/config";
import TweetPresenter from "./presenter";

type Props = {
  score: number;
  style?: CSSProperties;
  className?: string;
  myIndex: number;
};

export default function Tweet({ score, myIndex, style, className }: Props) {
  const text: string = `ポケモンしりとりで ${score} 点を出し${
    myIndex >= 0 && myIndex < CONFIG.rankLimit
      ? `て、${myIndex + 1}位にランクインし`
      : ""
  }た！`;
  return <TweetPresenter text={text} style={style} className={className} />;
}
