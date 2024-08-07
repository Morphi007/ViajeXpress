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
  
        <div className="mt-12 relative z-0"> {/* Ajusta el margen superior aquí */}
          {leafletLoaded && (
            <div className="relative bg-blue-500 shadow-lg rounded-lg overflow-hidden z-0"> {/* Asegúrate de que el z-index sea menor aquí */}
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
    </ExpressLayout>
  );
}
export default Viajes;
