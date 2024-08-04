import React from 'react';
import { ExpressLayout } from '@/components/layout'; // Asegúrate de que ExpressLayout esté importado correctamente
import styles from '@/styles/Autobus.module.css'; 
import Image from 'next/image';// Importa los estilos CSS desde la carpeta styles
import rios from '@/public/images/icons/b_rios.jpeg'; 
import alcarrizos from '@/public/images/icons/b_alcarrizos.jpg'; 
import churchill from '@/public/images/icons/b_churchill.png'; 
import kennedy from '@/public/images/icons/b_kennedy.jpg'; 
import naco from '@/public/images/icons/b_naco.jpg'; 
import omsa from '@/public/images/icons/b_omsa.png'; 

const autobusData = [
    {
      nombre: 'OMSA',
      horarios: [
        { destino: 'Santo Domingo - Higuey', horarios: ['08:00 AM', '10:00 AM', '12:00 PM'] },
        { destino: 'Santo Domingo - Santiago', horarios: ['09:00 AM', '11:00 AM', '01:00 PM'] },
      ],
      imagen: omsa,
    },
    {
      nombre: 'Corredor Churchill',
      horarios: [
        { destino: 'Parque Mirador Norte - Av. Winston Churchill', horarios: ['06:00 AM', '07:00 AM', '08:00 AM'] },
        { destino: 'Parque Mirador Sur - Av. Winston Churchill', horarios: ['06:30 AM', '07:30 AM', '08:30 AM'] },
      ],
      imagen: churchill,
    },
    {
      nombre: 'Corredor Kennedy',
      horarios: [
        { destino: 'Av. John F. Kennedy - Núñez de Cáceres', horarios: ['06:00 AM', '07:00 AM', '08:00 AM'] },
        { destino: 'Av. John F. Kennedy - Máximo Gómez', horarios: ['06:30 AM', '07:30 AM', '08:30 AM'] },
      ],
      imagen: kennedy,
    },
    {
      nombre: 'Corredor Los Alcarrizos',
      horarios: [
        { destino: 'Los Alcarrizos - Santo Domingo Este', horarios: ['07:00 AM', '08:00 AM', '09:00 AM'] },
        { destino: 'Los Alcarrizos - Santo Domingo Oeste', horarios: ['07:30 AM', '08:30 AM', '09:30 AM'] },
      ],
      imagen: alcarrizos,
    },
    {
      nombre: 'Corredor Los Rios',
      horarios: [
        { destino: 'Los Rios - Centro de los Heroes', horarios: ['06:00 AM', '07:00 AM', '08:00 AM'] },
        { destino: 'Los Rios - Santo Domingo Norte', horarios: ['06:30 AM', '07:30 AM', '08:30 AM'] },
      ],
      imagen: rios,
    },
    {
      nombre: 'Corredor Naco',
      horarios: [
        { destino: 'Naco - Plaza Central', horarios: ['07:00 AM', '08:00 AM', '09:00 AM'] },
        { destino: 'Naco - Av. Abraham Lincoln', horarios: ['07:30 AM', '08:30 AM', '09:30 AM'] },
      ],
      imagen: naco,
    },
  ];

  const Autobuses = () => {
    return (
      <ExpressLayout title="Servicios de Autobuses">
        <div className={styles.autobusContainer}>
          <h3 className={styles.autobusTitle}>Servicios de Autobuses</h3>
          <p className={styles.autobusIntro}>
            Información sobre horarios y destinos de autobuses en República Dominicana.
          </p>
          <div className={styles.autobusContent}>
            {autobusData.map((autobus, index) => (
              <div key={index} className={styles.autobus}>
                <Image src={autobus.imagen} alt={autobus.nombre} className={styles.autobusImage} />
                <h2>{autobus.nombre}</h2>
                {autobus.horarios.map((trayecto, index) => (
                  <div key={index} className={styles.trayecto}>
                    <h3>Destino: {trayecto.destino}</h3>
                    <p>Horarios:</p>
                    <ul>
                      {trayecto.horarios.map((hora, index) => (
                        <li key={index}>{hora}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </ExpressLayout>
    );
  };

export default Autobuses;