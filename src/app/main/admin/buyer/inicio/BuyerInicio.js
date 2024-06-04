import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Flex
} from '@chakra-ui/react';
import { Container, Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Cabecera from './components/Cabecera';
import LastCotizacion from './components/LastCotizacion';
import LastPedidos from './components/LastPedidos';
import { StylesTabPanel } from './InicioStyles';
import { useHistory, useParams } from 'react-router';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function BuyerInicio() {
  const history = useHistory();
  const { tab } = useParams();
  const tabs = {
    pedido: 0,
    quotation: 1
  };
  const tabsIndex = ['pedido', 'quotation'];
  const { ver } = useGetPermisions('Comprar', 'Inicio');

  const style = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '20px',
    color: '#FF5454',
    padding: '0.5rem',
    fontWeight: 'initial',
    fontSize: '1rem',
    width: '150px',
   // marginLeft: 'auto',
   // marginRight: '10px',
    // display: 'flex'
    textAlign: 'center'
  };
  const CustomTab = ({ backgroundColor, children }) => (
    <Tab
      fontSize='1.5rem'
      rounded='25px 25px 0px 0px'
      bg={COLORS[backgroundColor] + '80'}
      display='block'
      color='#fff'
      textAlign='left'
      minW='200px'
      minH='50px'
      _selected={{
        color: 'white',
        backgroundColor: COLORS[backgroundColor],
        fontWeight: 'bold'
      }}
      _focus={{ borderColor: 'transparent' }}>
      <div>{children}</div>
    </Tab>
  );
  return (
    <Container>
      <Cabecera />
      <br />
      <Tabs
        isLazy
        isFitted
        variant='enclosed'
        index={tabs[tab] || 0}
        onChange={(e) => history.push('/buyer/' + tabsIndex[e])}>
        <TabList>
          <CustomTab backgroundColor='red' >
            <Grid container style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={12} sm={12} md={6}>
                <span>TUS ÙLTIMOS PEDIDOS</span>
              </Grid>
              {ver && (
                <Link to='/buyer/pedidos' style={style}>
                  Ver pedidos
                </Link>
              )}
            </Grid>
          </CustomTab>
          <CustomTab backgroundColor='purple'>
            <Grid container  style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Grid item xs={12} sm={12} md={6}>
                <span>COTIZACIONES SOLICITADAS</span>
              </Grid>
              {ver && (
                <Link to='/buyer/cotizacion' style={style}>
                  Ver cotizaciones
                </Link>
              )}
            </Grid>
          </CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel style={{ padding: '0px' }}>
            <StylesTabPanel>
              <LastPedidos ver={ver} />
            </StylesTabPanel>
          </TabPanel>
          <TabPanel style={{ padding: '0px' }}>
            <StylesTabPanel>
              <LastCotizacion ver={ver} />
            </StylesTabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

export default BuyerInicio;
