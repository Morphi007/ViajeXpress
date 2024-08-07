import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../../utils/email'; // Asegúrate de que la ruta sea correcta
import SibApiV3Sdk from 'sib-api-v3-sdk'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, subject, text } = req.body;

    try {
      await sendEmail(to, subject, text);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
