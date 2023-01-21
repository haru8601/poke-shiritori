import { ComponentProps } from "react";
import { Spinner } from "react-bootstrap";
import Loading from "./container";

type Props = ComponentProps<typeof Loading>;

export default function LoadingPresenter({
  isMyTurn,
  finishType,
  spaceBasis,
}: Props) {
  return (
    <div
      style={{ width: "90%", height: `${spaceBasis}px` }}
      className="d-inline-flex mx-auto justify-content-end"
    >
      {!isMyTurn && finishType == "" && (
        <Spinner
          animation="border"
          variant="secondary"
          role="status"
          size={innerWidth < 700 ? "sm" : void 0}
          className="align-self-center"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
