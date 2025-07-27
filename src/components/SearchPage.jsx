import { useState } from 'react';
import { searchCards, addFavorite } from '../services/api';
import { useDeck } from '../context/DeckContext';
import './SearchPage.css'; 

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState([]);
  const { addToMain, addToSide } = useDeck();

  const handleSearch = async () => {
    if (!query.trim()) return;
    const res = await searchCards(query);
    setCards(res.data.data);
  };

  const handleAddFavorite = async (card) => {
    await addFavorite({
      id: card.id,
      name: card.name,
      image: card.image_uris?.normal,
      oracle_id: card.oracle_id
    });
    alert(`${card.name} añadida a favoritos`);
  };

  const handleAddMain = (c) => {
    addToMain({
      id: c.id,
      name: c.name,
      image: c.image_uris?.normal,
      oracle_id: c.oracle_id
    });
  };

  const handleAddSide = (c) => {
    addToSide({
      id: c.id,
      name: c.name,
      image: c.image_uris?.normal,
      oracle_id: c.oracle_id
    });
  };

  return (
    <div className="searchpage-container">
      <h1 className="searchpage-title">Buscador de Cartas</h1>

      <div className="search-form">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Busca una carta..."
        />
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      <div className="cards-grid">
        {cards.map(c => (
          <div key={c.id} className="card-box">
            {c.image_uris && (
              <img
                src={c.image_uris.small}
                alt={c.name}
                className="card-image"
              />
            )}
            <h3 className="card-name">{c.name}</h3>
            <button
              className="card-button favorite"
              onClick={() => handleAddFavorite(c)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "4px" }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg> Favorito
            </button>
            <button
              className="card-button main"
              onClick={() => handleAddMain(c)}
            >
              ✚ Main
            </button>
            <button
              className="card-button side"
              onClick={() => handleAddSide(c)}
            >
              ✚ Side
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
