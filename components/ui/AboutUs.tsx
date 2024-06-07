import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-12 px-4">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 animate-fadeInUp">Sobre Nosotros</h2>
        <p className="mb-8 text-lg animate-fadeInUp delay-100">
          En ViajeXpress, nos dedicamos a proporcionar servicios de transporte seguros y confiables. Nuestro equipo de profesionales está comprometido con la satisfacción del cliente, ofreciendo soluciones de transporte adaptadas a sus necesidades.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="animate-fadeInUp delay-200">
            <video className="w-full h-auto rounded-lg shadow-lg" controls>
              <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
              Tu navegador no admite la reproducción de videos.
            </video>
            <h3 className="text-xl font-semibold mt-4">Nuestra Misión</h3>
            <p className="mt-2">
              Proporcionar un servicio de transporte seguro, confiable y eficiente para todos nuestros clientes.
            </p>
          </div>
          <div className="animate-fadeInUp delay-300">
            <video className="w-full h-auto rounded-lg shadow-lg" controls>
              <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
              Tu navegador no admite la reproducción de videos.
            </video>
            <h3 className="text-xl font-semibold mt-4">Nuestros Valores</h3>
            <p className="mt-2">
              Compromiso, responsabilidad, y excelencia en cada viaje que realizamos.
            </p>
          </div>
          <div className="animate-fadeInUp delay-400">
            <video className="w-full h-auto rounded-lg shadow-lg" controls>
              <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
              Tu navegador no admite la reproducción de videos.
            </video>
            <h3 className="text-xl font-semibold mt-4">Nuestro Equipo</h3>
            <p className="mt-2">
              Un equipo de profesionales dedicados a proporcionar el mejor servicio de transporte.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
