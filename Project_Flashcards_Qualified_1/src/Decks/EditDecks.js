import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";

export default function EditDecks({ cancelHandler }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  async function editHandler(event) {
    event.preventDefault();
    const result = await updateDeck(deck);
    history.push(`/decks/${result.id}`);
  }

  function changeName(event) {
    setDeck({ ...deck, name: event.target.value });
  }

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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <section key="edit-deck">
        <h2>Edit Deck</h2>
        <form key="editDeck" className="form-group">
          <label htmlFor="deckName">Name</label>
          <textarea
            className="form-control"
            id="deckName"
            rows="1"
            placeholder="Deck name"
            value={deck.name}
            onChange={changeName}
          />
          <label htmlFor="deckDesc">Description</label>
          <textarea
            className="form-control"
            id="deckDesc"
            rows="4"
            value={deck.description}
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
            onClick={editHandler}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
