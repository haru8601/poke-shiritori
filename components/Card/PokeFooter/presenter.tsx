import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import { PATH } from "@/const/path";
import PokeFooter from "./container";
import Tweet from "../Tweet/container";

type Props = ComponentProps<typeof PokeFooter>;

export default function PokeFooterPresenter({ usedPokeCount }: Props) {
  return (
    <footer className="m-3 d-flex align-items-center justify-content-end">
      <Button href={PATH.homePage} variant="link" target="blank">
        <i className="bi bi-box-arrow-up-right">作者のHP</i>
      </Button>
      <Tweet usedPokeCount={usedPokeCount} />
    </footer>
  );
}
