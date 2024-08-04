import React from 'react';
import { Video } from './Video';

export const PaginaPrincipal = () => {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center bg-blue-900 text-white overflow-hidden">
      {/* Fondo de video */}
      <div className="absolute inset-0">
        <Video />
      </div>

      {/* Contenido sobre el video */}
      <div className="relative z-10 text-right max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeInUp">
          Bienvenido a ViajeXpress
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fadeInUp delay-100">
          Tu mejor opción para un transporte seguro y confiable. <br />
          Explora nuestras rutas y servicios.
        </p>
        <a href="/servicios">
          <button className="px-6 py-3 rounded-lg bg-yellow-500 text-blue-900 font-semibold border-none shadow-lg hover:bg-yellow-400 transition duration-300">
            Ver Servicios
          </button>
        </a>
      </div>
    </div>
  );
}
