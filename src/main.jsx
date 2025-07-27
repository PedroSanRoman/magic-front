import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainPage from './MainPage'
import { DeckProvider } from './context/DeckContext'
import './index.css'

const images = [
  '/backgrounds/bg1.jpg',
  '/backgrounds/bg2.jpg',
  '/backgrounds/bg3.jpg'
];
let currentIndex = 0;
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  document.body.style.backgroundImage = `url(${images[currentIndex]})`;
}, 8000);

document.body.style.backgroundImage = `url(${images[0]})`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DeckProvider>
      <BrowserRouter>
        <div className="app-container">
          <MainPage />
        </div>
      </BrowserRouter>
    </DeckProvider>
  </React.StrictMode>
)
