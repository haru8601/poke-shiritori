import { Button } from "react-bootstrap";
import { Admax } from "@/components/Ads/Admax";
import { ADS } from "@/const/ads";
import { PATH } from "@/const/path";
import Tweet from "../Tweet/container";

export default function PokeFooterPresenter() {
  return (
    <footer className={`m-2 d-flex align-items-center flex-column`}>
      <div className="my-3">
        <Admax id={ADS.admax_id_footer} />
      </div>
      <div className="d-flex flex-row">
        <Button
          className="m-1"
          href={PATH.homePage}
          variant="link"
          target="blank"
        >
          <i className="bi bi-box-arrow-up-right">作者のHP</i>
        </Button>
        {/* フッターのツイートでは結果を見ない */}
        <Tweet className="m-1" score={0} />
      </div>
    </footer>
  );
}
