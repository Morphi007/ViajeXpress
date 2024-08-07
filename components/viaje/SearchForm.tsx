import React, { useState, useEffect, useRef } from 'react';
import { FaExchangeAlt, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Calendar } from '@nextui-org/react';
import { today, getLocalTimeZone } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import SugerenciaList from './SugerenciaList';
import 'tailwindcss/tailwind.css';

// Define la interfaz de Ruta basada en el esquema de la base de datos
interface Ruta {
  _id: string;
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

const SearchForm = ({ onSearch }: { onSearch: (origin: string, destination: string, dates: string, passengers: number) => void }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dates, setDates] = useState(today(getLocalTimeZone()));
  const [passengers, setPassengers] = useState(1);
  const [originSuggestions, setOriginSuggestions] = useState<Ruta[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Ruta[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [originFocused, setOriginFocused] = useState(false);
  const [destinationFocused, setDestinationFocused] = useState(false);

  const originRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await fetch('/api/rutas');
        const data = await response.json();
        if (Array.isArray(data)) {
          setOriginSuggestions(data);
          setDestinationSuggestions(data);
        }
      } catch (error) {
        console.error('Error fetching rutas:', error);
      }
    };

    fetchRutas();
  }, []);

  useEffect(() => {
    if (origin.length > 0) {
      setOriginSuggestions(prevSuggestions =>
        prevSuggestions.filter(ruta => ruta.nombre.toLowerCase().includes(origin.toLowerCase()))
      );
    } else {
      setOriginSuggestions([]);
    }
  }, [origin]);

  useEffect(() => {
    if (destination.length > 0) {
      setDestinationSuggestions(prevSuggestions =>
        prevSuggestions.filter(ruta => ruta.nombre.toLowerCase().includes(destination.toLowerCase()))
      );
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (originRef.current && !originRef.current.contains(event.target as Node) && !originFocused) {
        setShowOriginSuggestions(false);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node) && !destinationFocused) {
        setShowDestinationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [originFocused, destinationFocused]);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleDateChange = (date: typeof dates) => {
    setDates(date);
    setShowCalendar(false);
  };

  const handleSearch = () => {
    onSearch(origin, destination, dates.toString(), passengers);
  };

  const handleOriginSelect = (suggestion: Ruta) => {
    setOrigin(suggestion.nombre);
    setShowOriginSuggestions(false);
  };

  const handleDestinationSelect = (suggestion: Ruta) => {
    setDestination(suggestion.nombre);
    setShowDestinationSuggestions(false);
  };


  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 p-4">
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
        <div
          className="relative w-full md:w-auto"
          ref={originRef}
          onMouseEnter={() => setShowOriginSuggestions(originFocused)}
          onMouseLeave={() => !originFocused && setShowOriginSuggestions(false)}
        >
          <input
            type="text"
            placeholder="Origen"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setShowOriginSuggestions(true);
            }}
            onFocus={() => {
              setOriginFocused(true);
              setShowOriginSuggestions(true);
            }}
            onBlur={() => {
              setOriginFocused(false);
              setTimeout(() => {
                // Ocultar las sugerencias después de un pequeño retraso para permitir la selección
                if (!originSuggestions.find(suggestion => suggestion.nombre === origin)) {
                  setShowOriginSuggestions(false);
                }
              }, 100);
            }}
            className="border rounded pl-10 pr-4 py-2 w-full md:w-auto"
          />
          <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
          {showOriginSuggestions && originSuggestions.length > 0 && (
            <SugerenciaList 
              suggestions={originSuggestions} 
              onSelect={handleOriginSelect} 
            />
          )}
        </div>
        <button
          className="bg-white border rounded-full p-2 mx-2"
          onClick={handleSwap}
          aria-label="Intercambiar origen y destino"
        >
          <FaExchangeAlt className="text-blue-500" />
        </button>
        <div
          className="relative w-full md:w-auto"
          ref={destinationRef}
          onMouseEnter={() => setShowDestinationSuggestions(destinationFocused)}
          onMouseLeave={() => !destinationFocused && setShowDestinationSuggestions(false)}
        >
          <input
            type="text"
            placeholder="Destino"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestinationSuggestions(true);
            }}
            onFocus={() => {
              setDestinationFocused(true);
              setShowDestinationSuggestions(true);
            }}
            onBlur={() => {
              setDestinationFocused(false);
              setTimeout(() => {
                // Ocultar las sugerencias después de un pequeño retraso para permitir la selección
                if (!destinationSuggestions.find(suggestion => suggestion.nombre === destination)) {
                  setShowDestinationSuggestions(false);
                }
              }, 100);
            }}
            className="border rounded pl-10 pr-4 py-2 w-full md:w-auto"
          />
          <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
          {showDestinationSuggestions && destinationSuggestions.length > 0 && (
            <SugerenciaList 
              suggestions={destinationSuggestions} 
              onSelect={handleDestinationSelect} 
            />
          )}
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Fechas"
            value={dates.toString()}
            onClick={() => setShowCalendar(!showCalendar)}
            readOnly
            className="border rounded pl-10 pr-4 py-2 w-full md:w-auto"
          />
          <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 z-50" />
          {showCalendar && (
            <I18nProvider locale="es-ES">
              <div className="absolute z-10 bg-white shadow-lg rounded mt-2 transition ease-out duration-300 transform scale-95">
                <Calendar
                  aria-label="Fecha"
                  defaultValue={dates}
                  minValue={today(getLocalTimeZone())}
                  onChange={handleDateChange}
                />
              </div>
            </I18nProvider>
          )}
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="number"
            placeholder="1 pasajero"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            className="border rounded pl-10 pr-4 py-2 w-full md:w-auto"
          />
          <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          aria-label="Buscar"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
