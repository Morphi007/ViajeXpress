import Link from 'next/link'
import React from 'react'
import { IoCarOutline } from 'react-icons/io5'

const Navbar = () => {
  return (
    <nav className="bg-blue-900 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <IoCarOutline size={28} className="text-white" />
            <span className="self-center text-2xl font-bold text-white">
              <span className="blue-xpress">Viaje</span>
              <span className="text-purple-500">X</span>
              <span className="blue-xpress">press</span>
            </span>
          </a>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/" legacyBehavior>
                <a className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Inicio
                </a>
              </Link>
            </li>
            <li>
              <Link href="/servicios" legacyBehavior>
                <a className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Servicios
                </a>
              </Link>
            </li>
            <li>
              <Link href="/viajes" legacyBehavior>
                <a className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Viajes
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about" legacyBehavior>
                <a className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contacto" legacyBehavior>
                <a className="block py-2 px-3 text-white rounded hover:bg-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Contacto
                </a>
              </Link>
            </li>
            <div className="w-px h-6 bg-gray-300 mx-3"></div>
            <Link href='/auth/login' legacyBehavior>
              <a className="block py-2 px-3 text-white border border-white rounded-lg hover:bg-purple-500 md:hover:bg-transparent md:border-0 md:hover:text-purple-500 md:p-0 dark:text-white md:dark:hover:text-purple-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                Iniciar sesión
              </a>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
