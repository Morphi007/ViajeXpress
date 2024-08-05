import React from 'react';
import { ExpressLayout } from '@/components/layout';
import Image from 'next/image';
import metroMap from '@/public/images/icons/metroMap.png';
import styles from '@/styles/MetroLines.module.css';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { useRouter } from 'next/router';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

interface Station {
  position: LatLngExpression; // [number, number] is correct
  name: string;
}
const MetroLines = () => {
  const router = useRouter();

  const metroStationsLine1 = [
    { position: [18.4485912,-69.9310464], name: 'Centro de los Héroes' },
    { position: [18.4555674,-69.9288985], name: 'Francisco Alberto Caamaño' },
    { position: [18.4592362,-69.9213374], name: 'Amin Abel' },
    { position: [18.4645332,-69.9125504], name: 'Joaquin Balaguer' },
    { position: [18.471275,-69.9146264], name: 'Casandra Damiron' },
    { position: [18.4767497,-69.9164504], name: 'Juan Bosh' },
    { position: [18.4816464, -69.916157], name: 'Juan Pablo Duarte' },
    { position: [18.4860822,-69.9169307], name: 'Manuel Arturo Peña' },
    { position: [18.4933965,-69.9175072], name: 'Pedro livio cedeño' },
    { position: [18.4996258,-69.9179792], name: 'Los tainos' },
    { position: [18.5075001,-69.9184392], name: 'Maximo Gomez' },
    { position: [18.5181093,-69.917652], name: 'Hermanas mirabal' },
    { position: [18.5254597,-69.9190513], name: 'José Francisco Peña Gómez' },
    { position: [18.5293425,-69.9109434], name: 'Gregorio Luperón' },
    { position: [18.5395679,-69.9069293], name: 'Gregorio Urbano Gilbert' },
    { position: [18.5466278,-69.9033773], name: 'Mama tingo' },
  ];

  const metroStationsLine2 = [
    { position: [18.4786627,-69.9708294], name: 'María Montez' },
    { position: [18.4798075,-69.9647355], name: 'Pedro Francisco Bonó' },
    { position: [18.4815017,-69.9571663], name: 'Francisco Gregorio Billini' },
    { position: [18.4820105,-69.9491036], name: 'Ulises Francisco Espaillat' },
    { position: [18.4837453,-69.9456489], name: 'Pedro Mir' },
    { position: [18.4825956,-69.9334824], name: 'Freddy Beras Goico' },
    { position: [18.4819393,-69.9230325], name: 'Juan Ulises Garcia Saleta' },
    { position: [18.4816464, -69.916157], name: 'Juan Pablo Duarte' },
    { position: [18.4818222,-69.9093318], name: 'Estación Coronel Rafael Tomás Fernández Domínguez' },
    { position: [18.487495,-69.9074864], name: 'Mauricio Baez' },
    { position: [18.4929335,-69.9018162], name: 'Ramon Cacerez' },
    { position: [18.4957322,-69.89878], name: 'Horacio Vasquez' },
    { position: [18.4997186,-69.8947741], name: 'Manuel De Jesus Galvan' },
    { position: [18.503319,-69.886822], name: 'Eduardo Brito' },
    { position: [18.5099357,-69.8808853], name: 'Ercilia Pepín' },
    { position: [18.5102909,-69.8722928], name: 'Rosa Duarte' },
    { position: [18.5096389,-69.8655259], name: 'Trina de Moya de Vásquez' },
    { position: [18.5051471,-69.8626082], name: 'Concepcion Bona' },
  ];

  const telefericoStations = [
    { position: [18.5047625,-69.8859968], name: 'Teleférico Gualey' },
    { position: [18.5176095,-69.8868502], name: 'Teleférico Tres Brazos' },
    { position: [18.530504,-69.8691087], name: 'Teleférico Sabana Perdida' },
    { position: [18.5434288,-69.8626929], name: 'Teleférico Charles De Gaulle' },
  ];

  const metroLine1Coordinates: [number, number][] = metroStationsLine1.map(station => station.position as [number, number]);
  const metroLine2Coordinates: [number, number][] = metroStationsLine2.map(station => station.position as [number, number]);
  const telefericoCoordinates: [number, number][] = telefericoStations.map(station => station.position as [number, number]);
  
  const mapCenter: [number, number] = [18.483295, -69.929045];
  const mapZoom = 12;

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  const handleButtonClick = () => {
    router.push('/nueva-pagina'); // Redirige a la nueva página de tickets
  };

  return (
    <ExpressLayout title="Líneas del Metro y Teleférico">
      <div className="bg-gray-100 dark:bg-gray-800 py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900 dark:text-white animate-fadeInUp">
            Líneas del Metro y Teleférico de Santo Domingo
          </h1>
          <p className="text-xl text-center mb-8 text-gray-700 dark:text-gray-300 animate-fadeInUp">
            Explora las líneas del metro y el teleférico y encuentra toda la información que necesitas sobre las estaciones y los tiempos de viaje.
          </p>
          <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
                Línea 1 del Metro
              </h2>
              <div className="mb-8 animate-fadeInUp">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-600">
                      <th className="border border-gray-300 px-4 py-2">Línea</th>
                      <th className="border border-gray-300 px-4 py-2">Estaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metroStationsLine1.map((station, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">1</td>
                        <td className="border border-gray-300 px-4 py-2">{station.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
                Línea 2 del Metro
              </h2>
              <div className="mb-8 animate-fadeInUp">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-600">
                      <th className="border border-gray-300 px-4 py-2">Línea</th>
                      <th className="border border-gray-300 px-4 py-2">Estaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metroStationsLine2.map((station, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">2</td>
                        <td className="border border-gray-300 px-4 py-2">{station.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
                Teleférico
              </h2>
              <div className="mb-8 animate-fadeInUp">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-600">
                      <th className="border border-gray-300 px-4 py-2">Línea</th>
                      <th className="border border-gray-300 px-4 py-2">Estaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {telefericoStations.map((station, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">Teleférico</td>
                        <td className="border border-gray-300 px-4 py-2">{station.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
                Tiempos Promedio
              </h2>
              <div className="mb-8 animate-fadeInUp">
                <table className="table-auto w-full border-collapse border border-blue-600">
                  <thead>
                    <tr className="bg-blue-600">
                      <th className="border border-gray-300 px-4 py-2">Línea</th>
                      <th className="border border-gray-300 px-4 py-2">Desde</th>
                      <th className="border border-gray-300 px-4 py-2">Hasta</th>
                      <th className="border border-gray-300 px-4 py-2">Tiempo (min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">1</td>
                      <td className="border border-gray-300 px-4 py-2">Centro de los Héroes</td>
                      <td className="border border-gray-300 px-4 py-2">Concepción Bona</td>
                      <td className="border border-gray-300 px-4 py-2">20</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">2</td>
                      <td className="border border-gray-300 px-4 py-2">María Montez</td>
                      <td className="border border-gray-300 px-4 py-2">Freddy Beras Goico</td>
                      <td className="border border-gray-300 px-4 py-2">25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Teleférico</td>
                      <td className="border border-gray-300 px-4 py-2">Teleférico A</td>
                      <td className="border border-gray-300 px-4 py-2">Teleférico C</td>
                      <td className="border border-gray-300 px-4 py-2">15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative mb-8">
                <Image
                  src={metroMap}
                  alt="Mapa del Metro y Teleférico de Santo Domingo"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 left-0 bg-blue-800 text-white p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">Mapa del Metro y Teleférico</h3>
                  <p className="text-sm">Consulta el mapa para visualizar las rutas y estaciones.</p>
                </div>
              </div>
              <div className="relative mb-8">
                <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {metroStationsLine1.map((station, index) => (
                    <Marker key={index} position={station.position} icon={customIcon}>
                      <Popup>{station.name}</Popup>
                    </Marker>
                  ))}
                  {metroStationsLine2.map((station, index) => (
                    <Marker key={index} position={station.position} icon={customIcon}>
                      <Popup>{station.name}</Popup>
                    </Marker>
                  ))}
                  {telefericoStations.map((station, index) => (
                    <Marker key={index} position={station.position} icon={customIcon}>
                      <Popup>{station.name}</Popup>
                    </Marker>
                  ))}
                  <Polyline positions={metroLine1Coordinates} color="blue" />
                  <Polyline positions={metroLine2Coordinates} color="red" />
                  <Polyline positions={telefericoCoordinates} color="yellow" />
                </MapContainer>
                <div className="absolute bottom-0 left-0 bg-blue-800 text-white p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">Mapa Interactivo del Metro</h3>
                  <p className="text-sm">Consulta el mapa para ver las rutas y estaciones del metro.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                onClick={handleButtonClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Recargar tarjeta del metro
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ExpressLayout>
  );
};

export default MetroLines;
