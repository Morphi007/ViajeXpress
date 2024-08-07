import Hr from "../utils/Hr";
import Input from "../utils/Input";
import { useState, useEffect } from "react";
import { rutas } from "../rutas";
import Modal from "./Modal";
import PaymentMethodForm from "./Payment";

export default function TicketDetails() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const openModal = () => setShowPaymentModal(true);
  const closeModal = () => setShowPaymentModal(false);

  

  const tripDetails = {
    id: "1722661439625",
    origen: "Santo Domingo Este. Ruta 27",
    destino: "Santiago de los Caballeros",
    fecha: "2024-08-03",
    Precio: "500",
    pasajeros: 2,
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const hasTimePassed = (time) => {
    const [hourPart, minutePart] = time.split(/:| /);
    const isPM = time.includes("PM");

    let hours = parseInt(hourPart);
    const minutes = parseInt(minutePart);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0; // 12 AM is 00:00 in 24-hour format
    }

    const timeDate = new Date();
    timeDate.setHours(hours);
    timeDate.setMinutes(minutes);
    timeDate.setSeconds(0);
    timeDate.setMilliseconds(0);

    return currentTime > timeDate;
  };

  const calculateTotal = () => {
    const subtotal = tripDetails.Precio * tripDetails.pasajeros;
    const tax = subtotal * 0.0015;
    return (subtotal + tax).toFixed(2);
  };

  const selectedRoute = rutas.find(
    (route) => route.nombre === tripDetails.origen
  );

  return (
    <div className="bg-custom-gradient p-4 min-h-screen">
      <div className="container mx-auto p-4 max-w-3xl bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold font-serif text-center">
          Detalles del viaje
        </h2>
        <Hr />
 ///de aqui
        <h3 className="text-lg mb-2 font-serif text-center">
          Ingresa la información del Pasajero
        </h3>

        <p className="font-mono text-sm text-stone-600 text-center">
          Los nombres deben escribirse exactamente como aparecen en la
          identificación con fotografía del pasajero.
        </p>

        <form className="mt-6">
          {[...Array(tripDetails.pasajeros)].map((_, index) => (
            <div
              key={index}
              className="grid gap-x-4 gap-y-3 mb-6 md:grid-cols-2"
            >
              <div>
                <label
                  htmlFor={`first_name_${index}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pasajero {index + 1}
                </label>
                <Input
                  type="text"
                  id={`first_name_${index}`}
                  placeholder="Nombre"
                  required
                />
              </div>
              <div>
                <Input
                  type="text"
                  id={`last_name_${index}`}
                  styles="md:mt-7 sm:mt-0"
                  placeholder="Apellido"
                  required
                />
              </div>
            </div>
          ))}
        </form>

        <div className="mb-6">
          <h3 className="text-lg mb-2 font-serif text-center">
            Selecciona un horario
          </h3>
          <div className="flex justify-center flex-wrap gap-2">
            {selectedRoute &&
              selectedRoute.horarios.map((time) => (
                <button
                  key={time}
                  onClick={() => !hasTimePassed(time) && handleTimeClick(time)} // Prevent clicking if time has passed
                  className={`py-2 px-4 rounded-full border ${
                    selectedTime === time
                      ? "bg-blue-500 text-white"
                      : hasTimePassed(time)
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-70" // Styles for disabled button
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  disabled={hasTimePassed(time)} // Disable button if time has passed
                >
                  {time}
                </button>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-2xl font-serif text-center">
            Resumen del viaje
          </h3>
          <Hr />
          <div className="font-light p-2">
            <h4 className="font-medium">A pagar</h4>
            <div className="flex justify-between my-1">
              <span>Pasajero (x{tripDetails.pasajeros}) </span>
              <span>${tripDetails.Precio * tripDetails.pasajeros} </span>
            </div>
            <div className="flex justify-between my-1">
              <span>Sub-total </span>
              <span>${tripDetails.Precio * tripDetails.pasajeros} </span>
            </div>
            <div className="flex justify-between my-1">
              <span>Impuesto (0.15%)</span>
              <span>
                $
                {(tripDetails.Precio * tripDetails.pasajeros * 0.0015).toFixed(
                  2
                )}
              </span>
            </div>
            <hr className="border-stone-700" />
            <div className="flex justify-between my-3">
              <span className="font-light">Total del Viaje: </span>
              <span className="font-light">${calculateTotal()} </span>
            </div>
          </div>
          <Hr />
          <div className="p-2">
            <form>
              <label
                htmlFor="A1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Codigo de Cupon
              </label>
              <div className="flex mt-3">
                <Input
                  type="text"
                  id="A1"
                  placeholder="Coupon Code"
                  styles="max-w-80"
                />
                <button
                  type="button"
                  className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 mx-2 text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  <span className="text-base">Aplicar</span>
                </button>
              </div>
            </form>
          </div>
          <Hr />
        </div>
        <p className="font-mono text-sm text-stone-600 text-center mt-4">
          Por favor revise su compra cuidadosamente. Los boletos no son
          reembolsables.
        </p>
      
        <div className="flex justify-between my-4">
          <button
            type="button"
            className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900"
          >
            Volver
          </button>
          <button
            type="button"
            onClick={openModal}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Continue
          </button>
        </div>
      </div>
      {showPaymentModal && (
          <Modal onClose={closeModal}>
            <PaymentMethodForm />
          </Modal>
        )}
    </div>
  );
}
