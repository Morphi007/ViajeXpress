import React from 'react'
import { IoCarOutline, IoLogoFacebook, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white text-center py-6">
      <div className="mb-4 animate-fadeInUp">
        <IoCarOutline size={50} className="mx-auto mb-2 animate-bounce" />
        <h2 className="text-2xl font-bold animate-fadeInUp delay-100">ViajeXpress Ltd.</h2>
        <p className="font-semibold animate-fadeInUp delay-200">Seguro y Confiable</p>
      </div>
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://twitter.com" aria-label="Twitter" title="Twitter" className="text-white hover:text-blue-400 transition-transform transform hover:scale-110">
          <IoLogoTwitter size={24} />
        </a>
        <a href="https://youtube.com" aria-label="YouTube" title="YouTube" className="text-white hover:text-red-500 transition-transform transform hover:scale-110">
          <IoLogoYoutube size={24} />
        </a>
        <a href="https://facebook.com" aria-label="Facebook" title="Facebook" className="text-white hover:text-blue-600 transition-transform transform hover:scale-110">
          <IoLogoFacebook size={24} />
        </a>
      </div>
      <p className="text-sm animate-fadeInUp delay-300">&copy; 2024 ViajeXpress Ltd. Todos los derechos reservados</p>
    </footer>
  )
}

export default Footer
