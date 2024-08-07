import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import AuthLayout from '@/components/layout/AuthLayout';
import Image from 'next/image';

type FormData = {
  Email: string;
};

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState('');

  const onSubmit = async ({ Email }: FormData) => {
    setMessage('');
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: Email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Se ha enviado un correo para restablecer tu contraseña.');
      } else {
        setMessage(data.error || 'Ocurrió un error al intentar enviar el correo. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar correo:', error);
      setMessage('Ocurrió un error al intentar enviar el correo. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <AuthLayout title={'Forgot Password'}>
      <section className="flex flex-col md:flex-row h-screen items-center">

        <div className="h-screen flex justify-center items-center md:w-1/2 xl:w-2/3">
          <Image
            src="https://th.bing.com/th/id/R.2d45fc481904f3a7a7ab3a70c7bae65e?rik=otkngh5bpwC5cg&riu=http%3a%2f%2fimageneschidas.mx%2fwp-content%2fuploads%2fim%C3%A1genes-de-autobuses-au-bien-chingonas.jpg&ehk=PQvioLTzNx%2bfftT0yF%2bWSyVrGEWMPhOfxdhmOSD6uaI%3d&risl=&pid=ImgRaw&r=0"
            width={1080}
            height={720}
            alt="imagen Faro de Colon"
            className="obw-full h-full object-cover"
            priority={true}
          />
        </div>

        <div className="md:flex md:w-1/3 bg-white h-screen items-center justify-center w-full px-6 lg:px-16 xl:px-12">
          <div className="w-full h-100">
            <h2 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center text-gray-700">
              <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-bold">
                  <span className="blue-xpress">Viaje</span>
                  <span className="purple-xpress">X</span>
                  <span className="blue-xpress">press</span>
                </span>
              </Link>
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-black font-semibold"
                  style={{ color: '#1e3a8a' }} // Cambiado a azul
                >
                  Correo electrónico
                </label>
                {message && (
                  <div className="text-green-500 mb-2">{message}</div>
                )}
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2 border border-gray-300 focus:border-[#1e3a8a] focus:outline-none focus:ring-[#1e3a8a]" // Cambiado a azul
                  {...register('Email', {
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Correo electrónico inválido',
                    },
                  })}
                  autoComplete="email"
                  autoFocus
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full block bg-[#1e3a8a] hover:bg-[#1c3d73] px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-[#1c3d73] focus:outline-none" // Cambiado a azul
              >
                Enviar correo de restablecimiento
              </button>

              <div className="text-center mt-4">
                <Link href="/auth/login" className="text-sm font-semibold text-gray-500 hover:text-[#1e3a8a] focus:text-[#1e3a8a] focus:outline-none">
                  Volver al inicio de sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
