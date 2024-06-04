import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import MenusCategori from './MenusCategori';

const ManageMenus = () => {
  // const [ndx, setNdx] = useState(0);
  const types = ['Backoffice', 'Vender', 'Comprar'];
  return (
    <Tabs variant='soft-rounded' colorScheme='blue' onChange={(index) => {}}>
      <TabList>
        <Tab>Menus Backoffice</Tab>
        <Tab>Menus Vendedor</Tab>
        <Tab>Menus Comprador</Tab>
      </TabList>
      <TabPanels>
        {types.map((type, ndx) => (
          <TabPanel>
            <MenusCategori ndx={ndx} type={type} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default ManageMenus;
