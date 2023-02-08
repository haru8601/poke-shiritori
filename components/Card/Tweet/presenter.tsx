import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import { PATH } from "@/const/path";
import Tweet from "./container";

type Props = ComponentProps<typeof Tweet>;

export default function TweetPresenter({
  usedPokeCount,
  style,
  className,
}: Props) {
  return (
    <Button
      href={`https://twitter.com/share?text=ポケモンしりとりが ${usedPokeCount} 回続いた!&url=${PATH.site}&via=haroot_net`}
      variant="primary"
      data-show-count="false"
      rel="noreferrer"
      target="_blank"
      style={style}
      className={className}
    >
      <i className="bi bi-twitter">結果をツイート</i>
    </Button>
  );
}
