// components/viaje/TravelAds.tsx
import React from 'react';

const TravelAds = () => {
  const ads = [
    {
      title: 'Million Miles Giveaway',
      description: 'Participe para ganar 500,000 millas AAdvantage® y un crucero de ensueño para 2',
      imageUrl: 'https://www.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2022/11/rendering-royal-caribbean-internationals-icon-seas-cruise-ship-2871335.jpg', // Asegúrate de tener esta imagen en la carpeta public/images
      link: 'Participe hasta el 30 de septiembre',
    },
    {
      title: 'MIO - Banreservas',
      description: 'Tu seguridad es nuestra prioridad. Activa tu tarjeta MIO online y disfruta de compras seguras y protegidas con tecnología de punta. ¡Regístrate ahora! #MIOBanreservas',
      imageUrl: 'https://i.ytimg.com/vi/_rX8UFaiz3I/maxresdefault.jpg', // Asegúrate de tener esta imagen en la carpeta public/images
      link: 'Regístrate y obtén buena experiencia',
    },
    {
      title: 'vive la emocion de paris 2024',
      description: '¡Gana un viaje a París 2024! Vive la emoción de los Juegos Olímpicos y explora la Ciudad de la Luz. ¡Participa ya!',
      imageUrl: 'https://media.es.wired.com/photos/663d06797a52cc0c56d7b367/16:9/w_2560%2Cc_limit/509208094', // Asegúrate de tener esta imagen en la carpeta public/images
      link: 'Participe hasta el 28 de Julio',
    },
  ];

  return (
    
    <div className="travel-ads p-4 mt-8"> 
     <div className="bottom-line m-2" style={{ width: '100%', height: '2px', background: '#d3d3d3', marginTop: '16px' }}></div>      <h2 className="text-xl font-bold text-blue-950 mb-4">Ofertas especiales de hoy</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad, index) => (
          <div key={index} className="ad-card bg-white p-4 rounded shadow">
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-48 object-cover rounded mb-4" />
            <h3 className="text-lg font-semibold text-blue-950">{ad.title}</h3>
            <p className="text-gray-700">{ad.description}</p>
            <a href="#" className="text-blue-600 hover:underline mt-2 block">{ad.link}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelAds;
