  // pages/reset-password.tsx
  import React, { useState } from 'react';
  import AuthLayout from '@/components/layout/AuthLayout';
  import { useForm } from 'react-hook-form';
import router from 'next/router';

  type FormData = {
    newPassword: string;
    confirmPassword: string;
  };

  const ResetPasswordPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
    const [message, setMessage] = useState('');

    const newPassword = watch('newPassword');

    const onSubmit = async (data: FormData) => {
      const { newPassword } = data;
    
      // Aquí deberías extraer el token de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
    
      if (!token) {
        setMessage('Token de restablecimiento inválido.');
        return;
      }
    
      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, newPassword }),
        });
    
        const result = await response.json();
        if (response.ok) {
          setMessage('Tu contraseña ha sido restablecida con éxito.');
          setTimeout(() => router.push('/auth/login'), 2000);
        } else {
          setMessage(result.message || 'Error al restablecer la contraseña.');
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        setMessage('Error al restablecer la contraseña.');
      }
    };
    

    return (
      <AuthLayout title="Restablecer Contraseña">
        <section className="flex flex-col h-screen items-center justify-center">
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
              <div className="mt-4">
                <label htmlFor="confirmPassword" className="block text-black font-semibold">Confirmar Contraseña</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirma tu nueva contraseña"
                  className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2"
                  {...register('confirmPassword', {
                    required: 'Este campo es requerido',
                    validate: value => value === newPassword || 'Las contraseñas deben coincidir',
                  })}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
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
