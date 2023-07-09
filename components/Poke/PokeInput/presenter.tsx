import { ComponentProps } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styles from "@/app/styles/Top.module.css";
import { CONFIG } from "@/const/config";
import { GAME_STATUS } from "@/const/gameStatus";
import { OS_KEY } from "@/const/os";
import PokeInput from "./container";

type Props = ComponentProps<typeof PokeInput>;

export default function PokeInputPresenter({
  sentPokeName,
  pokeErr,
  gameStatus,
  inputRef,
  os,
  innerWidth,
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
          {`スタート${
            (innerWidth >= CONFIG.pcMinWidth && `(${OS_KEY[os]}+Enter)`) || ""
          }`}
        </Button>
      )) || (
        <>
          <Form.Control
            style={{ maxWidth: "300px" }}
            className={styles.pokeInput}
            placeholder="げんがー"
            value={sentPokeName}
            disabled={gameStatus == GAME_STATUS.beforeStart}
            isInvalid={pokeErr != ""}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            ref={inputRef}
            onChange={onChangePoke}
            onKeyDown={onKeydown}
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
