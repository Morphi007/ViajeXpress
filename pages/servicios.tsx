// pages/servicios.tsx
import React from 'react';
import { ExpressLayout } from '@/components/layout';

// Asegúrate de importar el archivo de estilos globales
const Servicios = () => {
  return (
    <ExpressLayout title="Contacto">

    <div className="servicesContainer">
      <h3 className="servicesTitle">Servicios de Transporte</h3>
      <p className="servicesIntro">
        Bienvenido a nuestra sección de servicios de transporte. Aquí encontrarás toda la información necesaria sobre nuestros viajes en autobuses, líneas del metro, paradas, y mucho más.
      </p>

      <section className="servicesSection">
        <h2>Viajes Disponibles en Autobuses</h2>
        <p>Explora nuestras rutas de autobuses con información sobre horarios y destinos.</p>
        <a href="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp" target="_blank" rel="noopener noreferrer">
          <img
            src="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp"
            alt="Viajes en Autobuses"
            style={{ width: '30%', height: 'auto', borderRadius: '8px' }}
          />
        </a>
      </section>

      <section className="servicesSection">
        <h2>Líneas del Metro</h2>
        <p>Consulta las líneas del metro, incluyendo rutas, horarios y precios.</p>
        <a href="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp" target="_blank" rel="noopener noreferrer">
          <img
            src="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp"
            alt="Líneas del Metro"
            style={{ width: '30%', height: 'auto', borderRadius: '8px' }}
          />
        </a>
      </section>

      <section className="servicesSection">
        <h2>Información de Paradas</h2>
        <p>Encuentra información sobre las paradas de autobuses y estaciones de metro cercanas.</p>
        <a href="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp" target="_blank" rel="noopener noreferrer">
          <img
            src="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp"
            alt="Información de Paradas"
            style={{ width: '30%', height: 'auto', borderRadius: '8px' }}
          />
        </a>
      </section>

      <section className="servicesSection">
        <h2>Mapa Interactivo</h2>
        <p>Consulta nuestro mapa interactivo para visualizar las rutas y ubicaciones de paradas.</p>
        {/* Aquí puedes incluir un componente de mapa interactivo si lo deseas */}
      </section>
    </div>
    </ExpressLayout>
  );
};

export default Servicios;
