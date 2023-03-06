import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import { getCurrentUrl } from "@/utils/getCurrentUrl";
import Tweet from "./container";

type Props = Pick<ComponentProps<typeof Tweet>, "className" | "style"> & {
  text: string;
};

export default function TweetPresenter({ text, style, className }: Props) {
  return (
    <Button
      href={`https://twitter.com/share?text=${text}&url=${getCurrentUrl()}&via=haroot_net`}
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
