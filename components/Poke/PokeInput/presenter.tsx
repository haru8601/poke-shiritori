import { ComponentProps } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { GAME_STATUS } from "@/const/gameStatus";
import PokeInput from "./container";

type Props = ComponentProps<typeof PokeInput>;

export default function PokeInputPresenter({
  sentPokeName,
  pokeErr,
  gameStatus,
  onKeydown,
  onClickStart,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <InputGroup
      className={`mx-auto my-1 justify-content-center ${styles.pointer}`}
    >
      {(gameStatus == GAME_STATUS.beforeStart && (
        <Button
          variant="primary"
          size="lg"
          className="rounded-end"
          type="submit"
          onClick={onClickStart}
        >
          スタート
        </Button>
      )) || (
        <>
          <Form.Control
            style={{ maxWidth: "300px" }}
            value={sentPokeName}
            onChange={onChangePoke}
            onKeyDown={onKeydown}
            placeholder="ゲンガー"
            disabled={gameStatus == GAME_STATUS.beforeStart}
            isInvalid={pokeErr != ""}
            autoComplete="off"
            className={styles.pokeInput}
          />
          <Button
            variant="primary"
            className="rounded-end"
            type="submit"
            onClick={onSubmitPoke}
            disabled={gameStatus !== GAME_STATUS.playingMyturn}
          >
            送信
          </Button>
        </>
      )}
      <Form.Control.Feedback type="invalid" tooltip>
        {pokeErr}
      </Form.Control.Feedback>
    </InputGroup>
  );
}
