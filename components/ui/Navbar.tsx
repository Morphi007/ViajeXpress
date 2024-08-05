// components/NavbarExpress.tsx
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link as NextUILink, Button } from "@nextui-org/react";
import { IoCarOutline, IoTicketOutline } from 'react-icons/io5';
import NextLink from 'next/link';
import { useTicket } from "@/context/auth/TicketContext";

const NavbarExpress = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false); // Track hover state
  const { ticketCount } = useTicket();

  const menuItems = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Nosotros", href: "/about" },
    { name: "Contacto", href: "/contacto" },
  ];

  const dropdownItems = [
    { name: "Viajes", href: "/viajes" },
    { name: "Autobuses", href: "/bus" },
    { name: "Metro", href: "/metroLines" },
  ];

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
    setIsDropdownHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isDropdownHovered) {
      setIsDropdownOpen(false);
    }
    setIsDropdownHovered(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      setIsDropdownOpen(false);
      setIsDropdownHovered(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                {item.name === "Servicios" ? (
                    <div
                        className="relative dropdown-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                      <NextLink href="/servicios" legacyBehavior>
                        <a
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className={`dropbtn w-full text-white font-semibold px-4 py-2 flex items-center justify-between ${
                                isDropdownOpen || isDropdownHovered ? 'bg-purple-500' : 'hover:bg-purple-500'
                            }`}
                        >
                          {item.name}
                        </a>
                      </NextLink>
                      {isDropdownOpen && (
                          <div className="absolute left-0 mt-0 bg-white text-black shadow-lg w-full">
                            {dropdownItems.map((dropdownItem, idx) => (
                                <NextLink key={`${dropdownItem.name}-${idx}`} href={dropdownItem.href} legacyBehavior>
                                  <a className="block px-4 py-2 hover:bg-gray-100">{dropdownItem.name}</a>
                                </NextLink>
                            ))}
                          </div>
                      )}
                    </div>
                ) : (
                    <NextLink href={item.href} legacyBehavior>
                      <a className="w-full text-white hover:text-purple-500 font-semibold px-4 py-2">
                        {item.name}
                      </a>
                    </NextLink>
                )}
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
          <NextLink href="/tickets" legacyBehavior>
            <a className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-200">
              <IoTicketOutline size={25} className="text-black"/>
              {ticketCount > 0 && (
                  <span
                      className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {ticketCount}
              </span>
              )}
            </a>
          </NextLink>
        </NavbarContent>

        <NavbarMenu className="bg-blue-900 pt-6">
          {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.name}-${index}`}>
                {item.name === "Servicios" ? (
                    <div
                        className="relative dropdown-container"
                    >
                      <NextLink href="/servicios" legacyBehavior>
                        <a
                            onClick={() => setIsDropdownOpen(prev => !prev)}
                            className="dropbtn w-full text-white hover:bg-purple-500 px-4 py-2 flex items-center justify-between"
                        >
                          {item.name}
                          <span className="ml-1 inline-block w-3 h-3 border-t-2 border-white border-solid border-r-2 border-transparent rotate-45"></span>
                        </a>
                      </NextLink>
                      {isDropdownOpen && (
                          <div className="absolute left-0 mt-0 bg-white text-black shadow-lg w-full">
                            {dropdownItems.map((dropdownItem, idx) => (
                                <NextLink key={`${dropdownItem.name}-${idx}`} href={dropdownItem.href} legacyBehavior>
                                  <a className="block px-4 py-2 hover:bg-gray-100">{dropdownItem.name}</a>
                                </NextLink>
                            ))}
                          </div>
                      )}
                    </div>
                ) : (
                    <NextLink href={item.href} legacyBehavior>
                      <a className="w-full text-white hover:text-purple-500 px-4 py-2">
                        {item.name}
                      </a>
                    </NextLink>
                )}
              </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <NextLink href="/auth/login" legacyBehavior>
              <a className="w-full text-white hover:text-purple-500 px-4 py-2">
                Iniciar sesión
              </a>
            </NextLink>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
  );
}

export default NavbarExpress;
