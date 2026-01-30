import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/Totem.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz #root');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);