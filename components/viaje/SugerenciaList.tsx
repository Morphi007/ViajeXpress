import React from 'react';

// Define el tipo de las props
interface SugerenciaListProps {
  suggestions: Ruta[];
  onSelect: (suggestion: Ruta) => void;
}

// Asegúrate de que Ruta esté importado o definido en el mismo archivo
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

const SugerenciaList: React.FC<SugerenciaListProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="absolute z-10 w-full bg-white shadow-lg rounded mt-2">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion.nombre}
          </div>
        ))
      ) : (
        <div className="px-4 py-2 text-gray-500">No hay sugerencias</div>
      )}
    </div>
  );
};

export default SugerenciaList;
