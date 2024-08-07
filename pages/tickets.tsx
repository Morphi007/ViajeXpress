import React, { useEffect, useState } from "react";
import { ExpressLayout } from "@/components/layout";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { encryptStorage } from '../utils/encryptStorage';

interface TicketInfo {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  Precio: string;
  pasajeros: number;
}

const TicketCard: React.FC<{
  ticket: TicketInfo;
  onEliminar: (id: string) => void;
  onComprar: (id: string) => void;
}> = ({ ticket, onEliminar, onComprar }) => {
  const { data: session } = useSession();
  const [showWarningToast, setShowWarningToast] = useState(false);

  const handleComprar = () => {
    if (!session) {
      setShowWarningToast(true);
      setTimeout(() => {
        signIn();
      }, 3000);
      return;
    }

    if (ticket.origen === ticket.destino) {
      setShowWarningToast(true);
    } else {
      onComprar(ticket.id);
    }
  };

  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-40">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src="https://static.vecteezy.com/system/resources/previews/006/067/026/non_2x/bus-cartoon-illustration-free-vector.jpg"
          alt="Bus"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {ticket.origen} - {ticket.destino}
        </h3>
        <p className="text-sm mb-1">
          <strong>Fecha:</strong> {ticket.fecha}
        </p>
        <p className="text-sm mb-1">
          <strong>Precio:</strong> {ticket.Precio} DOP
        </p>
        <p className="text-sm mb-1">
          <strong>Pasajeros:</strong> {ticket.pasajeros}
        </p>
        <div className="flex space-x-2 mt-4">
          <button
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded flex justify-center items-center hover:bg-red-600 transition-colors"
            onClick={() => onEliminar(ticket.id)}
          >
            <FaTrash className="w-5 h-5" />
          </button>
          <button
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            onClick={handleComprar}
          >
            Comprar
          </button>
        </div>
      </div>
      {showWarningToast && (
        <div id="toast-warning" className="fixed top-10 right-4 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">Por favor, inicia sesión para comprar un ticket o asegúrate de que el origen y el destino sean diferentes.</div>
          <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={() => setShowWarningToast(false)} aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default function TicketsPage() {
  const [ticketsReservados, setTicketsReservados] = useState<TicketInfo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ticketsCookie = Cookies.get("tickets");
    if (ticketsCookie) {
      setTicketsReservados(JSON.parse(ticketsCookie));
    }
  }, []);

  const handleEliminar = (id: string) => {
    const updatedTickets = ticketsReservados.filter(
      (ticket) => ticket.id !== id
    );
    setTicketsReservados(updatedTickets);
    Cookies.set("tickets", JSON.stringify(updatedTickets));
  };

  const handleComprar = (id: string) => {
    const ticketReservado = ticketsReservados.find(
      (ticket) => ticket.id === id
    );
    if (ticketReservado) {
      encryptStorage.setItem(
        "reserved",
        ticketReservado
      );
      router.push("/ticketDetails");
    }
  };

  return (
    <ExpressLayout title="Tickets Reservados">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Mis Tickets Reservados ({ticketsReservados.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ticketsReservados.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEliminar={handleEliminar}
              onComprar={handleComprar}
            />
          ))}
        </div>
        {ticketsReservados.length === 0 && (
          <p className="text-center text-gray-500">
            No hay tickets reservados.
          </p>
        )}
      </div>
    </ExpressLayout>
  );
}
