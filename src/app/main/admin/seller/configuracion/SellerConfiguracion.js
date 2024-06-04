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
  Skeleton,
  Box
} from '@chakra-ui/react';
import themeCovende from '@/themeCovende';
import MiCuenta from './components/tab1/MiCuenta';
import DatosEmpresa from './components/tab2/DatosEmpresa';
import DatosBancarios from './components/tab3/DatosBancarios';
import ValidacionDocs from './components/tab4/ValidacionDocs';
import MiTienda from './components/tab5/MiTienda';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '../productos/redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { COMPANY_BY_ID } from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import PendingActiveStore from '../PendingActiveStore';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import DeliveryOwn from './components/tab6/deliveryOwn';
import { useLocation, useHistory } from 'react-router-dom';

export const CustomTab = ({ children }) => (
  <Tab
    rounded='16px 16px 0px 0px'
    bg={themeCovende.colors.celeste}
    display='block'
    marginRight='15px'
    color='#fff'
    textAlign='left'
    minW='193px'
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

function SellerConfiguracion(props) {
  const [tabIndex, setTabIndex] = useState(0);
  const [storeID, setStoreID] = useState('');
  const { product } = useSelector((state) => state.ProductView);
  const [companyData, setCompanyData] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const search = location.search;

  const history = useHistory();
  const searchParams = new URLSearchParams(search);
  const permisions = useGetPermisions('Vender', 'Configuración');

  const { store_status, delivery_own } = useSelector(
    (state) => state.ProductView
  );
  const { client } = useSelector((state) => state.Clients);

  const initdata = async () => {
    let step = searchParams.get('step');
    step = Number(step || '-');

    if (!isNaN(step) && step > -1 && step <= 6) setTabIndex(step - 1);

    let store = await tienda(dispatch, product);
    setStoreID(store);

    const { company } = await AxiosGQL(COMPANY_BY_ID(store));
    setCompanyData(company);
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Container>
      {storeID != '' ? (
        <TabStyles>
          <Tabs
            isLazy
            variant='unstyled'
            index={tabIndex}
            onChange={(v) => {
              setTabIndex(v);
              history.push('/seller/configuracion?step=' + Number(v + 1));
            }}>
            <TabList
              flexDirection={{
                base: 'column',
                md: 'column',
                lg: 'column',
                xl: 'row'
              }}>
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
                <Text>Datos de la empresa</Text>
              </CustomTab>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  03
                </Text>
                <Text>Datos Bancarios</Text>
              </CustomTab>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  04
                </Text>
                <Text>Validación documentaría</Text>
              </CustomTab>
              <CustomTab>
                <Text fontSize='1.5rem' fontWeight='bold'>
                  05
                </Text>
                <Text>Perfil de tienda</Text>
              </CustomTab>
              {delivery_own && (
                <CustomTab>
                  <Text fontSize='1.5rem' fontWeight='bold'>
                    06
                  </Text>
                  <Text>Mi Operador logístico</Text>
                </CustomTab>
              )}
            </TabList>

            <TabPanels bg='white' rounded='0px 10px 10px 10px'>
              <TabPanel>
                <MiCuenta storeID={storeID} />
              </TabPanel>
              <TabPanel>
                <DatosEmpresa storeID={storeID} permisions={permisions} />
              </TabPanel>
              <TabPanel>
                <DatosBancarios storeID={storeID} permisions={permisions} />
              </TabPanel>
              <TabPanel>
                <ValidacionDocs storeID={storeID} permisions={permisions} />
              </TabPanel>
              {store_status == 'APPROVED' || client?.store?._id ? (
                <TabPanel>
                  <MiTienda
                    storeID={storeID}
                    permisions={permisions}
                    companyData={companyData}
                  />
                </TabPanel>
              ) : (
                <Box m={5} p={2}>
                  <PendingActiveStore />
                </Box>
              )}
              {delivery_own && (
                <TabPanel>
                  <DeliveryOwn storeID={storeID} permisions={permisions} />
                </TabPanel>
              )}
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

export default SellerConfiguracion;
