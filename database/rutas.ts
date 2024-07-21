
// Definición de la interfaz
export interface Location {
  latitude: number;
  longitude: number;
}

export interface Rutas {
  id: number;
  nombre: string;
  parada: string;
  mapa: string;
  precio: string;
  location: Location;
  horarios: string[];
}

// Arreglo de datos
export const Rutas: Rutas[] = [
  {
    id: 1,
    nombre: "Santo Domingo Este. Ruta 27",
    parada: "express Asodema",
    mapa: "https://maps.app.goo.gl/ntZXkc2ZB7r1CggZ7",
    precio: "500",
    location: { latitude: 18.484696, longitude: -69.8951659 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 2,
    nombre: "Azua",
    parada: "express Asodema",
    mapa: "https://maps.app.goo.gl/jT5awa2Fvhx9UJ949",
    precio: "500",
    location: { latitude: 18.4534565, longitude: -70.7349072 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 3,
    nombre: "Express Romana",
    parada: "Parada Central",
    mapa: "https://maps.app.goo.gl/4kmotx9ZmmXSb8Pm9",
    precio: "500",
    location: { latitude: 18.480701, longitude: -69.9001378 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 4,
    nombre: "San Juan",
    parada: "San juan Express",
    mapa: "https://maps.app.goo.gl/KdSxLTDTgw5npgLh6",
    precio: "500",
    location: { latitude: 18.8070633, longitude: -71.22834 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 5,
    nombre: "Santiago de los Caballeros",
    parada: "Express Santiago",
    mapa: "https://maps.app.goo.gl/NdtEvXf5Pf1v9Wfa9",
    precio: "500",
    location: { latitude: 19.4603135, longitude: -70.6878242 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 6,
    nombre: "Puerto Plata",
    parada: "Express Puerto Plata",
    mapa: "https://maps.app.goo.gl/qBhqLJSsU6dai7C8A",
    precio: "600",
    location: { latitude: 19.7920247, longitude: -70.7005526 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 7,
    nombre: "La vega",
    parada: "Express La vega",
    mapa: "https://maps.app.goo.gl/SKVF6Q2NGac4czQ56",
    precio: "600",
    location: { latitude: 19.7920247, longitude: -70.7005526 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 8,
    nombre: "Bayahibe",
    parada: "Express Bayahibe",
    mapa: "https://maps.app.goo.gl/qvxL3BUHa5SeV6KW6",
    precio: "500",
    location: { latitude: 18.4136823, longitude: -68.8710044 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 9,
    nombre: "Peravia",
    parada: "Express Peravia",
    mapa: "https://maps.app.goo.gl/sqg1MMddmaCnNTNY6",
    precio: "500",
    location: { latitude: 18.3513377, longitude: -70.3858077 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  },
  {
    id: 10,
    nombre: "Higüey",
    parada: "Express Higüey",
    mapa: "https://maps.app.goo.gl/7TUUXeieFjP4L5p8A",
    precio: "600",
    location: { latitude: 18.6179999, longitude: -68.7052755 },
    horarios: ["6:00 AM", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  }
];
