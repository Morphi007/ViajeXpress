
export interface Sugerencia {
    id: number;
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
  