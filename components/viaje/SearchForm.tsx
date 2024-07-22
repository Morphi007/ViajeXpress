// SearchForm.tsx

import React, { useState, useEffect, useRef } from 'react';
import { FaExchangeAlt, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { Calendar } from '@nextui-org/react';
import { today, getLocalTimeZone } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import SugerenciaList from './SugerenciaList';
import { Rutas } from '@/database/rutas';
import 'tailwindcss/tailwind.css';

const SearchForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [dates, setDates] = useState(today(getLocalTimeZone()));
  const [passengers, setPassengers] = useState(1);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    if (origin.length > 0) {
      setOriginSuggestions(
        Rutas.filter(ruta => ruta.nombre.toLowerCase().includes(origin.toLowerCase()))
      );
    } else {
      setOriginSuggestions([]);
    }
  }, [origin]);

  useEffect(() => {
    if (destination.length > 0) {
      setDestinationSuggestions(
        Rutas.filter(ruta => ruta.nombre.toLowerCase().includes(destination.toLowerCase()))
      );
    } else {
      setDestinationSuggestions([]);
    }
  }, [destination]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originRef.current && !originRef.current.contains(event.target)) {
        setOriginSuggestions([]);
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target)) {
        setDestinationSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleDateChange = (date) => {
    setDates(date);
    setShowCalendar(false);
  };

  const handleSearch = () => {
    onSearch(origin, destination, dates.toString(), passengers);
  };

  const handleOriginSelect = (suggestion) => {
    setOrigin(suggestion.nombre);
    setOriginSuggestions([]);
  };

  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion.nombre);
    setDestinationSuggestions([]);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 p-4">
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-auto" ref={originRef}>
          <input
            type="text"
            placeholder="Origen"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="border rounded pl-10 pr-4 py-2 w-full md:w-auto"
          />
          <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
          {originSuggestions.length > 0 && (
            <SugerenciaList 
              suggestions={originSuggestions} 
              onSelect={handleOriginSelect} 
            />
          )}
        </div>
        <button
          className="bg-white border rounded-full p-2 mx-2"
          onClick={handleSwap}
        >
          <FaExchangeAlt className="text-blue-500" />
        </button>
        <div className="relative w-full md:w-auto" ref={destinationRef}>
          <input
            type="text"
            placeholder="Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border rounded pl-10 pr-4 py-2 w-full md:w-auto"
          />
          <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500" />
          {destinationSuggestions.length > 0 && (
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
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 md:mt-0 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchForm;
