import React, { useState, useEffect } from 'react';
import { ExpressLayout } from '@/components/layout';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import SearchForm from '@/components/viaje/SearchForm';
import RutaCard from '@/components/viaje/RutaCard';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

let customIcon: any = null;

interface Ruta {
  nombre: string;
  parada: string;
  mapa: string;
  precio: string;
  location: {
    latitude: number;
    longitude: number;
  };
  horarios: string[];
}

const Viajes = () => {
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([18.735693, -70.162651]);
  const [mapZoom, setMapZoom] = useState(8);
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  });
  const [Rutas, setRutas] = useState<Ruta[]>([]);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    // Fetch rutas from the API
    const fetchRutas = async () => {
      try {
        const response = await fetch("/api/rutas");
        const data = await response.json();
        setRutas(data);
      } catch (error) {
        console.error("Error fetching rutas:", error);
      }
    };

    fetchRutas();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then(mod => {
        customIcon = new mod.Icon({
          iconUrl: '/images/icons/marker-icon.png',
          iconRetinaUrl: '/images/icons/marker-icon-2x.png',
          shadowUrl: '/images/icons/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        });
        setLeafletLoaded(true);
      });
    }
  }, []);

  const handleSearch = (origin: string, destination: string, date: string, passengers: number) => {
    setSearchParams({ origin, destination, date, passengers });
    
    const originRoute = Rutas.find(r => r.nombre.toLowerCase().includes(origin.toLowerCase()));
    const destRoute = Rutas.find(r => r.nombre.toLowerCase().includes(destination.toLowerCase()));

    if (origin.toLowerCase() === destination.toLowerCase()) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 5000); // Ocultar el toast después de 5 segundos
      return;
    }

    if (originRoute && destRoute) {
      setSelectedRoute({
        origin: originRoute,
        precio: originRoute.precio,
        destination: destRoute,
        date: date,
        passengers: passengers,
      });
      const midpoint = [
        (originRoute.location.latitude + destRoute.location.latitude) / 2,
        (originRoute.location.longitude + destRoute.location.longitude) / 2
      ];
      setMapCenter(midpoint as [number, number]);
      setMapZoom(7);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 5000); // Ocultar el toast después de 5 segundos
    }
  };

  return (
    <ExpressLayout title="Reservar tu viaje ">
      <div className="container mx-auto p-4 lg:p-8">
        <h1 className='text-center text-4xl font-bold text-blue-950 mb-8'>Reservar tu viaje en autobús</h1>
        <div className="relative z-10">
          <SearchForm onSearch={handleSearch} />
        </div>
        
        <div className="mt-8 flex flex-col items-center z-10">
          <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
            {selectedRoute ? (
              <RutaCard route={selectedRoute} />
            ) : (
              <p className="text-center text-gray-500">No hay viajes seleccionados.</p>
            )}
          </div>
        </div>
  
        <div className="mt-12 relative z-0">
          {leafletLoaded && (
            <div className="relative bg-blue-500 shadow-lg rounded-lg overflow-hidden z-0">
              <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {selectedRoute && (
                  <>
                    <Marker 
                      position={[selectedRoute.origin.location.latitude, selectedRoute.origin.location.longitude]} 
                      icon={customIcon}
                    >
                      <Popup>{selectedRoute.origin.nombre}</Popup>
                    </Marker>
                    <Marker 
                      position={[selectedRoute.destination.location.latitude, selectedRoute.destination.location.longitude]} 
                      icon={customIcon}
                    >
                      <Popup>{selectedRoute.destination.nombre}</Popup>
                    </Marker>
                    <Polyline positions={[
                      [selectedRoute.origin.location.latitude, selectedRoute.origin.location.longitude],
                      [selectedRoute.destination.location.latitude, selectedRoute.destination.location.longitude]
                    ]} />
                  </>
                )}
              </MapContainer>
            </div>
          )}
        </div>
      </div>
      {showErrorToast && (
        <div className="fixed top-20 right-4 z-50 flex items-center w-full max-w-xs p-4 text-white bg-red-600 rounded-lg shadow-lg" role="alert">
          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-800 rounded-lg">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>
            <span className="sr-only">Warning icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">El origen y el destino no pueden ser el mismo.</div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-600 text-white hover:text-red-200 rounded-lg focus:ring-2 focus:ring-red-300 p-1.5 hover:bg-red-700 inline-flex items-center justify-center h-8 w-8" onClick={() => setShowErrorToast(false)}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
      {showSuccessToast && (
        <div id="toast-success" className="fixed top-20 right-4 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ml-3 text-sm font-normal">Búsqueda exitosa.</div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={() => setShowSuccessToast(false)}>
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </ExpressLayout>
  );
}

export default Viajes;
