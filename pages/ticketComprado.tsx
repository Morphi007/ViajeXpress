import React from 'react';

interface Passenger {
  Firstname: string;
  Lastname: string;
}

interface TripDetails {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  Horario: string;
  pasajeros: Passenger[];
}

const TripBoardingPass: React.FC<{ trip: TripDetails }> = ({ trip }) => {
  const printPage = () => {
    window.print();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Boarding Pass</h1>
        <div className="text-gray-700 mb-4">
          <p><span className="font-semibold">ID:</span> {trip.id}</p>
          <p><span className="font-semibold">Origen:</span> {trip.origen}</p>
          <p><span className="font-semibold">Destino:</span> {trip.destino}</p>
          <p><span className="font-semibold">Fecha:</span> {trip.fecha}</p>
          <p><span className="font-semibold">Horario:</span> {trip.Horario}</p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold mb-2">Pasajeros</h2>
          <ul className="list-disc pl-5">
            {trip.pasajeros.map((pasajero, index) => (
              <li key={index}>
                {pasajero.Firstname} {pasajero.Lastname}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center p-4 bg-gray-100">
        <button
          onClick={printPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Imprimir
        </button>
      </div>
    </div>
  );
};

export default TripBoardingPass;
