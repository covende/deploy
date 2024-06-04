import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVPanel, CVSelect, CVText } from '@/common/CovendeTemplate';
import { TIPODATE } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/layout';
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Text,
} from '@chakra-ui/react';
import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomTab } from '../configuracion/SellerConfiguracion';
import { TabStyles } from '../configuracion/TabStyles';
import PendingActiveStore from '../PendingActiveStore';
import CTotales from './components/CTotales';
import ETotales from './components/ETotales';
import GrafIngresoVentas from './components/GrafIngresoVentas';
import GrafNumeroVentas from './components/GrafNumeroVentas';
import Reputation from './components/Reputation';
import Stadistics from './components/Stadistics';

function SellerEstadisticas(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const { product, store_status } = useSelector((state) => state.ProductView); //sotre id -> product

  return store_status != 'APPROVED' ? (
    <PendingActiveStore />
  ) : (
    <Container>
      <Box backgroundColor='white' borderRadius='1rem' padding='2rem'>
        <TabStyles>
          <Tabs
            isLazy
            variant='unstyled'
            index={tabIndex}
            onChange={(v) => setTabIndex(v)}>
            {/* Tabs */}
            <TabList>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  01
                </Text>
                <Text>Mi Cuenta</Text>
              </CustomTab>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  02
                </Text>
                <Text>Reputación de tienda</Text>
              </CustomTab>
            </TabList>
            {/* Panels */}
            <TabPanels bg='white' rounded='0px 10px 10px 10px'>
              <TabPanel>
                <Stadistics store_id={product.store_id} />
              </TabPanel>
              <TabPanel>
                <Reputation store_id={product.store_id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </TabStyles>
      </Box>
    </Container>
  );
}

export default SellerEstadisticas;
