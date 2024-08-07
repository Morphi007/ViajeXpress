// pages/reset-password.tsx
import React, { useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import { useForm } from 'react-hook-form';

type FormData = {
  newPassword: string;
};

const ResetPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    // Aquí debes implementar la lógica para actualizar la contraseña en tu base de datos
    // por ejemplo, enviando el token y la nueva contraseña al backend.

    setMessage('Tu contraseña ha sido restablecida con éxito.');
  };

  return (
    <AuthLayout title="Restablecer Contraseña">
      <section className="flex flex-col h-screen items-center">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center">Restablecer Contraseña</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div>
              <label htmlFor="newPassword" className="block text-black font-semibold">Nueva Contraseña</label>
              <input
                type="password"
                id="newPassword"
                placeholder="Ingresa tu nueva contraseña"
                className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2"
                {...register('newPassword', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                })}
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-3 mt-6 rounded-lg font-semibold text-white"
            >
              Restablecer Contraseña
            </button>
            {message && <p className="text-center mt-4">{message}</p>}
          </form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
