import { useState, useEffect } from "react";
import Hr from "../components/Pay/utils/Hr";
import Input from "../components/Pay/utils/Input";
import Modal from "../components/Pay/Modal";
import PaymentMethodForm from "../components/Pay/Payment";
import { encryptStorage } from "@/utils/encryptStorage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CircularProgress } from "@mui/material";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface Ruta {
  nombre: string;
  parada: string;
  mapa: string;
  precio: string;
  location: {
    latitude: number;
    longitude: number;
  };
  horarios: string[];
}

interface TicketInfo {
  id: string;
  origen: string;
  destino: string;
  fecha: string;
  Precio: string;
  pasajeros: number;
}

export default function TicketDetails() {
  const { id, origen, destino, Precio, fecha, pasajeros } =
    encryptStorage.getItem("reserved") || {};
  const [ticketsReservados, setTicketsReservados] = useState<TicketInfo[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const name = session?.user?.name;
  const [UfirstName, UlastName] = name?.split(" ") || ["", ""];

  const [passengers, setPassengers] = useState<
    { Firstname: string; Lastname: string }[]
  >(
    Array.from({ length: pasajeros }, (_, i) => ({
      Firstname: i === 0 ? UfirstName || "" : "",
      Lastname: i === 0 ? UlastName || "" : "",
    }))
  );

  const handlePassengerChange = (
    index: number,
    field: "Firstname" | "Lastname",
    value: string
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const openModal = () => setShowPaymentModal(true);
  const closeModal = () => setShowPaymentModal(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch rutas from the API
    const fetchRutas = async () => {
      try {
        const response = await fetch("/api/rutas");
        const data = await response.json();
        setRutas(data);
      } catch (error) {
        console.error("Error fetching rutas:", error);
      }
    };

    fetchRutas();
  }, []);

  useEffect(() => {
    const ticketsCookie = Cookies.get("tickets");
    if (ticketsCookie) {
      setTicketsReservados(JSON.parse(ticketsCookie));
    }
  }, []);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const hasTimePassed = (time: string) => {
    const [hourPart, minutePart] = time.split(/:| /);
    const isPM = time.includes("PM");

    let hours = parseInt(hourPart);
    const minutes = parseInt(minutePart);

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0; // 12 AM es 00:00 en formato de 24 horas
    }

    const timeDate = new Date();
    timeDate.setHours(hours);
    timeDate.setMinutes(minutes);
    timeDate.setSeconds(0);
    timeDate.setMilliseconds(0);

    return currentTime > timeDate;
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(Precio) * pasajeros;
    const tax = subtotal * 0.0015;
    return (subtotal + tax).toFixed(2);
  };

  const selectedRoute = rutas.find((route) => route.nombre === origen);

  const handleComprar = () => {
    for (const passenger of passengers) {
      if (!passenger.Firstname || !passenger.Lastname) {
        alert("Por favor ingrese los nombres de todos los pasajeros");
        return;
      }
    }

    if (!selectedTime) {
      alert("Por favor selecciona un horario");
      return;
    }

    openModal();
  };

  const handlePago = async () => {
    closeModal();
    setLoading(true); // Muestra el indicador de carga
    setSuccess(false); // Asegúrate de ocultar el mensaje de éxito

    const ticketComprado = {
      idUser: session?.user?.email,
      idTrip: id,
      origen,
      destino,
      fecha,
      horario: "10:00 AM",
      passengers: [
        {
          Firstname: "Adrian",
          Lastname: "Gonzalez",
        },
      ],
      precio: parseFloat(Precio) * pasajeros,
      impuesto: parseFloat(Precio) * pasajeros * 0.0015,
      total: calculateTotal(),
    };

    try {
      const response = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketComprado),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud de compra");
      }

      const result = await response.json();
      console.log("Compra realizada:", result);

      encryptStorage.setItem("ticketComprado", ticketComprado);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true); // Muestra el mensaje de éxito
      }, 2000);

      // Actualizar el estado de la aplicación
      encryptStorage.removeItem("reserved");

      const updatedTickets = ticketsReservados.filter(
        (ticket) => ticket.id !== id
      );

      setTicketsReservados(updatedTickets);
      Cookies.set("tickets", JSON.stringify(updatedTickets));

      setTimeout(() => {
        router.push("/ticketComprado");
      }, 3000); // Oculta el mensaje de éxito después de 3 segundos
    } catch (error) {
      console.error("Error en la compra:", error);
      setLoading(false);
      alert("Error en la compra. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <CircularProgress size={60} />
        </div>
      )}
      {success && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">
              Pago Realizado
            </h2>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-[#1e3a8a] to-[#4590f2] p-4 min-h-screen">
        <div className="container mx-auto p-4 max-w-3xl bg-white bg-opacity-75 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold font-serif text-center">
            Detalles del viaje
          </h2>
          <Hr />

          <h3 className="text-lg mb-2 font-serif text-center">
            Ingresa la información del Pasajero
          </h3>

          <p className="font-mono text-sm text-stone-600 text-center">
            Los nombres deben escribirse exactamente como aparecen en la
            identificación con fotografía del pasajero.
          </p>

          <form className="mt-6">
            {passengers.map((passenger, index) => (
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
                    value={passenger.Firstname}
                    onChange={(e) =>
                      handlePassengerChange(index, "Firstname", e.target.value)
                    }
                    id={`first_name_${index}`}
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="text"
                    value={passenger.Lastname}
                    onChange={(e) =>
                      handlePassengerChange(index, "Lastname", e.target.value)
                    }
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
                    onClick={() =>
                      !hasTimePassed(time) && handleTimeClick(time)
                    } // Prevent clicking if time has passed
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
                <span>Pasajero (x{pasajeros}) </span>
                <span>${parseFloat(Precio) * pasajeros} </span>
              </div>
              <div className="flex justify-between my-1">
                <span>Sub-total </span>
                <span>${parseFloat(Precio) * pasajeros} </span>
              </div>
              <div className="flex justify-between my-1">
                <span>Impuesto (0.15%)</span>
                <span>
                  ${(parseFloat(Precio) * pasajeros * 0.0015).toFixed(2)}
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
            <Link
              href="/tickets"
              className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:focus:ring-yellow-900"
            >
              Volver
            </Link>
            <button
              type="button"
              onClick={handleComprar}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Continue
            </button>
          </div>
        </div>
        {showPaymentModal && (
          <Modal onClose={closeModal}>
            <PaymentMethodForm onPay={handlePago} />
          </Modal>
        )}
      </div>
    </>
  );
}
