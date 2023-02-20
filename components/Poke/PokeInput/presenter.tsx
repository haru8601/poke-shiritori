import { ComponentProps } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styles from "@/styles/Top.module.css";
import PokeInput from "./container";

type Props = ComponentProps<typeof PokeInput>;

export default function PokeInputPresenter({
  pokeList,
  sentPokeName,
  pokeErr,
  isMyTurn,
  gameStatus,
  diff,
  onKeydown,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <InputGroup className="mx-auto my-1 justify-content-center">
      <Form.Control
        style={{ maxWidth: "300px" }}
        id="poke-input"
        list="poke-list"
        value={sentPokeName}
        onChange={onChangePoke}
        onKeyDown={onKeydown}
        placeholder="ポケモンを入力してください"
        disabled={!isMyTurn || gameStatus.includes("end")}
        isInvalid={pokeErr != ""}
        autoComplete="off"
        className={styles.pokeInput}
      />
      {diff == "easy" && (
        <datalist id="poke-list">
          {pokeList.map((poke) => {
            return <option key={poke.id}>{poke.name.japanese}</option>;
          })}
        </datalist>
      )}
      <Button
        variant="primary"
        className="rounded-end"
        type="submit"
        onClick={onSubmitPoke}
        disabled={!isMyTurn || gameStatus.includes("end")}
      >
        送信
      </Button>
      <Form.Control.Feedback type="invalid" tooltip>
        {pokeErr}
      </Form.Control.Feedback>
    </InputGroup>
  );
}
