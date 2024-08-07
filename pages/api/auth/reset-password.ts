// pages/api/auth/reset-password.ts

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcryptjs';

type Data = {
  message: string;
};

const resetPasswordHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('ViajeXpress');

      // Buscar el usuario por el token de restablecimiento
      const user = await db.collection('Users').findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Token inválido o expirado' });
      }

      // Hash de la nueva contraseña
      const hashedPassword = await hash(newPassword, 12);

      // Actualizar la contraseña y limpiar el token
      await db.collection('Users').updateOne(
        { resetToken: token },
        { $set: { Password: hashedPassword }, $unset: { resetToken: "", resetTokenExpiry: "" } }
      );

      return res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
    } catch (error) {
      console.error('Error en la base de datos', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};

export default resetPasswordHandler;
