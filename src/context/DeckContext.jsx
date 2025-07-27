import { createContext, useContext, useState } from 'react';

const DeckContext = createContext();

export const useDeck = () => useContext(DeckContext);

export function DeckProvider({ children }) {
  const [mainDeck, setMainDeck] = useState([]);
  const [sideboard, setSideboard] = useState([]);

const basicLands = ['Plains', 'Island', 'Swamp', 'Mountain', 'Forest'];

const addToMain = (card) => {
  const copies = mainDeck.filter(c => c.name === card.name).length;

  if (!basicLands.includes(card.name) && copies >= 4) {
    alert('Ya tienes 4 copias de esta carta en el mazo principal.');
    return;
  }

  if (mainDeck.length >= 60) {
    alert('Mazo principal lleno (60 cartas).');
    return;
  }

  setMainDeck(prev => [...prev, card]);
};

const addToSide = (card) => {
  const copies = sideboard.filter(c => c.name === card.name).length;

  if (!basicLands.includes(card.name) && copies >= 4) {
    alert('Ya tienes 4 copias de esta carta en el sideboard.');
    return;
  }

  if (sideboard.length >= 15) {
    alert('Sideboard lleno (15 cartas).');
    return;
  }

  setSideboard(prev => [...prev, card]);
};


  const removeFromMain = (index) => {
    setMainDeck(prev => prev.filter((_, i) => i !== index));
  };

  const removeFromSide = (index) => {
    setSideboard(prev => prev.filter((_, i) => i !== index));
  };

  const clearDeck = () => {
    setMainDeck([]);
    setSideboard([]);
  };

  return (
    <DeckContext.Provider value={{
      mainDeck,
      sideboard,
      addToMain,
      addToSide,
      removeFromMain,
      removeFromSide,
      clearDeck
    }}>
      {children}
    </DeckContext.Provider>
  );
}
