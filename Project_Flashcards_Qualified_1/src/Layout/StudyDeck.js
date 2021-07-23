import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

export default function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [study, setStudy] = useState({
    cards: [],
    currentCard: 0,
    flipped: false,
    front: true,
    cardLength: 0,
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
      setStudy({
        cards: loadedDeck.cards,                        //loads in the deck then matches its values with study
        currentCard: 0,
        flipped: false,
        front: true,
        cardLength: loadedDeck.cards.length,
      });
    }
    loadDeck();
  }, [deckId]);

  function flipHandler() {
    setStudy({
      ...study,
      front: !study.front,        
      flipped: true,
    });
  }

  function cardSideHandler() {
    return study.front
      ? study.cards[study.currentCard].front      //displays front or back content of cards depending on whether front is true or false
      : study.cards[study.currentCard].back;
  }

  function cardCap() {
    return study.currentCard >= study.cardLength - 1;
  }

  function nextCardHandler() {
    if (cardCap()) {
      if (window.confirm("Restart cards?")) {
        setStudy({
          ...study,
          currentCard: 0,
          front: true,
          flipped: false,
        });
      } else {
        history.push("/");                            //checks if end of deck has been reached and allows you to restart. adds 1 to current card so data could be displayed properly
      }
    } else {
      setStudy({
        ...study,
        currentCard: study.currentCard + 1,
        front: true,
        flipped: false,
      });
    }
  }

  if (study.cards.length < 3) {           //displays different screen if deck you are studying has less than 3 cards
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item">
              <p>Study Deck</p>
            </li>
          </ol>
        </nav>
        <h3>Study: {deck.name}</h3>
        <h4>Not enough cards</h4>
        <p>
          You need atleast 3 cards to study. There are {study.cards.length}{" "}
          cards in this deck
        </p>
        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
          Add cards
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item">
              <p>Study Deck</p>
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-body">
            <h5>
              Card {study.currentCard + 1} of {study.cards.length}
            </h5>
            <p className="card-text">{cardSideHandler()}</p>
            <button className="btn btn-primary" onClick={flipHandler}>
              Flip
            </button>
            <button
              className="btn btn-secondary"
              disabled={!study.flipped}
              onClick={nextCardHandler}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
