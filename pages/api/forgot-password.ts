// pages/api/forgot-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../../utils/email'; // Asegúrate de que la ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const subject = 'Restablecimiento de contraseña';
      const text = `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
          <h2 style="color: #0056b3;">Solicitud de restablecimiento de contraseña</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Hemos recibido una solicitud para restablecer tu contraseña. Si no solicitaste esto, ignora este correo.
          </p>
          <p style="font-size: 16px; line-height: 1.5;">
            <a href="https://tu-dominio.com/reset-password?token=uniqueToken" style="color: #0056b3; text-decoration: none;">Haz clic aquí para restablecer tu contraseña</a>
          </p>
          <p style="font-size: 14px; color: #555;">
            Saludos cordiales,<br>
            El equipo de ViajeXpress
          </p>
        </div>
      `;
      await sendEmail(email, subject, text);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error al enviar correo:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
