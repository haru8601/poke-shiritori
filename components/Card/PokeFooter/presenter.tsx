import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { PATH } from "@/const/path";
import PokeFooter from "./container";
import Tweet from "../Tweet/container";

type Props = ComponentProps<typeof PokeFooter>;

export default function PokeFooterPresenter({ innerWidth }: Props) {
  return (
    <footer
      className={`m-2 d-flex align-items-center ${
        (innerWidth >= CONFIG.pcMinWidth && "justify-content-end") ||
        "justify-content-center"
      }`}
    >
      <Button href={PATH.homePage} variant="link" target="blank">
        <i className="bi bi-box-arrow-up-right">作者のHP</i>
      </Button>
      {/* フッターのツイートでは結果を見ない */}
      <Tweet score={0} />
    </footer>
  );
}
