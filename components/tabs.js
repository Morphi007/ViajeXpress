// src/components/Tabs.js
import React, { useState } from 'react';
import { Tabs, Tab, Text } from '@nextui-org/react';

const MyTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Tabs value={selectedIndex} onChange={handleChange}>
      <Tab title="Informaciones">
        <Text>Contenido de Informaciones</Text>
      </Tab>
      <Tab title="Recorridos">
        <Text>Contenido de Recorridos</Text>
      </Tab>
      <Tab title="Cargar Tarjeta">
        <Text>Contenido de Cargar Tarjeta</Text>
      </Tab>
    </Tabs>
  );
};

export default MyTabs;
