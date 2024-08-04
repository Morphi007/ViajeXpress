import React from 'react';
import { ExpressLayout } from '@/components/layout';

const Contactos = () => {
  return (
    <ExpressLayout title="Contacto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-12 pb-1">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 animate-fadeInUp">Contacto</h2>
          <p className="mb-8 text-xl animate-fadeInUp text-justify delay-100">
          ¿Tienes alguna pregunta o necesitas más información sobre nuestros servicios? No dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte!
          </p>
        </div>

        <div className="bg-blue-900 py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white">Formulario de Contacto</h3>
          <div className="animate-fadeInUp delay-200 max-w-screen-md mx-auto">
            <form className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-lg font-semibold mb-2">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="block text-lg font-semibold mb-2">Mensaje</label>
                <textarea
                  id="mensaje"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu mensaje"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white border-none cursor-pointer"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8">Información de Contacto</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-md mx-auto">
            <p className="text-lg mb-4">
              Puedes contactarnos a través de los siguientes medios:
            </p>
            <p className="text-lg mb-4">
              <strong>Teléfono:</strong> +1 (123) 456-7890
            </p>
            <p className="text-lg mb-4">
              <strong>Correo Electrónico:</strong> contacto@viajexpress.com
            </p>
            <p className="text-lg">
              <strong>Dirección:</strong> 123 Calle Principal, Ciudad, País
            </p>
          </div>
        </div>
      </div>
    </ExpressLayout>
  );
};

export default Contactos;
