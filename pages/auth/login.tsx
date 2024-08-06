import React, { useContext, useState } from 'react';
import AuthLayout from '@/components/layout/AuthLayout';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, getSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { validation } from '@/utils';
import { GetServerSideProps } from 'next';
import { AuthContext } from '@/context/auth';

type FormData = {
	Email: string;
	Password: string;
};

const LoginPage = () => {
	const { loginUser } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);
	const [failedAttempts, setFailedAttempts] = useState(0);

	const onLoginUser = async ({ Email, Password }: FormData) => {
		setShowError(false);
		const isValidLogin = await loginUser(Email, Password);

		if (!isValidLogin) {
			setFailedAttempts(failedAttempts + 1);
			if (failedAttempts >= 4) {
				location.reload();
			}
			setShowError(true);
			setTimeout(() => setShowError(false), 8000);
			return;
		}

		signIn('credentials', { Email, Password });
	};

	return (
		<AuthLayout title={'login'}>
			<section className="flex flex-col md:flex-row h-screen items-center">
			 {/* Botón para volver a la página principal */}
			 <div className="absolute top-4 left-4">
          <Link href="/" legacyBehavior>
            <a className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-700 transition duration-300">
              Volver a inicio
            </a>
          </Link>
        </div>
				<div className="h-screen flex justify-center items-center md:w-1/2 xl:w-2/3">
					<div className="flex justify-center items-center absolute"></div>
					<Image
						src={"https://th.bing.com/th/id/R.2d45fc481904f3a7a7ab3a70c7bae65e?rik=otkngh5bpwC5cg&riu=http%3a%2f%2fimageneschidas.mx%2fwp-content%2fuploads%2fim%C3%A1genes-de-autobuses-au-bien-chingonas.jpg&ehk=PQvioLTzNx%2bfftT0yF%2bWSyVrGEWMPhOfxdhmOSD6uaI%3d&risl=&pid=ImgRaw&r=0"}
						width={1080}
						height={720}
						alt="imagen Faro de Colon"
						className="obw-full h-full object-cover"
						priority={true}
					/>
				</div>

				<div className=" md:flex md:w-1/3 bg-white h-screen items-center justify-center w-full px-6 lg:px-16 xl:px-12">
					<div className="w-full h-100">
						<h2 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-center text-gray-700">
							<a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
								<span className="self-center text-2xl font-bold">
									<span className="blue-xpress">Viaje</span>
									<span className="purple-xpress">X</span>
									<span className="blue-xpress">press</span>
								</span>
							</a>
						</h2>

						<form onSubmit={handleSubmit(onLoginUser)} noValidate className="mt-6">
							<div>
								<label
									htmlFor="email"
									className="block text-black font-semibold"
									style={{ color: '#1e3a8a' }} // Cambiado a azul
								>
									Correo electrónico
								</label>
								<div className="text-red-500">{errorMessage}</div>
								<div className="text-red-500">{showError}</div>
								<input
									type="email"
									id="email"
									placeholder="Ingresa Correo electrónico"
									className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2 border border-gray-300 focus:border-[#1e3a8a] focus:outline-none focus:ring-[#1e3a8a]" // Cambiado a azul
									{...register('Email', {
										required: 'Este campo es requerido',
										validate: validation.isEmail,
									})}
									autoComplete="email"
									autoFocus
								/>
								{errors.Email && (
									<p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
								)}
							</div>

							<div className="mt-4">
								<label
									htmlFor="password"
									className="block text-black font-semibold"
									style={{ color: '#1e3a8a' }} // Cambiado a azul
								>
									Contraseña
								</label>
								<input
									type="password"
									id="password"
									minLength={6}
									placeholder="Ingresa tu contraseña"
									className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2 border focus:border-[#1e3a8a] focus:outline-none focus:bg-white" // Cambiado a azul
									{...register('Password', {
										required: 'Este campo es requerido',
										minLength: { value: 6, message: 'Mínimo 6 caracteres' },
									})}
									autoComplete="current-password"
								/>
								{errors.Password && (
									<p className="text-red-500 text-sm mt-1">{errors.Password.message}</p>
								)}
								{showError && (
									<p className="text-red-500 text-sm mt-1">
										Credenciales incorrectas. Inténtalo de nuevo.
									</p>
								)}
							</div>
							<div className="text-right mt-2">
								<Link
									href="/forgot-password"
									type="submit"
									className="text-sm font-semibold text-gray-500 hover:text-[#1e3a8a] focus:text-[#1e3a8a] focus:outline-none" // Cambiado a azul
								>
									¿Olvidaste la contraseña?
								</Link>
							</div>

							<button
								type="submit"
								className="w-full block bg-[#1e3a8a]  hover:bg-[#1c3d73] px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-[#1c3d73] focus:outline-none" // Cambiado a azul
							>
								Iniciar sesión
							</button>
							
							<div className="text-center">
								<p className="mt-8 text-gray-500">
									¿Necesitas una cuenta?
									<Link
										href="/auth/register"
										className="text-[#1e3a8a] hover:text-[#1c3d73] font-semibold" // Cambiado a azul
									>
										{' '}
										Crear una cuenta
									</Link>
								</p>
							</div>
							<div className="text-center">
								<p className="text-sm text-gray-500 mt-12">
									&copy; 2024 ViajeXpress Online inicio de sesión
								</p>
							</div>
						</form>
					</div>
				</div>
			</section>
		</AuthLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const session = await getSession({ req });
	console.log({ session });

	const { p = '/' } = query;

	if (session) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default LoginPage;
