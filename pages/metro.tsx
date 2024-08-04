// Metro.tsx
import { ExpressLayout } from '@/components/layout';
// pages/metro.tsx
import React from 'react';

// Ejemplo de datos de las líneas del metro
const metroLines = [
  { id: 1, name: 'Línea 1', description: 'De A a B', price: 'RD$50' },
  { id: 2, name: 'Línea 2', description: 'De C a D', price: 'RD$60' },
  { id: 3, name: 'Línea 3', description: 'De E a F', price: 'RD$70' },
];

const Metro = () => {
  return (
    <div className="metroContainer">
      <h1 className="metroTitle">Información del Metro</h1>
      <section className="metroSection">
        <h2>Líneas del Metro</h2>
        <ul className="metroLineList">
          {metroLines.map(line => (
            <li key={line.id} className="metroLineItem">
              <h3 className="metroLineName">{line.name}</h3>
              <p>{line.description}</p>
              <p className="metroLinePrice">Precio: {line.price}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="metroSection">
        <h2>Datos de Contacto</h2>
        <p className="metroContactInfo">
          Si tienes alguna pregunta sobre el servicio, por favor contáctanos al: <strong>(809) 123-4567</strong>
        </p>
      </section>
      <section className="metroMap">
        <h2>Mapa del Metro</h2>
       {/* //<img src="/images/mapa-metro.png" alt="Mapa del Metro" className={styles.mapImage} /> */}
      </section>
    </div>
  );
};

export default Metro;
