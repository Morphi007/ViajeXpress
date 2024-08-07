import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useTicket } from '@/context/auth/TicketContext';

interface Route {
  id: string;
  origin: {
    nombre: string;
    horarios: string[];
    mapa: string;
  };
  destination: {
    nombre: string;
  };
  date: string;
  precio: string;
  passengers: number;
}

interface RutaCardProps {
  route: Route;
}

const RutaCard: React.FC<RutaCardProps> = ({ route }) => {
  const { updateTicketCount } = useTicket();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCompra = () => {
    if (route.origin.nombre === route.destination.nombre) {
      alert("Error: El origen y el destino no pueden ser el mismo.");
      return;
    }

    const routeInfo = {
      id: Date.now().toString(),
      origen: route.origin.nombre,
      destino: route.destination.nombre,
      fecha: route.date,
      Precio: route.precio,
      pasajeros: route.passengers,
    };

    const existingTickets = JSON.parse(Cookies.get('tickets') || '[]');
    const updatedTickets = [...existingTickets, routeInfo];

    Cookies.set('tickets', JSON.stringify(updatedTickets), { expires: 7 });

    updateTicketCount();
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 5000); // Ocultar el mensaje después de 5 segundos
  };

  return (
    <div className="border rounded p-4 mb-4 shadow-md relative">
      <h2 className="text-xl font-bold">{route.origin.nombre} - {route.destination.nombre}</h2>
      <p><strong>Fecha:</strong> {route.date}</p>
      <p><strong>Precio:</strong> {route.precio} DOP</p>
      <p><strong>Personas:</strong> {route.passengers}</p>
      <p><strong>Horarios disponibles:</strong> {route.origin.horarios.join(', ')}</p>
      <div className="flex justify-between items-center mt-4">
        <a href={route.origin.mapa} target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 min-w-[150px]">
            <FaMapMarkerAlt className="inline-block mr-2" />  Google Maps
          </button>
        </a>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 min-w-[150px]"
          onClick={handleCompra}
        >
          Reservar
        </button>
      </div>
      {showConfirmation && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded shadow-lg">
          <p>¡Reserva realizada con éxito! Verifica el estado de la reserva en el ícono en la parte superior derecha.</p>
        </div>
      )}
    </div>
  );
};

export default RutaCard;
