import Image from "next/image";
import { ComponentProps } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { CONFIG } from "@/const/config";
import { GAME_STATUS } from "@/const/gameStatus";
import PokeSkip from "./container";

type Props = ComponentProps<typeof PokeSkip>;

export default function PokeSkipPresenter({
  skipPoke,
  gameStatus,
  onSkip,
}: Props) {
  return (
    <Button
      onClick={onSkip}
      disabled={gameStatus != GAME_STATUS.playingMyturn}
      className="position-relative p-0"
    >
      <Container fluid className="p-0" style={{ width: CONFIG.spaceBasis }}>
        {Array(3)
          .fill(1) // 疎配列にしない
          .map((val, index) => {
            return (
              // TODO: skipLeftによってグレーアウト
              <Col key={index} className="border-black border-1 border-bottom">
                3
              </Col>
            );
          })}
      </Container>
      <Image
        height={CONFIG.spaceBasis}
        width={CONFIG.spaceBasis}
        src={skipPoke.imgPath}
        alt={skipPoke.name.japanese}
        style={{ zIndex: -100 }}
        className="position-absolute top-0 start-0"
      />
    </Button>
  );
}
