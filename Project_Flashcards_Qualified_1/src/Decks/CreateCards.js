import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

export default function CreateCards({ card, setCard }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId); //loads in the deck
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  function cancelHandler() {
    history.go(-1);
  }

  function submitHandler(event) {
    event.preventDefault();
    async function createdCard() {
      await createCard(deckId, card); //creates the new card then sets the card back to its initial state once created
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
        <CardForm
          changeFront={changeFront}
          changeBack={changeBack}
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
        />
      </section>
    </div>
  );
}
