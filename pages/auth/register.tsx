import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import AuthLayout from '@/components/layout/AuthLayout';
import { getSession, signIn } from 'next-auth/react';
import { AuthContext } from '@/context/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { validation } from '@/utils';

type FormData = {
  Email: string;
  Password: string;
  ConfirmPassword: string;
  Firstname: string;
  Lastname: string;
  Address: string;
  Sector: string;
};

const RegisterPage = ({}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const onRegisterForm = async ({
    Email,
    Password,
    Firstname,
    Lastname,
    Address,
    Sector,
  }: FormData) => {
    setShowError(false);
    setIsSubmitting(true);

    const { hasError, message } = await registerUser(
      Email,
      Password,
      Firstname,
      Lastname,
      Address,
      Sector
    );

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);

    if (hasError) {
      setFailedAttempts(failedAttempts + 1);
      if (failedAttempts >= 4) {
        location.reload();
      }
      setShowError(false);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(true);
      }, 3000);
      return;
    }

    signIn('credentials', { Email, Password });
  };

  const passwords = watch('Password');

  return (
    <AuthLayout title={'register'}>
      <div
        className="flex h-screen bg-cover"
        style={{ backgroundImage: `url(/images/register.png)` }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <div className="w-full max-w-fit p-3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600 ">
                Registrarse
              </h2>
              <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <div className="grid grid-cols-2 gap-3">
                  <div className="mb-4">
                    <label
                      htmlFor="Firstname"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Primer nombre
                    </label>
                    <input
                      type="text"
                      id="Firstname"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                        errors.Lastname && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('Firstname', {
                        required: 'Este campo es requerido',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      })}
                    />
                    {errors.Firstname && (
                      <p className="text-red-500 text-sm mt-1">{errors.Firstname.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Lastname"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="Lastname"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                        errors.Lastname && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('Lastname', {
                        required: 'Este campo es requerido',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      })}
                    />
                    {errors.Lastname && (
                      <p className="text-red-500 text-sm mt-1">{errors.Lastname.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Sector"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Sector
                    </label>
                    <select
                      id="Sector"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white ${
                        errors.Sector && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('Sector', {
                        required: 'Este campo es requerido',
                      })}
                      style={{ color: 'black' }}
                    >
                      <option value="--Sector--">--Sector--</option>
                      <option value="Alma Rosa II">Alma Rosa II</option>
                      <option value="Ana Teresa Balaguer">Ana Teresa Balaguer</option>
                      <option value="Arismar">Arismar</option>
                      <option value="Barrio Ámbar">Barrio Ámbar</option>
                      <option value="Barrio La Isla">Barrio La Isla</option>
                      <option value="Brisas del Este">Brisas del Este</option>
                      <option value="Brisas del Edén">Brisas del Edén</option>
                      <option value="Cansino Adentro">Cansino Adentro</option>
                      <option value="Corales del Este">Corales del Este</option>
                    </select>
                    {errors.Sector && (
                      <p className="text-red-500 text-sm mt-1">{errors.Sector.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Address"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Dirección
                    </label>
                    <input
                      type="text"
                      id="Address"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                        errors.Address && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('Address', {
                        required: 'Este campo es requerido',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                      })}
                    />
                    {errors.Address && (
                      <p className="text-red-500 text-sm mt-1">{errors.Address.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Email"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="Email"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                        errors.Email && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('Email', {
                        required: 'este campo es requerido',
                        validate: validation.isEmail,
                      })}
                    />
                    {errors.Email && (
                      <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
                    )}
                    {showError && errorMessage === 'El correo electrónico ya está registrado' && (
                      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="Password"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="Password"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                        errors.Password && 'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('Password', {
                        required: 'Este campo es requerido',
                        minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                      })}
                    />
                    {errors.Password && (
                      <p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="ConfirmPassword"
                      className="block mb-2 text-sm font-medium"
                      style={{ color: '#1e3a8a' }}
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      id="ConfirmPassword"
                      className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
                        errors.ConfirmPassword &&
                        'focus:border-red-500 focus:ring-red-500 border-red-500'
                      }`}
                      required
                      {...register('ConfirmPassword', {
                        required: 'Este campo es requerido',
                        validate: (value) =>
                          value === passwords || 'Las contraseñas no son iguales',
                      })}
                    />
                    {errors.ConfirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.ConfirmPassword.message}</p>
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
    </AuthLayout>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
