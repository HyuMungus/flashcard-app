import { useHistory } from "react-router-dom";
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
      const newDeck = await createDeck(deck);
      setDeck({
        id: 0,
        name: "",
        description: "",                                            //creates new deck, sets it back to initial state then sends you to page with it's id
        cards: [],
      });
      history.push(`/decks/${newDeck.id}`);
    }
    createdDeck();
  }

  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });   
  }                                                                         //update the contents in form
  function changeDesc(event) {
    setDeck({ ...deck, description: event.target.value });
  }

  return (
    <main>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
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
          <textarea
            className="form-control"
            id="deckName"
            rows="1"
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
    </main>
  );
}
