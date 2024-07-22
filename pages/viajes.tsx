import React from 'react';
import { useRouter } from 'next/router'; // Asegúrate de instalar next/router si no lo tienes
import { ExpressLayout } from '@/components/layout';

const Viajes = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/metro'); // Ajusta la ruta según corresponda
  };

  return (
    <ExpressLayout title="Viajes">
      <h1>Aqui la pagina de viajes</h1>
      <button onClick={handleRedirect}>Ir a Metro</button>
    </ExpressLayout>
  );
};

export default Viajes;
