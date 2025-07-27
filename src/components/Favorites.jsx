import { useEffect, useState } from 'react';
import { getFavorites, deleteFavorite } from '../services/api';
import './Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const res = await getFavorites();
    setFavorites(res.data);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar esta carta de favoritos?')) {
      await deleteFavorite(id);
      loadFavorites();
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Favoritos</h1>
      <div className="favorites-grid">
        {favorites.map((f) => (
          <div key={f._id} className="favorite-card">
            <button
              className="delete-button"
              onClick={() => handleDelete(f._id)}
            >
              ✖
            </button>
            <img src={f.image} alt={f.name} className="favorite-image" />
            <p className="favorite-name">{f.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
