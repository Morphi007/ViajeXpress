import React, { useState } from 'react';
import axios from 'axios';
import { ExpressLayout } from '@/components/layout';

const Contactos = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSent(false);
    setError(null);

    try {
      await axios.post('/api/send-email', {
        to: formData.email,
        subject: 'Confirmación de Recepción de Mensaje',
        text: 'Gracias por contactarnos. Hemos recibido tu mensaje y un representante se pondrá en contacto contigo pronto.',
      });
      setSent(true);
      setFormData({ nombre: '', email: '', mensaje: '' }); // Limpiar el formulario
    } catch (err) {
      setError('Hubo un error al enviar el mensaje.');
    } finally {
      setSending(false);
    }
  };

  return (
    <ExpressLayout title="Contacto">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white pt-12 pb-1">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 animate-fadeInUp">Contacto</h2>
          <p className="mb-8 text-xl animate-fadeInUp text-justify delay-100">
            ¿Tienes alguna pregunta o necesitas más información sobre nuestros servicios? No dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte!
          </p>
        </div>

        <div className="bg-blue-900 py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8 text-white">Formulario de Contacto</h3>
          <div className="animate-fadeInUp delay-200 max-w-screen-md mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-lg font-semibold mb-2">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-semibold mb-2">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu correo electrónico"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mensaje" className="block text-lg font-semibold mb-2">Mensaje</label>
                <textarea
                  id="mensaje"
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Tu mensaje"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white border-none cursor-pointer"
              >
                {sending ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
              {sent && <p className="mt-4 text-green-600">¡Mensaje enviado con éxito!</p>}
              {error && <p className="mt-4 text-red-600">{error}</p>}
            </form>
          </div>
        </div>

        <div className="bg-white py-12 text-center">
          <h3 className="text-3xl font-semibold mb-8">Información de Contacto</h3>
          <div className="animate-fadeInUp delay-300 max-w-screen-md mx-auto">
            <p className="text-lg mb-4">
              Puedes contactarnos a través de los siguientes medios:
            </p>
            <p className="text-lg mb-4">
              <strong>Teléfono:</strong> +1 (123) 456-7890
            </p>
            <p className="text-lg mb-4">
              <strong>Correo Electrónico:</strong> contacto@viajexpress.com
            </p>
            <p className="text-lg">
              <strong>Dirección:</strong> 123 Calle Principal, Ciudad, País
            </p>
          </div>
        </div>
      </div>
    </ExpressLayout>
  );
};

export default Contactos;
