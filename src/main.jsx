import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Import from 'react-dom/client'
import App from './App';

import './assets/styles/variables.css';
import './assets/styles/global.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
