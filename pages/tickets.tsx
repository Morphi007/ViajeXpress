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

  const handleComprar = () => {
    if (!session) {
      alert("Por favor, inicia sesión para comprar un ticket.");
      signIn(); // Redirige a la página de inicio de sesión
      return;
    }

    if (ticket.origen === ticket.destino) {
      alert("Error: El origen y el destino no pueden ser el mismo.");
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
      (ticketReservado)
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
