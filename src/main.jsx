import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AdminProvider } from './context/AdminProvider'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);
