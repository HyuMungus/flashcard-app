import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

export default function CreateCards({ cancelHandler }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({
    front: "",
    back: "",
    deckId,
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);      //loads in the deck
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  function newCardHandler(event) {
    event.preventDefault();
    async function createdCard() {
      await createCard(deckId, card);                 //creates the new card then sets the card back to its initial state once created
      setCard({
        front: "",
        back: "",
        deckId,
      });
    }
    createdCard();
  }

  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  }
                                                              //changes values inside form
  function changeBack(event) {
    setCard({ ...card, back: event.target.value });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h4>{deck.name}: Add Card</h4>
      <section key="new-card">
        <h2>Create Cards</h2>
        <form key="newDeck" className="form-group">
          <label htmlFor="cardFront">Front Side</label>
          <textarea
            className="form-control"
            id="cardFront"
            rows="3"
            placeholder="Front side of the card"
            onChange={changeFront}
          />
          <label htmlFor="cardBack">Back Side</label>
          <textarea
            className="form-control"
            id="cardBack"
            rows="3"
            placeholder="Back side of the card"
            onChange={changeBack}
          />
          <button
            className="btn btn-secondary"
            type="reset"
            value="reset"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button
            className="btn btn-secondary"
            type="submit"
            value="submit"
            onClick={newCardHandler}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
