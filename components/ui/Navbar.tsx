// components/NavbarExpress.tsx
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { IoCarOutline, IoCartSharp, IoTicketOutline } from 'react-icons/io5';
import NextLink from 'next/link';
import { useTicket } from "@/context/auth/TicketContext";

const NavbarExpress = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ticketCount } = useTicket();

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Tickets", href: "/viajes" },
    { name: "About", href: "/about" },
    { name: "Contacto", href: "/contacto" },
    
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-blue-900"
      maxWidth="full"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
          className="text-white"
        />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand as={NextLink} href="/">
          <IoCarOutline size={28} className="text-white" />
          <p className="font-bold text-white ml-2 text-xl">
            <span className="blue-xpress">Viaje</span>
            <span className="text-purple-500">X</span>
            <span className="blue-xpress">press</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item.name}-${index}`}>
            <Link 
              as={NextLink}
              color="foreground" 
              href={item.href}
              className="w-full text-white hover:text-purple-500 font-semibold"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button 
            as={NextLink} 
            href="/auth/login" 
            variant="flat" 
            className="text-white border border-white hover:bg-purple-500 hover:text-white"
          >
            Iniciar sesión
          </Button>
        </NavbarItem>
        <Link href="/ticker" className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-200">
          <IoTicketOutline size={25} className="text-black" />
          {ticketCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {ticketCount}
            </span>
          )}
        </Link>
      </NavbarContent>

      <NavbarMenu className="bg-blue-900 pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              as={NextLink}
              className="w-full text-white hover:text-purple-500"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link
            as={NextLink}
            className="w-full text-white hover:text-purple-500"
            href="/auth/login"
            size="lg"
          >
            Iniciar sesión
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavbarExpress;
