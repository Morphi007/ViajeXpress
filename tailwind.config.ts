import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Ajuste en la extensión si es necesario
  ],
  theme: {
    extend: {
      
      colors: {
        'c': '#1e3a8a', // Color personalizado
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle farthest-corner at 10% 20%, rgba(176,229,208,1) 42%, rgba(92,202,238,0.41) 93.6%)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-15px)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  darkMode: "class", // Activa el modo oscuro basado en la clase
  plugins: [nextui()], // Asegúrate de que el plugin esté instalado y funcionando
};

export default config;
