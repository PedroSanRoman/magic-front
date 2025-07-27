import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
const API = axios.create({ baseURL: `${API_URL}` });

export const searchCards = (query) => API.get(`/cards/search?q=${query}`);
export const addFavorite = (card) => API.post('/favorites', card);
export const getFavorites = () => API.get('/favorites');
export const deleteFavorite = (id) => API.delete(`/favorites/${id}`);
export const saveDeck = (deck) => API.post('/decks', deck);
export const getDecks = () => API.get('/decks');
