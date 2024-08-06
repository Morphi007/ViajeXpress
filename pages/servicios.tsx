import React, { useState } from "react";
import Modal from "react-modal";
import { ExpressLayout } from '@/components/layout';
import Link from 'next/link';

Modal.setAppElement('#__next'); // Important for accessibility

const Servicios = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  const openModal = (src: React.SetStateAction<string>) => {
    setModalImageSrc(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ExpressLayout title="Servicios">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-12 pb-1">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 animate-fadeInUp">Servicios de Transporte</h2>
          <p className="mb-8 text-xl animate-fadeInUp text-justify delay-100">
            Bienvenido a nuestra sección de servicios de transporte. Aquí encontrarás toda la información necesaria sobre nuestros viajes en autobuses, líneas del metro, paradas, y mucho más.
          </p>
        </div>

        
        <section className="bg-blue-900 py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white animate-fadeInUp delay-200">Viajes Disponibles en Autobuses</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col items-center">
            <img
              src="https://www.aeropuertos.net/wp-content/uploads/2016/06/autobus-etn-aeropuerto-guadalajara.jpg"
              alt="Viajes en Autobuses"
              className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto cursor-pointer"
              onClick={() => openModal("https://www.aeropuertos.net/wp-content/uploads/2016/06/autobus-etn-aeropuerto-guadalajara.jpg")}
            />
            <p className="mt-4 text-white text-xl animate-fadeInUp delay-400">
              Explora nuestras rutas de autobuses con información sobre horarios y destinos.
            </p>
            <br />
            <Link href="/bus">
              <button className="px-6 py-3 rounded-lg bg-white text-blue-600 border-none cursor-pointer animate-bounce">
                Más información sobre los viajes en Autobuses
              </button>
            </Link>
          </div>
        </section>

        <section className="bg-white py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-black animate-fadeInUp delay-200">Líneas del Metro</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col items-center">
            <img
              src="https://th.bing.com/th/id/OIP.ONO6sF4ZGutKlp0ydfDUQQHaFj?rs=1&pid=ImgDetMain"
              alt="Líneas del Metro"
              className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto cursor-pointer"
              onClick={() => openModal("https://th.bing.com/th/id/OIP.ONO6sF4ZGutKlp0ydfDUQQHaFj?rs=1&pid=ImgDetMain")}
            />
            <p className="text-black text-xl mb-4 animate-fadeInUp delay-400">
              Consulta las líneas del metro, incluyendo rutas, horarios y precios.
            </p>
            <Link href="/metroLines">
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white border-none cursor-pointer animate-bounce">
                Más información sobre Líneas del Metro
              </button>
            </Link>
          </div>
        </section>

        <section className="bg-blue-900 py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white animate-fadeInUp delay-200">Reserva tus Viajes</h3>
         <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col items-center">
            <img
              src="https://domivia.com.do/wp-content/uploads/2023/07/23424663773_f4538dec7c_b.jpg" // Cambia la URL por una imagen representativa de los viajes
              alt="Viajes"
              className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto cursor-pointer"
              onClick={() => openModal("https://domivia.com.do/wp-content/uploads/2023/07/23424663773_f4538dec7c_b.jpg")}
            />
            <p className="mt-4 text-white text-xl animate-fadeInUp delay-400">
              Descubre todos los destinos y rutas disponibles para tus viajes en autobús.
            </p>
            <br />
            <Link href="/viajes">
              <button className="px-6 py-3 rounded-lg bg-white text-blue-600 border-none cursor-pointer animate-bounce">
                Más información sobre nuestros viajes
              </button>
            </Link>
          </div>
        </section>
      </div>

<section className="bg-white py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-blue animate-fadeInUp delay-200">Información de Paradas</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col items-center">
            <img
              src="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp"
              alt="Información de Paradas"
              className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto cursor-pointer"
              onClick={() => openModal("https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp")}
            />
            <p className="mt-4 text-black text-xl animate-fadeInUp delay-400">
              Encuentra información sobre las paradas de autobuses y estaciones de metro cercanas.
            </p>
          </div>
        </section>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Imagen Modal"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative max-w-3xl mx-auto bg-white p-4 rounded-lg">
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900"
            aria-label="Cerrar modal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <img
            src={modalImageSrc}
            alt="Imagen Modal"
            className="w-full h-auto"
          />
        </div>
      </Modal>
    </ExpressLayout>
  );
};

export default Servicios;
