import SibApiV3Sdk from 'sib-api-v3-sdk';

// Configura el cliente de Brevo
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error('API key not found');
}
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = apiKey;
const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = {
    to: [{ email: to }],
    sender: { email: 'cynthiaasmar23@gmail.com' }, // Reemplaza con tu dirección de correo
    subject,
    htmlContent
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
