import SibApiV3Sdk from 'sib-api-v3-sdk';

// Configura el cliente de Brevo
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error('API key not found');
}
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
const sendEmail = async (to: string, subject: string, text: string) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = {
    to: [{ email: to }],
    sender: { email: 'cynthiaasmar23@gmail.com' }, // Reemplaza con tu dirección de correo
    subject,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
        <h2 style="color: #0056b3;">¡Gracias por contactarnos!</h2>
        <p style="font-size: 16px; line-height: 1.5;">
          Hemos recibido tu mensaje y un representante se pondrá en contacto contigo pronto. 
          Mientras tanto, si tienes alguna pregunta adicional, no dudes en responder a este correo.
        </p>
        <p style="font-size: 14px; color: #555;">
          Saludos cordiales,<br>
          El equipo de ViajeXpress
        </p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #aaa;">
          Este es un correo automático. Por favor, no respondas a este mensaje.
        </p>
      </div>
    `,
  };

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
