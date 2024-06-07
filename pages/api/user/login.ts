import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '@/database';
import { jwt } from '@/utils';
import User from '@/model/User';

type Data =
  | { message: string }
  | {
      token: string;
      user: {
        Email: string;
        Firstname: string;
        role: string;
      };
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      try {
        await loginUser(req, res);
      } catch (error) {
        console.error('Error during login:', error); // Registrar el error en el servidor, pero no en la consola del navegador
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { Email = '', Password = '' } = req.body;

  await db.connect();
  const user = await User.findOne({ Email }).lean();
  await db.disconnect();

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado - Email' });
  }

  const passwordIsValid = bcrypt.compareSync(Password, user.Password!);

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const { role, Firstname, _id } = user;

  const token = jwt.signToken(_id, Email);

  return res.status(200).json({
    token,
    user: {
      Email,
      role,
      Firstname,
    },
  });
};
