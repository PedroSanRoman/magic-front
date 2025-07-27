import { Routes, Route, Link } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import Favorites from './components/Favorites';
import DeckBuilder from './components/DeckBuilder';
import DecksPage from './components/DecksPage';
import { useDeck } from './context/DeckContext';

export default function MainPage() {
  const { mainDeck, sideboard } = useDeck();

  return (
    <>
      <nav>
        <div className="nav-content">
          <Link to="/">Buscador</Link>
          <Link to="/favorites">Favoritos</Link>
          <Link to="/deck">
            Mazo ({mainDeck.length}/60 - {sideboard.length}/15)
          </Link>
          <Link to="/decks">Mazos guardados</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/deck" element={<DeckBuilder />} />
        <Route path="/decks" element={<DecksPage />} />
      </Routes>
    </>
  );
}
