// components/RutaCard.tsx
import React from 'react';
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
  total: string;
  passengers: number;
}

interface RutaCardProps {
  route: Route;
}

const RutaCard: React.FC<RutaCardProps> = ({ route }) => {
  const { updateTicketCount } = useTicket();
  const formattedPrice = parseFloat(route.total).toFixed(2);

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
      inpuesto: "0.15%",
      Total: formattedPrice,
      pasajeros: route.passengers,
      horarioSeleccionado: route.origin.horarios[0]
    };

    const existingTickets = JSON.parse(Cookies.get('tickets') || '[]');
    const updatedTickets = [...existingTickets, routeInfo];

    Cookies.set('tickets', JSON.stringify(updatedTickets), { expires: 7 });

    console.log('Ticket reservado:', routeInfo);
    console.log('Total de tickets reservados:', updatedTickets.length);

    updateTicketCount();
  };
  return (
    <div className="border rounded p-4 mb-4 shadow-md">
      <h2 className="text-xl font-bold">{route.origin.nombre} - {route.destination.nombre}</h2>
      <p><strong>Fecha:</strong> {route.date}</p>
      <p><strong>Precio:</strong> {route.precio} DOP</p>
      <p><strong>Impuesto:</strong> (0.15%) </p>
      <p><strong>Total:</strong> {formattedPrice} DOP</p>
      <p><strong>Personas:</strong> {route.passengers}</p>
      <p><strong>Horarios disponibles:</strong> {route.origin.horarios.join(', ')}</p>
      <div className="flex justify-between items-center mt-4">
        <a href={route.origin.mapa} target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            <FaMapMarkerAlt className="inline-block mr-2" /> Ver origen en Google Maps
          </button>
        </a>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleCompra}
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default RutaCard;