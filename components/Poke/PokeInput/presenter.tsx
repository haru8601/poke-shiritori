import { ComponentProps } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import PokeInput from "./container";

type Props = ComponentProps<typeof PokeInput>;

export default function PokeInputPresenter({
  pokeList,
  sentPokeName,
  pokeErr,
  isMyTurn,
  finishType,
  diff,
  onKeydown,
  onChangePoke,
  onSubmitPoke,
}: Props) {
  return (
    <InputGroup style={{ width: "40%", minWidth: "300px" }} className="mx-auto">
      <Form.Control
        id="poke-input"
        list="poke-list"
        value={sentPokeName}
        onChange={onChangePoke}
        onKeyDown={onKeydown}
        placeholder="ポケモンを入力してください"
        disabled={!isMyTurn || finishType != ""}
        isInvalid={pokeErr != ""}
        autoComplete="off"
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
        disabled={!isMyTurn || finishType != ""}
      >
        送信
      </Button>
      <Form.Control.Feedback type="invalid" tooltip>
        {pokeErr}
      </Form.Control.Feedback>
    </InputGroup>
  );
}
