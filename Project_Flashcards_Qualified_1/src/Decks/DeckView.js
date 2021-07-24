import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function DeckView({ deckDeleteHandler, cardDeleteHandler }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    cards: [],
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);      //loads in the deck
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const cardList = deck.cards.map((card) => (       //maps all cards in the deck to be displayed as a card
    <div className="card" key={card.id}>
      <div className="card-body">
        <h5 className="card-title">{card.name}</h5>
        <h6>Front</h6>
        <p className="card-text">{card.front}</p>
        <hr />
        <h6>Back</h6>
        <p className="card-text">{card.back}</p>
        <div>
          <Link
            className="btn btn-secondary"
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
          >
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => cardDeleteHandler(card.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{deck.name}</li>
        </ol>
      </nav>
      <h4>{deck.name}</h4>
      <p>{deck.description}</p>
      <div>
        <Link className="btn btn-secondary" to={`/decks/${deck.id}/edit`}>
          Edit Deck
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
          Study
        </Link>
        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
          Add Cards
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => deckDeleteHandler(deck.id)}
        >
          Delete Deck
        </button>
      </div>
      <div className="card-list">{cardList}</div>
    </div>
  );
}
