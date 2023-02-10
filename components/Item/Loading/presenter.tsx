import { ComponentProps } from "react";
import { Spinner } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import Loading from "./container";

type Props = ComponentProps<typeof Loading>;

export default function LoadingPresenter({ isMyTurn, finishType }: Props) {
  return (
    <div
      style={{ width: "90%", height: `${CONFIG.spaceBasis}px` }}
      className="d-inline-flex mx-auto justify-content-end"
    >
      {!isMyTurn && finishType == "" && (
        <Spinner
          animation="border"
          role="status"
          size={innerWidth < 700 ? "sm" : void 0}
          className="align-self-center"
          style={{ color: "limegreen" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
