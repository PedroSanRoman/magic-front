import { useEffect, useState } from 'react';
import { getDecks } from '../services/api';
import './DecksPage.css';

export default function DecksPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await getDecks();
        setDecks(response.data);
      } catch (err) {
        console.error(err);
        alert('No se pudieron cargar los mazos');
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) return <p>Cargando mazos...</p>;

  return (
    <div className="decks-container">
      <h1 className='deckspage-title'>Mazos Guardados</h1>
      {decks.length === 0 && <p>No tienes mazos guardados.</p>}
      
      <div className="decks-grid">
        {decks.map(deck => (
          <div key={deck._id} className="deck-card">
            <h3>{deck.name}</h3>
            
            <div className="deck-section">
              <h4>Main Deck ({deck.main.length} cartas)</h4>
              <div className="cards-list">
                {deck.main.map((card, index) => (
                  <div key={index} className="card-item">
                    <img 
                      src={card.image}
                      alt={card.name}
                      className="card-image"
                    />
                    <div className="card-info">
                      <span className="card-name">{card.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {deck.sideboard && deck.sideboard.length > 0 && (
              <div className="deck-section">
                <h4>Sideboard ({deck.sideboard.length} cartas)</h4>
                <div className="cards-list">
                  {deck.sideboard.map((card, index) => (
                    <div key={index} className="card-item">
                      <img 
                        src={card.image}
                        alt={card.name}
                        className="card-image"
                      />
                      <div className="card-info">
                        <span className="card-name">{card.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}