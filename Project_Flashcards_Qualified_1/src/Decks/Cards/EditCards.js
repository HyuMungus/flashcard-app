import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";

export default function EditCards({ cancelHandler }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({
    id: cardId,
    front: "",
    back: "",
    deckId: Number(deckId),
  });
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    async function loadCard() {
      const loadedCard = await readCard(cardId);
      setCard({
        id: cardId,
        front: loadedCard.front,
        back: loadedCard.back,
        deckId: Number(deckId),
      });
    }
    async function loadDeckName() {
      const loadedDeckName = await readDeck(deckId);
      setDeckName(loadedDeckName.name);
    }
    loadCard();
    loadDeckName();
  }, [cardId, deckId]);

  async function editHandler(event) {
    event.preventDefault();
    const result = await updateCard(card);
    history.push(`/decks/${result.deckId}`);
  }

  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  }

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
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <section key="edit-card">
        <h2>Edit Card</h2>
        <form key="editCard" className="form-group">
          <label htmlFor="cardFront">Front</label>
          <textarea
            className="form-control"
            id="cardFront"
            rows="3"
            placeholder="Deck name"
            value={card.front}
            onChange={changeFront}
          />
          <label htmlFor="cardBack">Back</label>
          <textarea
            className="form-control"
            id="cardBack"
            rows="3"
            value={card.back}
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
            onClick={editHandler}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
