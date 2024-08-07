import React, { useEffect, useState } from 'react';
import { ExpressLayout } from "@/components/layout";
import Cookies from 'js-cookie';
import Image from 'next/image';
import { TicketCard } from './TicketCard';
import TicketDetails from './paymet/TicketDetails';

interface TicketInfo {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  Precio: string;
  inpuesto: string;
  Total: string;
  pasajeros: number;
  horarioSeleccionado: string;
}


export default function TickerPage() {
  const [ticketsReservados, setTicketsReservados] = useState<TicketInfo[]>([]);

  useEffect(() => {
    const ticketsCookie = Cookies.get('tickets');
    if (ticketsCookie) {
      setTicketsReservados(JSON.parse(ticketsCookie));
    }
  }, []);

  const handleEliminar = (id: string) => {
    const updatedTickets = ticketsReservados.filter(ticket => ticket.id !== id);
    setTicketsReservados(updatedTickets);
    Cookies.set('tickets', JSON.stringify(updatedTickets));
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Mis Tickets Reservados ({ticketsReservados.length})</h1>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ticketsReservados.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              onEliminar={handleEliminar}
            />
          ))}
        </div>
        {ticketsReservados.length === 0 && (
          <p className="text-center text-gray-500">No hay tickets reservados.</p>
        )}
      </div>
  );
}