import Script from "next/script";
import { ComponentProps } from "react";
import { Button } from "react-bootstrap";
import { ADS } from "@/const/ads";
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
      {/* <!-- admax --> */}
      <div
        className="admax-switch"
        data-admax-id={ADS.admax_id}
        style={{ display: "inline-block" }}
      ></div>
      <Script
        type="text/javascript"
        src="https://adm.shinobi.jp/st/t.js"
        async
      ></Script>
      {/* <!-- admax --> */}
      <Button href={PATH.homePage} variant="link" target="blank">
        <i className="bi bi-box-arrow-up-right">作者のHP</i>
      </Button>
      {/* フッターのツイートでは結果を見ない */}
      <Tweet score={0} />
    </footer>
  );
}
