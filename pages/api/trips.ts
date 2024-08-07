import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { WithId, Document } from 'mongodb';

// Define la interfaz para las compras
interface Purchase {
  idUser: string;
  idTrip: string;
  origen: string;
  destino: string;
  fecha: string;
  horario: string | null;
  passangers: string[] | null;
  precio: number;
  impuesto: number;
  total: string;
}

// Manejador de la solicitud GET para obtener compras
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Conéctate a la base de datos
    const client = await clientPromise;
    const db = client.db('ViajeXpress');
    const collection = db.collection('Purchases');

    // Consulta todas las compras
    const documentos: WithId<Document>[] = await collection.find({}).toArray();

    // Convierte los documentos a la interfaz Purchase
    const purchases: Purchase[] = documentos.map(doc => ({
      idUser: doc.idUser,
      idTrip: doc.idTrip,
      origen: doc.origen,
      destino: doc.destino,
      fecha: doc.fecha,
      horario: doc.horario,
      passangers: doc.passangers,
      precio: doc.precio,
      impuesto: doc.impuesto,
      total: doc.total,
    }));

    // Devuelve las compras en formato JSON
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
}
