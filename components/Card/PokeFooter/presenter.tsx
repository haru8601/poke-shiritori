import { Button } from "react-bootstrap";
import { PATH } from "@/const/path";
import Tweet from "../Tweet/container";

/* 形式上残しておく */
type Props = {};

export default function PokeFooterPresenter({}: Props) {
  return (
    <footer className="m-3 d-flex align-items-center justify-content-end">
      <Button href={PATH.homePage} variant="link" target="blank">
        <i className="bi bi-box-arrow-up-right">作者のHP</i>
      </Button>
      {/* フッターのツイートでは結果を見ない */}
      <Tweet score={0} myIndex={-1} />
    </footer>
  );
}
