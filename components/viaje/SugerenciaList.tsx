import React from 'react';
import { Ruta } from './SearchForm'; // Asegúrate de que la interfaz Ruta está exportada desde SearchForm

interface SugerenciaListProps {
  suggestions: Ruta[];
  onSelect: (suggestion: Ruta) => void;
}

const SugerenciaList: React.FC<SugerenciaListProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="absolute z-10 w-full bg-white shadow-lg rounded mt-2">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion.nombre}
        </div>
      ))}
    </div>
  );
};

export default SugerenciaList;
