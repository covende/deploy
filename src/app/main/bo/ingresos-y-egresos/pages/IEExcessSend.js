import React, { useState } from 'react';

import { Container } from '@/../node_modules/@material-ui/core/index';
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Box,
  Tab
} from '@chakra-ui/react';
import IEETable from './IEExcessSend/IEETable';
import themeCovende from '@/themeCovende';
import IEEWeightSend from './IEExcessSend/IEEWeightSend';

export const CustomTab = ({ children }) => (
  <Tab
    rounded='16px 16px 0px 0px'
    bg={themeCovende.colors.celeste}
    display='Flex'
    p='0'
    h='49px'
    marginRight='15px'
    justifyContent='start'
    color='#ffffff'
    minW='300px'
    _focus={{ borderColor: 'transparent' }}
    _selected={{
      backgroundColor: '#FFFFFF',
      color: themeCovende.colors.azul
    }}>
    {children}
  </Tab>
);

const IEExcessSend = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div>
      <Container>
        <Tabs
          isLazy
          variant='unstyled'
          index={tabIndex}
          onChange={(v) => setTabIndex(v)}>
          <TabList>
            <CustomTab>
              <Box h='30px' mb='-5px' w='6px' bg='#00ADF6' mr='14px' />
              <Text fontSize='15px'>
                <span style={{ fontWeight: 'bold' }}>01</span> Pedidos en camino
                de hoy
              </Text>
            </CustomTab>
            <CustomTab>
              <Box h='30px' mb='-5px' w='6px' bg='#00ADF6' mr='14px' />
              <Text fontSize='15px'>
                <span style={{ fontWeight: 'bold' }}>02</span> Historial
              </Text>
            </CustomTab>
          </TabList>
          <TabPanels bg='white' rounded='0px 10px 10px 10px'>
            <TabPanel>
              <IEETable />
            </TabPanel>
            <TabPanel>
              <IEEWeightSend />
              {/* <DatosEmpresa storeID={storeID} permisions={permisions} /> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </div>
  );
};

export default IEExcessSend;
