import React from 'react';
import { ExpressLayout } from '@/components/layout';
import Image from 'next/image';
import styles from '@/styles/Autobus.module.css';
import rios from '@/public/images/icons/b_rios.jpeg';
import alcarrizos from '@/public/images/icons/b_alcarrizos.jpg';
import churchill from '@/public/images/icons/b_churchill.png';
import kennedy from '@/public/images/icons/b_kennedy.jpg';
import naco from '@/public/images/icons/b_naco.jpg';
import omsa from '@/public/images/icons/b_omsa.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const autobusData = [
    {
        nombre: 'OMSA',
        horarios: [
            { destino: 'Santo Domingo - Higuey', horarios: ['08:00 AM', '10:00 AM', '12:00 PM'] },
            { destino: 'Santo Domingo - Santiago', horarios: ['09:00 AM', '11:00 AM', '01:00 PM'] },
        ],
        imagen: omsa,
        paradas: [
            { position: [18.4712, -69.9117], name: 'Parada OMSA 1' },
            { position: [18.4700, -69.9120], name: 'Parada OMSA 2' },
            { position: [18.4695, -69.9110], name: 'Parada OMSA 3' },
            { position: [18.4680, -69.9090], name: 'Parada OMSA 4' },
        ],
    },
    {
        nombre: 'Corredor Churchill',
        horarios: [
            { destino: 'Parque Mirador Norte - Av. Winston Churchill', horarios: ['06:00 AM', '07:00 AM', '08:00 AM'] },
            { destino: 'Parque Mirador Sur - Av. Winston Churchill', horarios: ['06:30 AM', '07:30 AM', '08:30 AM'] },
        ],
        imagen: churchill,
        paradas: [
            { position: [18.4854, -69.9443], name: 'Parada Churchill 1' },
            { position: [18.4870, -69.9440], name: 'Parada Churchill 2' },
            { position: [18.4885, -69.9445], name: 'Parada Churchill 3' },
        ],
    },
    {
        nombre: 'Corredor Kennedy',
        horarios: [
            { destino: 'Av. John F. Kennedy - Núñez de Cáceres', horarios: ['06:00 AM', '07:00 AM', '08:00 AM'] },
            { destino: 'Av. John F. Kennedy - Máximo Gómez', horarios: ['06:30 AM', '07:30 AM', '08:30 AM'] },
        ],
        imagen: kennedy,
        paradas: [
            { position: [18.4742, -69.9378], name: 'Parada Kennedy 1' },
            { position: [18.4755, -69.9375], name: 'Parada Kennedy 2' },
            { position: [18.4765, -69.9360], name: 'Parada Kennedy 3' },
        ],
    },
    {
        nombre: 'Corredor Los Alcarrizos',
        horarios: [
            { destino: 'Los Alcarrizos - Santo Domingo Este', horarios: ['07:00 AM', '08:00 AM', '09:00 AM'] },
            { destino: 'Los Alcarrizos - Santo Domingo Oeste', horarios: ['07:30 AM', '08:30 AM', '09:30 AM'] },
        ],
        imagen: alcarrizos,
        paradas: [
            { position: [18.4731, -69.9214], name: 'Parada Alcarrizos 1' },
            { position: [18.4745, -69.9200], name: 'Parada Alcarrizos 2' },
            { position: [18.4755, -69.9190], name: 'Parada Alcarrizos 3' },
        ],
    },

    {
      nombre: 'Corredor Los Rios',
      horarios: [
        { destino: 'Los Rios - Centro de los Heroes', horarios: ['06:00 AM', '07:00 AM', '08:00 AM'] },
        { destino: 'Los Rios - Santo Domingo Norte', horarios: ['06:30 AM', '07:30 AM', '08:30 AM'] },
      ],
      imagen: rios,
    },
    {
      nombre: 'Corredor Naco',
      horarios: [
        { destino: 'Naco - Plaza Central', horarios: ['07:00 AM', '08:00 AM', '09:00 AM'] },
        { destino: 'Naco - Av. Abraham Lincoln', horarios: ['07:30 AM', '08:30 AM', '09:30 AM'] },
      ],
      imagen: naco,
    },

];

const Autobuses = () => {
  return (
      <ExpressLayout title="Servicios de Autobuses">
          <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pt-12 pb-1">
              <div className="max-w-screen-xl mx-auto text-center">
                  <h2 className="text-4xl font-bold mb-8 text-blue-600">Servicios de Autobuses</h2>
                  <p className="mb-8 text-xl text-black text-center">
                      Información sobre horarios y destinos de autobuses en República Dominicana.
                  </p>
              </div>
              <section className="bg-gray-100 py-12">
                  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {autobusData.map((autobus, index) => (
                          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden border border-blue-200">
                              <Image src={autobus.imagen} alt={autobus.nombre} className="w-full h-48 object-cover" />
                              <div className="p-6">
                                  <h3 className="text-xl font-semibold mb-4 text-black">{autobus.nombre}</h3>
                                  {autobus.horarios.map((trayecto, index) => (
                                      <div key={index} className="mb-4">
                                          <h4 className="text-lg font-semibold text-black">Destino: {trayecto.destino}</h4>
                                          <p className="text-gray-600">Horarios:</p>
                                          <ul className="list-disc pl-5">
                                              {trayecto.horarios.map((hora, index) => (
                                                  <li key={index} className="text-gray-800">{hora}</li>
                                              ))}
                                          </ul>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Mapa de Paradas */}
              <section className="bg-custom-blue py-12">
                  <div className="max-w-screen-xl mx-auto">
                      <h3 className="text-3xl font-semibold mb-8 text-center text-black">Mapa de Paradas de Autobuses</h3>
                      <MapContainer center={[18.4775, -69.9330]} zoom={13} style={{ height: '500px', width: '100%' }}>
                          <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          {autobusData.flatMap((autobus, index) => 
                              autobus.paradas?.map((parada, paradaIndex) => (
                                  <Marker 
                                      key={paradaIndex} 
                                      position={parada.position as [number, number]} // Asegúrate de que sea una tupla
                                      icon={defaultIcon} // Usa el ícono predeterminado
                                  >
                                      <Popup>{parada.name}</Popup>
                                  </Marker>
                              ))
                          )}
                      </MapContainer>
                  </div>
              </section>
          </div>
      </ExpressLayout>
  );
};

export default Autobuses;