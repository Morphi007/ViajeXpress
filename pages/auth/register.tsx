import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstname: string;
  lastname: string;
  address: string;
};

const RegisterForm = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const passwords = watch('password');

  const onRegisterForm = async (data: FormData) => {
    setShowError(false);
    setIsSubmitting(true);
  
    const { confirmPassword, ...userData } = data; // Excluye confirmPassword al enviar los datos
  
    try {
      const response = await axios.post('/api/auth/register', {
        Email: userData.email,
        Password: userData.password,
        Firstname: userData.firstname,
        Lastname: userData.lastname,
        Address: userData.address,
      });
  
      if (response.data.message === 'Usuario registrado exitosamente') {
        router.push('/auth/login');
      } else {
        setErrorMessage(response.data.message);
        setShowError(true);
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex h-screen bg-cover">
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div className="w-full max-w-fit p-3 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">Registrarse</h2>
            {showError && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
              <div className="grid grid-cols-2 gap-3">
                <div className="mb-4">
                  <label htmlFor="firstname" className="block mb-2 text-sm font-medium" style={{ color: '#1e3a8a' }}>
                    Primer nombre
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                      errors.firstname && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    required
                    {...register('firstname', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                    })}
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="lastname" className="block mb-2 text-sm font-medium" style={{ color: '#1e3a8a' }}>
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                      errors.lastname && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    required
                    {...register('lastname', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                    })}
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block mb-2 text-sm font-medium" style={{ color: '#1e3a8a' }}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                      errors.address && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    required
                    {...register('address', {
                      required: 'Este campo es requerido',
                      minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                    })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium" style={{ color: '#1e3a8a' }}>
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                      errors.email && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    required
                    {...register('email', {
                      required: 'Este campo es requerido',
                      validate: (value: string) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(value) || 'Formato de email inválido';
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium" style={{ color: '#1e3a8a' }}>
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                      errors.password && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    required
                    {...register('password', {
                      required: 'Este campo es requerido',
                      minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium" style={{ color: '#1e3a8a' }}>
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                      errors.confirmPassword && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                    }`}
                    required
                    {...register('confirmPassword', {
                      required: 'Este campo es requerido',
                      validate: (value: any) => value === passwords || 'Las contraseñas no son iguales',
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full px-4 py-3 bg-[#1e3a8a] hover:bg-[#0B2C6D] text-white rounded-lg font-semibold text-lg ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  Registrarse
                </button>
                <div className="flex justify-between mt-2">
                  <Link href="/auth/login" className="text-[#1e3a8a] text-right mt-2">
                    ¿Ya tienes cuenta?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
    </div>
  );
};

export default RegisterForm;


