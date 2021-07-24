import { useHistory, Link } from "react-router-dom";
import React, { useState } from "react";
import { createDeck } from "../utils/api";

export default function CreateDeck({ cancelHandler }) {
  const history = useHistory();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
    cards: [],
  });

  function newDeckHandler(event) {
    event.preventDefault();
    async function createdDeck() {
      const newDeck = await createDeck(deck);                     //creates new deck then sets deck back to initial state and redirects you to the page in which its located
      setDeck({   
        id: 0,
        name: "",
        description: "",
        cards: [],
      });
      history.push(`/decks/${newDeck.id}`);
    }
    createdDeck();
  }

  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });
  }                                                               //updates values in form
  function changeDesc(event) {
    setDeck({ ...deck, description: event.target.value });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <p>Create Deck</p>
          </li>
        </ol>
      </nav>
      <section key="new-deck">
        <h2>Create Deck</h2>
        <form key="newDeck" className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            className="form-control"
            id="deckName"
            rows="1"
            type='input'
            placeholder="Deck name"
            onChange={changeName}
          />
          <label htmlFor="deckDesc">Description</label>
          <textarea
            className="form-control"
            id="deckDesc"
            rows="4"
            placeholder="Brief description of the deck"
            onChange={changeDesc}
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
            onClick={newDeckHandler}
          >
            Submit
          </button>
        </form>
      </section>
      </div>
  );
}
