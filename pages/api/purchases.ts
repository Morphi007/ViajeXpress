// pages/api/purchase.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { idUser, idTrip, origen, destino, fecha, horario, passangers, precio, impuesto, total } = req.body;

      const client = await clientPromise;
      const db = client.db('ViajeXpress');

      const purchase = {
        idUser,
        idTrip,
        origen,
        destino,
        fecha,
        horario,
        passangers,
        precio,
        impuesto,
        total,
      };

      const result = await db.collection('Purchases').insertOne(purchase);

      res.status(201).json({ message: 'Compra realizada con éxito', data: result });
    } catch (error) {
      console.error('Error al guardar la compra:', error);
      res.status(500).json({ message: 'Error al guardar la compra', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
