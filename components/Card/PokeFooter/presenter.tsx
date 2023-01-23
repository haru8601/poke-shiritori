import { PATH } from "@/const/path";
import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import PokeFooter from "./container";

type Props = ComponentProps<typeof PokeFooter>;

export default function PokeFooterPresenter({ usedPokeCount }: Props) {
  return (
    <footer className="m-3 d-flex align-items-center justify-content-end">
      <Button href={PATH.homePage} variant="link" target="blank">
        <i className="bi bi-box-arrow-up-right">作者のHP</i>
      </Button>
      <Button
        href={`https://twitter.com/share?text=ポケモンしりとりが ${usedPokeCount} 回続いた!&url=${PATH.site}&via=haroot_net`}
        variant="link"
        data-show-count="false"
        rel="noreferrer"
        target="_blank"
      >
        <i className="bi bi-twitter" style={{ color: "royalblue" }}>
          結果をツイート
        </i>
      </Button>
    </footer>
  );
}
