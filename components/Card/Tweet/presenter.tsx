import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import Tweet from "./container";

type Props = Pick<ComponentProps<typeof Tweet>, "className" | "style"> & {
  text: string;
};

export default function TweetPresenter({ text, style, className }: Props) {
  return (
    <Button
      href={`https://twitter.com/share?text=${text}&url=${process.env.NEXT_PUBLIC_SITE_URL}`}
      variant="primary"
      data-show-count="false"
      rel="noreferrer"
      target="_blank"
      style={style}
      className={`${className} bg-gradient`}
    >
      <i className="bi bi-twitter-x pe-1"></i>ポスト
    </Button>
  );
}
