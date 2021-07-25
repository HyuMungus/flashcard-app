import React from "react";

export default function CardForm({
  cancelHandler,
  submitHandler,
  changeFront,
  changeBack,
  card = {},
}) {
  function cardFront() {
    return card.front ? card.front : undefined;
  } //sets the value of the form to the card front and card back if there is one present
  function cardBack() {
    return card.back ? card.back : undefined;
  }

  return (
    <form className="form-group">
      <label htmlFor="cardFront">Front</label>
      <textarea
        className="form-control"
        id="cardFront"
        rows="3"
        value={cardFront()}
        onChange={changeFront}
        placeholder="Card Front"
      />
      <label htmlFor="cardBack">Back</label>
      <textarea
        className="form-control"
        id="cardBack"
        rows="3"
        value={cardBack()}
        onChange={changeBack}
        placeholder="Card Back"
      />
      <button
        className="btn btn-secondary"
        type="reset"
        value="reset"
        onClick={cancelHandler}
      >
        Finish
      </button>
      <button
        className="btn btn-secondary"
        type="submit"
        value="submit"
        onClick={submitHandler}
      >
        Submit
      </button>
    </form>
  );
}
