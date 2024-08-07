import Image from "next/image";

export const TicketCard = ({ ticket, onEliminar }: { ticket: any, onEliminar: any }) => {
    return (
      <div className="bg-white border rounded-lg overflow-hidden shadow-md">
        <div className="relative w-full h-40">
          <Image 
            fill
            style={{objectFit: "cover"}}
            src="https://static.vecteezy.com/system/resources/previews/006/067/026/non_2x/bus-cartoon-illustration-free-vector.jpg" 
            alt="Bus" 
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{ticket.origen} - {ticket.destino}</h3>
          <p className="text-sm mb-1"><strong>Fecha:</strong> {ticket.fecha}</p>
          <p className="text-sm mb-1"><strong>Precio:</strong> {ticket.Precio} DOP</p>
          <p className="text-sm mb-1"><strong>Impuesto:</strong> {ticket.inpuesto}</p>
          <p className="text-sm mb-1"><strong>Total:</strong> {ticket.Total} DOP</p>
          <p className="text-sm mb-1"><strong>Pasajeros:</strong> {ticket.pasajeros}</p>
          <p className="text-sm mb-3"><strong>Horario:</strong> {ticket.horarioSeleccionado}</p>
          <button 
            className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            onClick={() => onEliminar(ticket.id)}
          >
            Cancelar Reserva
          </button>
        </div>
      </div>
    );
  };
  