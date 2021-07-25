import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

export default function EditCards({ card, setCard }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    async function loadCard() {
      const loadedCard = await readCard(cardId); //loads the data from card you chose to edit
      setCard({
        id: cardId,
        front: loadedCard.front,
        back: loadedCard.back,
        deckId: Number(deckId),
      });
    }

    async function loadDeckName() {
      const loadedDeckName = await readDeck(deckId); //used to access the decks name in which card is associated with
      setDeckName(loadedDeckName.name);
    }
    loadCard();
    loadDeckName();
  }, [cardId, deckId, setCard]);

  async function submitHandler(event) {
    event.preventDefault();
    const result = await updateCard(card);
    history.push(`/decks/${result.deckId}`); //handles the updating of the card upon submission then redirects you to the cards route
  }

  function cancelHandler() {
    history.go(-1);
  }

  function changeFront(event) {
    setCard({ ...card, front: event.target.value });
  } //updates values in form

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
        <CardForm
          changeFront={changeFront}
          changeBack={changeBack}
          submitHandler={submitHandler}
          cancelHandler={cancelHandler}
          card={card}
        />
      </section>
    </div>
  );
}
