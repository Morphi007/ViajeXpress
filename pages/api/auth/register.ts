// pages/api/auth/register.ts

import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { hash } from 'bcryptjs';

type Data = {
  message: string;
};

const registerHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    const { Email, Password, Firstname, Lastname, Address } = req.body;

    // Validate required fields
    if (!Email || !Password || !Firstname || !Lastname || !Address) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    //convert email to lowercase
    const emailLowerCase = Email.toLowerCase();
    // Hash the password
    const hashedPassword = await hash(Password, 12);

    try {
      // Connect to the database
      const client = await clientPromise;
      const db = client.db('ViajeXpress');

      // Check if user already exists
      const existingUser = await db.collection('Users').findOne({ Email });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
      }

      // Create a new user
      await db.collection('Users').insertOne({
        Email: emailLowerCase,
        Password: hashedPassword,
        Firstname,
        Lastname,
        Address,
      });

      return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      console.error('Error en la base de datos', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
};

export default registerHandler;
