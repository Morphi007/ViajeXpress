import React from 'react';
import { ExpressLayout } from '@/components/layout';
import Image from 'next/image';
import metroMap from '@/public/images/icons/metroMap.png'; // Asegúrate de que la ruta a la imagen es correcta
import styles from '@/styles/MetroLines.module.css'; // Importa los estilos CSS desde la carpeta styles
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

const MetroLines = () => {
  const metroStationsLine1 = [
    { position: [18.483295, -69.929045], name: 'Centro de los Héroes' },
    { position: [18.489879, -69.942706], name: 'Francisco Alberto Caamaño' },
    { position: [18.492862, -69.951646], name: 'Amin Abel' },
    { position: [18.501432, -69.964406], name: 'Juan Pablo Duarte' },
    { position: [18.503547, -69.970697], name: 'Mamá Tingó' },
    { position: [18.505676, -69.979706], name: 'Santos Demóstenes' },
    { position: [18.507802, -69.987671], name: 'Margarita' },
    { position: [18.509921, -69.996689], name: 'Los Prados' },
    { position: [18.512033, -70.005707], name: 'Concepción Bona' },
  ];

  const metroStationsLine2 = [
    { position: [18.506941, -69.870783], name: 'Station A' },
    { position: [18.511071, -69.885220], name: 'Station B' },
    { position: [18.515253, -69.900047], name: 'Station C' },
    { position: [18.520135, -69.913672], name: 'Station D' },
    { position: [18.524972, -69.928199], name: 'Station E' },
    { position: [18.529853, -69.941924], name: 'Station F' },
  ];

  const telefericoStations = [
    { position: [18.533862, -69.940000], name: 'Teleférico A' },
    { position: [18.538756, -69.955000], name: 'Teleférico B' },
    { position: [18.543679, -69.970000], name: 'Teleférico C' },
  ];

  const metroLine1Coordinates: [number, number][] = metroStationsLine1.map(station => station.position as [number, number]);
  const metroLine2Coordinates: [number, number][] = metroStationsLine2.map(station => station.position as [number, number]);
  const telefericoCoordinates: [number, number][] = telefericoStations.map(station => station.position as [number, number]);

  const mapCenter: [number, number] = [18.483295, -69.929045]; // Coordenadas centrales del mapa
  const mapZoom = 12; // Ajusta el zoom según sea necesario

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

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
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Centro de los Héroes</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Francisco Alberto Caamaño</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Amin Abel</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Juan Pablo Duarte</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Mamá Tingó</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Santos Demóstenes</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Margarita</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Los Prados</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Concepción Bona</td>
        </tr>
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
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Concepción Bona</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Trina de Moya de Vásquez</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Ercilia Pepín</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Juan Pablo Duarte</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">José Francisco Peña Gómez</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Casandra Damirón</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Santo Domingo</td>
        </tr>
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
        <tr>
          <td className="border border-gray-300 px-4 py-2">Teleférico</td>
          <td className="border border-gray-300 px-4 py-2">Oeste</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Teleférico</td>
          <td className="border border-gray-300 px-4 py-2">Este</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Teleférico</td>
          <td className="border border-gray-300 px-4 py-2">Norte</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Teleférico</td>
          <td className="border border-gray-300 px-4 py-2">Sur</td>
        </tr>
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
          <th className="border border-gray-300 px-4 py-2">Tiempo Promedio (min)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">1</td>
          <td className="border border-gray-300 px-4 py-2">Centro de los Héroes</td>
          <td className="border border-gray-300 px-4 py-2">Mamá Tingó</td>
          <td className="border border-gray-300 px-4 py-2">25</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">2</td>
          <td className="border border-gray-300 px-4 py-2">Concepción Bona</td>
          <td className="border border-gray-300 px-4 py-2">Santo Domingo</td>
          <td className="border border-gray-300 px-4 py-2">30</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">Teleférico</td>
          <td className="border border-gray-300 px-4 py-2">Oeste</td>
          <td className="border border-gray-300 px-4 py-2">Norte</td>
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
                <button className="px-6 py-3 rounded-lg bg-blue-600 text-white border-none cursor-pointer animate-bounce">
                  Comprar tickets
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
