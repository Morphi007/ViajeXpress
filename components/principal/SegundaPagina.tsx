export const SegundaPagina = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-12 pb-1">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 animate-fadeInUp">Sobre Nosotros</h2>
        <p className="mb-8 text-xl animate-fadeInUp text-justify delay-100">
          En ViajeXpress, nos dedicamos a proporcionar servicios de transporte seguros y confiables. Nuestro equipo de profesionales está comprometido con la satisfacción del cliente, ofreciendo soluciones de transporte adaptadas a sus necesidades.
        </p>
      </div>
      <div className="bg-blue-900 py-12 text-center">
        <h3 className="text-3xl font-semibold mb-8 text-white">Nuestra Misión</h3>
        <div className="animate-fadeInUp delay-200 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <video className="w-full max-w-md h-auto rounded-lg shadow-lg mx-auto" controls>
            <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
            Tu navegador no admite la reproducción de videos.
          </video>
          <div className="text-center text-justify md:ml-4">
            <p className="mt-2 text-white text-xl">
              Proporcionar un servicio de transporte seguro, confiable y eficiente para todos nuestros clientes.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white py-12 text-center">
        <h3 className="text-3xl font-semibold mb-8 text-black">Nuestra Visión</h3>
        <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <video className="w-full max-w-md h-auto rounded-lg shadow-lg mx-auto" controls>
            <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
            Tu navegador no admite la reproducción de videos.
          </video>
          <div className="text-center text-justify md:ml-4">
            <p className="mt-2 text-black text-xl">
              Nuestra misión es brindar un servicio de transporte seguro, confiable y eficiente que supere las expectativas de nuestros clientes.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-900 py-12 text-center">
        <h3 className="text-3xl font-semibold mb-8 text-white">Nuestros Valores</h3>
        <div className="animate-fadeInUp delay-300 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <video className="w-full max-w-md h-auto rounded-lg shadow-lg mx-auto" controls>
            <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
            Tu navegador no admite la reproducción de videos.
          </video>
          <div className="text-center text-justify md:ml-4">
            <p className="mt-2 text-white text-xl">
              En ViajeXpress, valoramos el compromiso con nuestros clientes, la responsabilidad en cada uno de nuestros servicios y la excelencia en todas nuestras operaciones.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white py-12 text-center">
        <h3 className="text-3xl font-semibold mb-8">Nuestro Equipo</h3>
        <div className="animate-fadeInUp delay-400 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <video className="w-full max-w-md h-auto rounded-lg shadow-lg mx-auto" controls>
            <source src="/static/videos/background-dcd83f3543f82097b3db11c373070798.webm" type="video/webm" />
            Tu navegador no admite la reproducción de videos.
          </video>
          <div className="text-center text-justify md:ml-4 mt-10">
            <p className="mt-2 text-xl">
              Un equipo de profesionales dedicados a proporcionar el mejor servicio de transporte.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
