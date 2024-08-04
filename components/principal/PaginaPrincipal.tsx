import React from 'react';
import { Video } from './Video';

export const PaginaPrincipal = () => {
  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center bg-blue-900 text-white overflow-hidden">
      {/* Fondo de video */}
      <div className="absolute inset-0">
        <Video />
      </div>

      {/* Contenido sobre el video */}
      <div className="relative z-10 flex flex-col items-end max-w-4xl mx-auto p-4 md:p-8 text-right">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Bienvenido a ViajeXpress
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Tu mejor opción para un transporte seguro y confiable. <br />
          Explora nuestras rutas y servicios.
        </p>
        <a href="/servicios">
          <button className="px-6 py-3 rounded-lg bg-yellow-500 text-blue-900 font-semibold border-none shadow-lg hover:bg-yellow-400 transition duration-300">
            Ver Servicios
          </button>
        </a>
      </div>

      {/* Información o ofertas debajo del video */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 text-center bg-blue-800 text-white mt-8">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Ofertas Especiales</h2>
        <p className="text-lg mb-4">
          ¡Aprovecha nuestras ofertas exclusivas en viajes y servicios! Descubre descuentos especiales y promociones para hacer tu experiencia de transporte aún mejor.
        </p>
        
      </div>
    </div>
  );
}
