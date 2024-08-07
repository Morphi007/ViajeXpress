import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { WithId, Document } from 'mongodb';

// Define la interfaz para las rutas
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

// Manejador de la solicitud GET para obtener rutas
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Conéctate a la base de datos
    const client = await clientPromise;
    const db = client.db('ViajeXpress'); // Cambia 'ViajeXpress' al nombre de tu base de datos
    const collection = db.collection('Rutas'); // Cambia 'Rutas' al nombre de tu colección

    // Consulta todas las rutas
    const documentos: WithId<Document>[] = await collection.find({}).toArray();

    // Convierte los documentos a la interfaz Ruta
    const rutas: Ruta[] = documentos.map(doc => ({
      nombre: doc.nombre,
      parada: doc.parada,
      mapa: doc.mapa,
      precio: doc.precio,
      location: doc.location,
      horarios: doc.horarios,
    }));

    // Devuelve las rutas en formato JSON
    res.status(200).json(rutas);
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    res.status(500).json({ error: 'Error al obtener las rutas' });
  }
}
