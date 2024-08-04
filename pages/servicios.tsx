import React from 'react';
import { ExpressLayout } from '@/components/layout';
import Link from 'next/link';

// Asegúrate de importar el archivo de estilos globales
const Servicios = () => {
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
          <h3 className="text-3xl font-semibold mb-8 text-white">Viajes Disponibles en Autobuses</h3>
          <div className="animate-fadeInUp delay-200 max-w-screen-xl mx-auto flex flex-col items-center">
            <a href="hhttps://www.aeropuertos.net/wp-content/uploads/2016/06/autobus-etn-aeropuerto-guadalajara.jpg" target="_blank" rel="noopener noreferrer">
              <img
                src="https://www.aeropuertos.net/wp-content/uploads/2016/06/autobus-etn-aeropuerto-guadalajara.jpg"
                alt="Viajes en Autobuses"
                className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto"
              />
            </a>
            <p className="mt-4 text-white text-xl">
              Explora nuestras rutas de autobuses con información sobre horarios y destinos.
            </p>
            <br />
            <Link href="/bus">
            
              <button className="px-6 py-3 rounded-lg bg-white text-blue-600 border-none cursor-pointer">
                Más información sobre los viajes en Autobuses
              </button>
            </Link>
            
          </div>
        </section>

        <section className="bg-white py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-black">Líneas del Metro</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col items-center">
          <img
                src="https://th.bing.com/th/id/OIP.ONO6sF4ZGutKlp0ydfDUQQHaFj?rs=1&pid=ImgDetMain"
                alt="Viajes en Autobuses"
                className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto"
              />
              <p className="text-black text-xl mb-4">
              Consulta las líneas del metro, incluyendo rutas, horarios y precios.
            </p>
            <Link href="/metroLines"> 
     
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white border-none cursor-pointer">
                Más información sobre Líneas del Metro
              </button>
            </Link>
         
          </div>
        </section>

        <section className="bg-blue-900 py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white">Información de Paradas</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col items-center">
            <a href="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://appassets.mvtdev.com/map/188/l/5979/22520597/4426479.webp"
                alt="Información de Paradas"
                className="w-full max-w-sm h-auto rounded-lg shadow-lg mx-auto"
              />
            </a>
            <p className="mt-4 text-white text-xl">
              Encuentra información sobre las paradas de autobuses y estaciones de metro cercanas.
            </p>
          </div>
        </section>
      </div>
    </ExpressLayout>
  );
};

export default Servicios;
