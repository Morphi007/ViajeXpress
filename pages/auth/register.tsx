import React, { useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import AuthLayout from '@/components/layout/AuthLayout';
//import Preloader from '@/components/preloader/Preloader';
import { getSession, signIn } from 'next-auth/react';
import { AuthContext } from '@/context/auth';
import Link from 'next/link';
import Image from 'next/image';
import Backpic from '/src/public/images/img2.png';
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

		setIsSubmitting(true); // Bloquear el botón al iniciar la solicitud

		const { hasError, message } = await registerUser(
			Email,
			Password,
			Firstname,
			Lastname,
			Address,
			Sector
		);

		setTimeout(() => {
			setIsSubmitting(false); // Desbloquear el botón después de la solicitud
		}, 2000);
		console.log(hasError);
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
	}; // end of function

	const passwords = watch('Password');

	return (
		<AuthLayout title={'register'}>
			<div
				className="flex h-screen bg-cover"
				style={{
					backgroundImage: `url(/images/register.png)`, // Replace with your combined image URL
				}}
			>
				<div className="absolute inset-0 flex flex-col justify-center items-center z-10">
					{/* Registration Form */}
					<div className="w-full max-w-fit p-3 bg-white shadow-md rounded-lg overflow-hidden">
						<div className="p-4">
							<h2 className="text-2xl font-semibold mb-4 text-center text-[#16a34a] ">
								Registrarse
							</h2>
							<form onSubmit={handleSubmit(onRegisterForm)} noValidate>
								<div className="grid grid-cols-2 gap-3">
									{/*nombre */}
									<div className="mb-4">
										<label
											htmlFor="Firstname"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Primer Nombre
										</label>
										<input
											type="text"
											id="Firstname"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
												errors.Lastname &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('Firstname', {
												required: 'Este campo es requerido',
												minLength: { value: 2, message: 'Mínimo 2 caracteres' },
											})}
										/>
										{errors.Firstname && (
											<p className="text-red-500 text-sm mt-1">
												{errors.Firstname.message}
											</p>
										)}
									</div>
									{/*apellido */}

									<div className="mb-4">
										<label
											htmlFor="Lastname"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Apellido
										</label>
										<input
											type="text"
											id="Lastname"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
												errors.Lastname &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('Lastname', {
												required: 'Este campo es requerido',
												minLength: { value: 2, message: 'Mínimo 2 caracteres' },
											})}
										/>
										{errors.Lastname && (
											<p className="text-red-500 text-sm mt-1">
												{errors.Lastname.message}
											</p>
										)}
									</div>

									{/*sector*/}

									<div className="mb-4">
										<label
											htmlFor="Sector"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Sector
										</label>
										<select
											id="Sector"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white ${
												errors.Sector &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('Sector', {
												required: 'Este campo es requerido',
											})}
											style={{ color: 'black' }}
										>
											<option value="--Sector--">--Sector--</option>
											<option value="Alma Rosa II">Alma Rosa II</option>
											<option value="Ana Teresa Balaguer">
												Ana Teresa Balaguer
											</option>
											<option value="Arismar">Arismar</option>
											<option value="Barrio Ámbar">Barrio Ámbar</option>
											<option value="Barrio La Isla">Barrio La Isla</option>
											<option value="Brisas del Este">Brisas del Este</option>
											<option value="Brisas del Edén">Brisas del Edén</option>
											<option value="Cansino Adentro">Cansino Adentro</option>
											<option value="Corales del Este">Corales del Este</option>
										</select>
										{errors.Sector && (
											<p className="text-red-500 text-sm mt-1">
												{errors.Sector.message}
											</p>
										)}
									</div>
									{/*dirrecion*/}
									<div className="mb-4">
										<label
											htmlFor="Address"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Direccion
										</label>
										<input
											type="text"
											id="Address"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
												errors.Address &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('Address', {
												required: 'Este campo es requerido',
												minLength: { value: 2, message: 'Mínimo 2 caracteres' },
											})}
										/>
										{errors.Address && (
											<p className="text-red-500 text-sm mt-1">
												{errors.Address.message}
											</p>
										)}
									</div>

									{/*correo*/}
									<div className="mb-4">
										<label
											htmlFor="Email"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Email
										</label>
										<input
											type="text"
											id="Email"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
												errors.Email &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('Email', {
												required: 'este campo es requerido',
												validate: validation.isEmail,
											})}
										/>
										{errors.Email && (
											<p className="text-red-500 text-sm mt-1">
												{errors.Email.message}
											</p>
										)}
										{showError &&
											errorMessage ===
												'El correo electrónico ya está registrado' && (
												<p className="text-red-500 text-sm mt-1">
													{errorMessage}
												</p>
											)}
									</div>
									{/*contraseña*/}
									<div className="mb-4">
										<label
											htmlFor="Password"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Contraseña
										</label>
										<input
											type="password"
											id="Password"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black ${
												errors.Password &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('Password', {
												required: 'Este campo es requerido',
												minLength: { value: 6, message: 'Mínimo 6 caracteres' },
											})}
										/>
										{errors.Password && (
											<p className="text-red-500 text-sm mt-1">
												{errors.Password.message}
											</p>
										)}
									</div>
									{/*confirmar contraseña*/}
									<div className="mb-4">
										<label
											htmlFor="Confirmar contraseña"
											className="block mb-2 text-sm font-medium"
											style={{ color: '#14532d' }}
										>
											Contraseña
										</label>
										<input
											type="password"
											id="Confirmar contraseña"
											className={`w-full bg-gray-200 rounded-lg px-4 py-3 mt-2 border focus:border-[#14A647] focus:outline-none focus:bg-white text-black  ${
												errors.ConfirmPassword &&
												'focus:border-red-500 focus:ring-red-500 border-red-500'
											}`}
											required
											{...register('ConfirmPassword', {
												required: 'Este campo es requerido',
												minLength: { value: 6, message: 'Mínimo 6 caracteres' },
												validate: (value) =>
													value === passwords || 'la contraseña no coinciden',
											})}
										/>
										{errors.ConfirmPassword && (
											<p className="text-red-500 text-sm mt-1">
												{errors.ConfirmPassword.message}
											</p>
										)}
									</div>

									<div className="col-span-2">
										<button
											type="submit"
											className="w-full block bg-[#14A647] hover:bg-[#0A732F] px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-blue-400 focus:outline-none"
											disabled={isSubmitting} // Deshabilitar el botón cuando se está enviando la solicitud
										>
											{isSubmitting ? (
												<div className="flex items-center justify-center">
													<span className="text-sm md:text-2xl font-bold flex items-center">
														C
														<svg
															stroke="currentColor"
															fill="currentColor"
															stroke-width="0"
															viewBox="0 0 24 24"
															className="animate-spin"
															height="1em"
															width="1em"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
														</svg>
														rgando . . .
													</span>
												</div>
											) : (
												'Registrarse'
											)}
										</button>

										<p className="mt-8 text-center text-black">
											¿Ya tienes una cuenta?
											<Link
												href="/auth/login"
												className="text-[#14A647] hover:text-[#0A732F] font-semibold"
											>
												{' '}
												Inicia sesión{' '}
											</Link>
										</p>
									</div>
									{/* end boton de registro */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</AuthLayout>
	);
};

//RegisterPage.getLayout = (page: React.ReactNode) => null;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const session = await getSession({ req });
	console.log(session);

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

export default RegisterPage;
