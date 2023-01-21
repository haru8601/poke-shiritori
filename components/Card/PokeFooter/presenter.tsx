import { PATH } from "@/const/path";
import { Button } from "react-bootstrap";

export default function PokeFooterPresenter() {
  return (
    <footer className="m-3 d-flex justify-content-end">
      <Button href={PATH.homePage} variant="link" target="blank">
        作者のHP
      </Button>
    </footer>
  );
}
