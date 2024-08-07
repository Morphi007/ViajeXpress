import QRCode from "qrcode.react";
import { ExpressLayout } from '@/components/layout';
import React from "react";
import { IoCarOutline } from "react-icons/io5";
import { encryptStorage } from "@/utils/encryptStorage";

const TripBoardingPass: React.FC = () => {
  const printPage = () => {
    window.print();
  };

  const trip = encryptStorage.getItem("ticketComprado") || {};

  const qrValue = JSON.stringify({
    message: "Ticket Válido",
    id: trip.idTrip,
    origen: trip.origen,
    destino: trip.destino,
    fecha: trip.fecha,
    Horario: trip.horario,
    pasajeros: trip.passengers,
  });

  return (
    <ExpressLayout title={'Ticket Comprado'}>
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-4">
      <div className="p-6 bg-gradient-to-b from-[#1e3a8a] to-[#4590f2] border-b border-gray-200">
        <div className="flex items-center justify-between">
        <IoCarOutline size={28} className="text-white" />
          <p className="font-bold text-white ml-2 text-2xl">
            <span className="blue-xpress">Viaje</span>
            <span className="text-purple-500">X</span>
            <span className="blue-xpress">press</span>
          </p>
          <h1 className="text-2xl font-bold text-blue-400">Boarding Pass</h1>
        </div>
      </div>
      <div className="p-6">
        <div className="text-gray-700 mb-4">
          <p className="text-lg">
            <span className="font-semibold">ID:</span> {trip.idTrip}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Origen:</span> {trip.origen}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Destino:</span> {trip.destino}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Fecha:</span> {trip.fecha}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Horario:</span> {trip.horario}
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Pasajeros
          </h2>
          <ul className="list-disc pl-5 text-gray-700">
            {trip.passengers.map((pasajero:any, index:number) => (
              <li key={index} className="text-lg">
                {pasajero.Firstname} {pasajero.Lastname}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-center">
          <QRCode value={qrValue} size={128} fgColor="#2563eb" />
        </div>
      </div>
      <div className="flex justify-center p-4 bg-gradient-to-b from-[#1e3a8a] to-[#4590f2]">
        <button
          onClick={printPage}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Imprimir
        </button>
      </div>
    </div>
    </ExpressLayout>
  );
};

export default TripBoardingPass;
