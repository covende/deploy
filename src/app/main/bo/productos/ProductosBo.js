import useGetPermisions from '@/common/hooks/useGetPermisions';
import themeCovende from '@/themeCovende';
import {
  TabList,
  TabPanels,
  Tabs,
  Tab,
  Text,
  TabPanel
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AdmisionProducto from './components/AdmisionProducto';
import AllProducto from './components/AllProducto';
const CustomTab = (props) => (
  <Tab
    {...props}
    rounded='16px 16px 0px 0px'
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
      borderLeft: '8px solid #00ADF6',
      bg: '#FFFFFF'
    }}
    _focus={{ borderColor: 'transparent' }}>
    {props.children}
  </Tab>
);

function ProductosBo(props) {
  const [tabindex, settabindex] = useState(0);
  const permisionsProductBO = useGetPermisions('Backoffice', 'Productos');
  return (
    <Tabs
      isLazy
      variant='enclosed'
      index={tabindex}
      onChange={(e) => settabindex(e)}
      margin='auto'
      height='100%'
      width='100%'
      padding='16px'>
      <TabList>
        <CustomTab>
          <Text fontWeight='bold'>01</Text>
          Admisión de productos
        </CustomTab>
        <CustomTab>
          <Text fontWeight='bold'>02</Text>
          Tabla de productos
        </CustomTab>
      </TabList>
      <TabPanels bg='white' rounded='0px 0px 10px 10px'>
        <TabPanel>
          <AdmisionProducto permisionsProductBO={permisionsProductBO} />
        </TabPanel>
        <TabPanel>
          <AllProducto permisionsProductBO={permisionsProductBO} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ProductosBo;
