import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { TabStyles } from './TabStyles';

import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Text,
  Stack,
  Skeleton
} from '@chakra-ui/react';
import themeCovende from '@/themeCovende';
import MiCuenta from './components/tab1/MiCuenta';
import DatosDirection from './components/tab2/DatosDirection';
import MiEmpresa from './components/tab3/MiEmpresa';
import MisTarjetas from './components/tab4/MisTarjetas';

function BuyerConfiguracion(props) {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {}, []);

  const CustomTab = ({ children }) => (
    <Tab
      rounded='25px 25px 0px 0px'
      bg={themeCovende.colors.celeste}
      display='block'
      marginRight='15px'
      color='#ffffff'
      textAlign='left'
      minW='200px'
      _selected={{
        color: themeCovende.colors.celeste,
        borderImage:
          'linear-gradient(to bottom, rgba(0,0,0,0) 25%, #00ADF6 25%, #00ADF6 75%, rgba(0,0,0,0) 75%)',
        borderImageSlice: '1',
        bg: '#FFFFFF'
      }}
      _focus={{ borderColor: 'transparent' }}>
      <div>{children}</div>
    </Tab>
  );
  return (
    <Container>
      {true ? (
        <TabStyles>
          <Tabs
            isLazy
            variant='unstyled'
            index={tabIndex}
            onChange={(v) => setTabIndex(v)}>
            <TabList>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  01
                </Text>
                <Text>Mi cuenta</Text>
              </CustomTab>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  02
                </Text>
                <Text>Mis Direcciones</Text>
              </CustomTab>
              {/*
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  03
                </Text>
                <Text>Comprador Corporativo</Text>
              </CustomTab>
                */}
              {/* <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  03
                </Text>
                <Text>Mis tarjetas</Text>
              </CustomTab> */}
            </TabList>
            <TabPanels bg='white' rounded='0px 10px 10px 10px'>
              <TabPanel>
                <MiCuenta />
              </TabPanel>
              <TabPanel>
                <DatosDirection />
              </TabPanel>
              {/* 
              <TabPanel>
                <MiEmpresa />
              </TabPanel>
              */}
              {/* <TabPanel>
                <MisTarjetas />
              </TabPanel> */}
            </TabPanels>
          </Tabs>
        </TabStyles>
      ) : (
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>
      )}
    </Container>
  );
}

export default BuyerConfiguracion;
