import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importa tu componente principal App
import Servicios from './components/Servicios'; // Importa tu componente Servicios

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a ViajeXpress</h1>
      <p className="text-lg mb-4">Aquí encontrarás los tipos de transporte disponibles:</p>
      <Servicios />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
