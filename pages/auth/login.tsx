import React, { useState } from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

type FormData = {
  Email: string;
  Password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ Email, Password }: FormData) => {
    setShowError(false);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        redirect: false, // No redirige automáticamente
        email: Email,
        password: Password,
        callbackUrl: "/", // Cambia esto a la URL a la que deseas redirigir
      });

      if (result?.error) {
        console.error("Error en el inicio de sesión:", result.error);
        setErrorMessage("Credenciales incorrectas. Inténtalo de nuevo.");
        setShowError(true);
      } else {
        console.log("Inicio de sesión exitoso:");
        window.location.href = "/"; // Redirige al usuario a la página principal o a donde sea necesario
      }
    } catch (error) {
      console.error("Error inesperado:", error);
      setErrorMessage(
        "Error al intentar iniciar sesión. Por favor, inténtelo de nuevo."
      );
      setShowError(true);
    }
  };

  return (
    <AuthLayout title={"Login"}>
      <section className="flex flex-col md:flex-row h-screen items-center">
        {/* Botón para volver a la página principal */}
        <div className="absolute top-4 left-4">
          <Link href="/" legacyBehavior>
            <a className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-full hover:bg-gray-100 transition duration-300 text-center block">
              Volver a inicio
            </a>
          </Link>
        </div>
        <div className="h-screen flex justify-center items-center md:w-1/2 xl:w-2/3">
          <div className="flex justify-center items-center absolute"></div>
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
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <span className="self-center text-2xl font-bold">
                  <span className="blue-xpress">Viaje</span>
                  <span className="purple-xpress">X</span>
                  <span className="blue-xpress">press</span>
                </span>
              </Link>
            </h2>

            <form
              onSubmit={handleSubmit(onLoginUser)}
              noValidate
              className="mt-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-black font-semibold"
                  style={{ color: "#1e3a8a" }} // Cambiado a azul
                >
                  Correo electrónico
                </label>
                {showError && errorMessage && (
                  <div className="text-red-500 mb-2">{errorMessage}</div>
                )}
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa Correo electrónico"
                  className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2 border border-gray-300 focus:border-[#1e3a8a] focus:outline-none focus:ring-[#1e3a8a]" // Cambiado a azul
                  {...register("Email", {
                    required: "Este campo es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  autoComplete="email"
                  autoFocus
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.Email.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-black font-semibold"
                  style={{ color: "#1e3a8a" }} // Cambiado a azul
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  minLength={6}
                  placeholder="Ingresa tu contraseña"
                  className="w-full bg-gray-200 text-black rounded-lg px-4 py-3 mt-2 border focus:border-[#1e3a8a] focus:outline-none focus:bg-white" // Cambiado a azul
                  {...register("Password", {
                    required: "Este campo es requerido",
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                  autoComplete="current-password"
                />
                {errors.Password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.Password.message}
                  </p>
                )}
              </div>

              <div className="text-right mt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-gray-500 hover:text-[#1e3a8a] focus:text-[#1e3a8a] focus:outline-none" // Cambiado a azul
                >
                  ¿Olvidaste la contraseña?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full block bg-[#1e3a8a] hover:bg-[#1c3d73] px-4 py-3 mt-6 rounded-lg font-semibold text-white focus:bg-[#1c3d73] focus:outline-none" // Cambiado a azul
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
                    {" "}
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

export default LoginPage;
