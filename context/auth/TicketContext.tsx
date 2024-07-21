// context/TicketContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface TicketContextProps {
  ticketCount: number;
  updateTicketCount: () => void;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ticketCount, setTicketCount] = useState(0);

  const updateTicketCount = () => {
    const ticketsCookie = Cookies.get('tickets');
    if (ticketsCookie) {
      const tickets = JSON.parse(ticketsCookie);
      setTicketCount(tickets.length);
    } else {
      setTicketCount(0);
    }
  };

  useEffect(() => {
    updateTicketCount();
    window.addEventListener('focus', updateTicketCount);
    return () => {
      window.removeEventListener('focus', updateTicketCount);
    };
  }, []);

  return (
    <TicketContext.Provider value={{ ticketCount, updateTicketCount }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = (): TicketContextProps => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicket debe usarse dentro de un TicketProvider');
  }
  return context;
};
