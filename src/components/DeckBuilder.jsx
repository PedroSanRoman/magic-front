import { saveDeck } from '../services/api';
import { useDeck } from '../context/DeckContext';
import './DeckBuilder.css';

export default function DeckBuilder() {
  const {
    mainDeck,
    sideboard,
    clearDeck,
    removeFromMain,
    removeFromSide
  } = useDeck();

  const handleSaveDeck = async () => {
    const deckName = prompt('Nombre del mazo:', 'Mi mazo');
    if (!deckName) return;
    await saveDeck({ name: deckName, main: mainDeck, sideboard });
    alert('Mazo guardado ✅');
    clearDeck();
  };

  return (
    <div className="deckbuilder-container">
      <h1 className="deckbuilder-title">Constructor de Mazo</h1>
      <p className="deckbuilder-status">
        Main deck: {mainDeck.length}/60 | Sideboard: {sideboard.length}/15
      </p>
      <button className="save-button" onClick={handleSaveDeck}>
        💾 Guardar mazo
      </button>


      <h3 className="deckbuilder-subtitle">Main Deck</h3>
      <div className="deck-list">
        {mainDeck.map((c, i) => (
          <div key={i} className="card-container">
            <img src={c.image} alt={c.name} className="card-image" />
            <button
              className="remove-button"
              onClick={() => removeFromMain(i)}
              title="Eliminar carta"
            >
              ✖
            </button>
          </div>
        ))}
      </div>


      <h3 className="deckbuilder-subtitle">Sideboard</h3>
      <div className="deck-list">
        {sideboard.map((c, i) => (
          <div key={i} className="card-container">
            <img src={c.image} alt={c.name} className="card-image" />
            <button
              className="remove-button"
              onClick={() => removeFromSide(i)}
              title="Eliminar carta"
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
