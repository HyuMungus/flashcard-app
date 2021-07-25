import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

export default function Home({ decks }) {
  const history = useHistory();

  async function deleteButtonHandler(deckId) {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.") //handles the deleting of decks then refreshes page
    ) {
      await deleteDeck(deckId);
      history.go(0);
    }
  }
  const allDecks = decks.map(
    (
      deck,
      index //maps all decks to be displayed on the screen
    ) => (
      <div className="card" key={index}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <h6>{deck.cards.length} cards</h6>
          <p className="card-text">{deck.description}</p>
          <div>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
            <button
              onClick={() => deleteButtonHandler(deck.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div>
      <Link className="btn btn-primary" to="/decks/new">
        Create Deck
      </Link>
      <div className="d-flex flex-column">{allDecks}</div>
    </div>
  );
}
