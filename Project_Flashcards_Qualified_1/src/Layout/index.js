import React, { useEffect } from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { useState } from "react";
import Home from "./Home";
import CreateDeck from "../Decks/CreateDeck";
import DeckView from "../Decks/DeckView";
import { deleteDeck, listDecks, deleteCard } from "../utils/api/index.js";
import CreateCards from "../Decks/CreateCards";
import EditDecks from "../Decks/EditDecks";
import EditCards from "../Decks/EditCards";
import StudyDeck from "./StudyDeck";

function Layout() {
  const deckId = useParams()
  const history = useHistory();
  const [decks, setDecks] = useState([])
  const [deck, setDeck] = useState({
    id: 0,
    name: "",
    description: "",
    cards: [],
  });
  const [card, setCard] = useState({
    front: "",
    back: "",
    deckId,
  });

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await listDecks();
      setDecks(loadedDeck);
    }
    loadDeck();
  }, []);

  async function cardDeleteHandler(cardId) {
    if (window.confirm("Delete card? This can not be undone.")) {
      await deleteCard(cardId);
      history.go(0);
    }
  }

  async function deckDeleteHandler(deckId) {
    if (window.confirm("Delete this deck? This can not be undone")) {
      deleteDeck(deckId);
      history.push("/");
    }
  }
  function cancelHandler() {
    history.push("/");
  }

  return (
    <section>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck deck={deck} setDeck={setDeck}/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCards card={card} setCard={setCard}/>
          </Route>          
          <Route path="/decks/new">
            <CreateDeck cancelHandler={cancelHandler} deck={deck} setDeck={setDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCards card={card} setCard={setCard} />
          </Route>          
          <Route path="/decks/:deckId/edit">
            <EditDecks cancelHandler={cancelHandler} deck={deck} setDeck={setDeck}/>
          </Route>          
          <Route path="/decks/:deckId">
            <DeckView
              deckDeleteHandler={deckDeleteHandler}
              cardDeleteHandler={cardDeleteHandler}
              deck={deck} setDeck={setDeck}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </section>
  );
}

export default Layout;
