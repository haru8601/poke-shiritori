import Image from "next/image";
import { ComponentProps } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { GAME_STATUS } from "@/const/gameStatus";
import PokeSkip from "./container";

type Props = ComponentProps<typeof PokeSkip> & {
  entered: boolean;
  onEnterSkip: () => void;
  onLeaveSkip: () => void;
};

export default function PokeSkipPresenter({
  skipPoke,
  gameStatus,
  skipLeft,
  entered,
  onSkip,
  onEnterSkip,
  onLeaveSkip,
}: Props) {
  return (
    <div
      style={{
        width: CONFIG.spaceBasis * 2,
        height: CONFIG.spaceBasis * 1.5,
      }}
      className="position-relative"
    >
      <Button
        disabled={gameStatus != GAME_STATUS.playingMyturn}
        style={{
          width: "100%",
          height: "100%",
        }}
        className="p-0 border-0"
        variant="" // primaryをつけない
        onClick={onSkip}
        onMouseEnter={onEnterSkip}
        onMouseLeave={onLeaveSkip}
      >
        <Container fluid className="p-0 m-0">
          {Array(CONFIG.skipMax)
            .fill(1) // 疎配列にしない
            .map((val, index) => {
              return (
                <Col
                  aria-valuetext=" "
                  key={index}
                  style={{
                    opacity: 0.8,
                    height: (CONFIG.spaceBasis * 1.5) / CONFIG.skipMax,
                    backgroundColor: `${
                      CONFIG.skipMax - skipLeft <= index
                        ? entered
                          ? "forestgreen"
                          : "limegreen"
                        : ""
                    }`,
                  }}
                  className={`border-dark border-1 border
                  ${
                    index == 0
                      ? "rounded-top"
                      : index == CONFIG.skipMax - 1
                      ? "rounded-bottom"
                      : ""
                  }
                `}
                ></Col>
              );
            })}
        </Container>
        <Image
          height={CONFIG.spaceBasis * 1.5}
          width={CONFIG.spaceBasis * 1.5}
          src={skipPoke.imgPath}
          alt={skipPoke.name.japanese}
          style={{ zIndex: 100 }}
          className="position-absolute top-50 start-50 translate-middle"
        />
      </Button>
    </div>
  );
}
