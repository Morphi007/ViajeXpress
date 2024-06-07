import React from 'react';

const Servicios = () => {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
      <h3 className="text-lg font-semibold mb-2">Tipos de transporte disponibles:</h3>
      <ul className="list-disc pl-6">
        <li>Metro</li>
        <li>Autobús</li>
        <li>Moto</li>
        <li>Teleférico</li>
      </ul>
    </div>
  );
};

export default Servicios;
