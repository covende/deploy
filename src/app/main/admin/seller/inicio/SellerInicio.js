import { COMPANY_BY_ID } from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import {
  PRODUCT_COUNTER_INICIO,
  PEDIDO_COUNTER_INICIO,
  FIRST_CARD_SELLER
} from '@/app/api/graphql/webpublic/userData/UserService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVPanel, CVText } from '@/common/CovendeTemplate';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { Flex, Text, Spacer } from '@chakra-ui/layout';
import { CVEstadoTienda } from '@CVTemplate/core/CVEstado/CVEstadoTienda';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { CVButton, CVRating } from '@CVTemplate/core/index';
import { Box, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import PendingActiveStore from '../PendingActiveStore';
import { tienda } from '../productos/redux/ProductUpdate';
import { welcome, lefIconCards } from './InicioIcons';
import { totalescards } from './InicioUtils';
import PerformingProduct from './PerformingProduct';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SellerInicio() {
  const { product, store_status } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const [dataStore, setDataStore] = useState({});
  const [generalData, setGeneralData] = useState([]);
  const [companyData, setCompanyData] = useState([]);

  const initdata = async (cancelToken) => {
    let id = await tienda(dispatch, product);

    const { productCounterInicio } = await AxiosGQL(
      PRODUCT_COUNTER_INICIO(id),
      { cancelToken }
    );

    const { pedidoCounterInicio } = await AxiosGQL(PEDIDO_COUNTER_INICIO(id), {
      cancelToken
    });

    if (productCounterInicio && pedidoCounterInicio)
      setGeneralData(totalescards(productCounterInicio, pedidoCounterInicio));

    const { company } = await AxiosGQL(COMPANY_BY_ID(id), { cancelToken });
    company && setCompanyData(company);

    const { firstCardSeller } = await AxiosGQL(
      FIRST_CARD_SELLER(product.store_id),
      { cancelToken }
    );

    firstCardSeller && setDataStore(firstCardSeller);
  };

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    initdata(ourRequest.token);

    return () => {
      setDataStore({});
      setGeneralData([]);
      setCompanyData([]);
      ourRequest.cancel();
      console.log('destroy');
    };
  }, [product]);

  return store_status != 'APPROVED' ? (
    <PendingActiveStore />
  ) : (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6}>
          {welcome(getLoggedInUser().first_name || '')}
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CVPanel
            useBackgroundClip={true}
            backgroundColor='primary'
            height='45%'
            itemJustify='space-around'
            itemDirection='column'>
            <Flex width='100%' justifyContent='start'>
              <CVText color='white'>Total de ventas del mes</CVText>
            </Flex>
            <Flex width='100%' justifyContent='end'>
              <CVText color='white' fontWeight='bold' fontSize='2rem'>
                {CVMoneyFormat({ amount: dataStore.monthSalesTotal })}
              </CVText>
            </Flex>
          </CVPanel>
          <SizeBox />
          <CVPanel
            useBackgroundClip={true}
            height='45%'
            itemDirection='column'
            itemJustify='space-around'>
            <Flex width='100%' justifyContent='start'>
              <CVText color='blue' fontSize='12' fontWeight='600'>
                Producto más vendido:
              </CVText>
            </Flex>
            <Flex width='100%' justifyContent='start' alignItems='center'>
              <CVImage width='5rem' image={dataStore.productPhoto} />{' '}
              <Box ml='.5rem'>
                <CVText fontWeight='bold' color='blue'>
                  {dataStore.productName || ''}
                </CVText>
                <CVText color='blue'>
                  ID de producto: {dataStore.productID || '-'}
                </CVText>
              </Box>
            </Flex>
          </CVPanel>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CVPanel height='95%' itemDirection='column'>
            <Box width='100%' justifyContent='start'>
              <Flex align='center'>
                <CVImage
                  width='5rem'
                  height='5rem'
                  borderRadius='5rem'
                  image={dataStore.companyIcon}
                />{' '}
                &nbsp;&nbsp;
                <CVText
                  variant='maxtext'
                  lines={2}
                  color='skyblue'
                  fontWeight='bold'
                  textTransform='capitalize'
                  fontSize='2.25rem'>
                  {dataStore.companyName && dataStore.companyName.toLowerCase()}
                </CVText>
              </Flex>
              <Flex my={5}>
                <CVText color='blue' fontSize='12' fontWeight='600'>
                  Estado:
                </CVText>
                <Spacer />
                <Box
                  style={{
                    borderRadius: '20px',
                    padding: '10px 20px',
                    backgroundColor:
                      COLORS[CVEstadoTienda(companyData.status).color],
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '1.2rem'
                  }}>
                  {CVEstadoTienda(dataStore.companyStatus).text}
                </Box>
                <Spacer />
              </Flex>
              <Flex my={5}>
                <CVText
                  color='blue'
                  fontSize='12'
                  fontWeight='600'
                  textDecoration='underline'>
                  Calificación:
                </CVText>{' '}
                <Spacer />
                <CVRating puntuation={dataStore.companyScore} height='2.5rem' />
                <Spacer />
              </Flex>
              <Flex my={5}>
                <CVText
                  color='blue'
                  fontSize='12'
                  fontWeight='600'
                  textDecoration='underline'>
                  Reputación:
                </CVText>{' '}
                <Spacer />
                <PerformingProduct perform={dataStore.companyPerformance} />
                <Spacer />
              </Flex>
            </Box>
          </CVPanel>
        </Grid>
      </Grid>
      <br />
      <br />
      <Box
        style={{
          background: '#FFFFFF',
          border: '0.25px solid #C4C4C4',
          boxSizing: 'border-box',
          borderRadius: '21px',
          padding: '2rem'
        }}>
        <Box>
          <Grid container spacing={2}>
            <Grid key={v4()} item xs={12} sm={6} md={6}>
              <Flex
                justifyContent='center'
                direction='column'
                alignItems='center'>
                {lefIconCards}
              </Flex>
            </Grid>
            {generalData.map((da) => (
              <Grid key={v4()} item xs={12} sm={6} md={3}>
                <Box
                  style={{
                    border: da.border,
                    borderRadius: '21px 21px 5px 5px',
                    height: 'auto'
                  }}>
                  <Box
                    style={{
                      width: '100%',
                      height: '80px',
                      borderRadius: '21px 21px 0px 0px',
                      backgroundColor: da.fondo,
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                    {da.icon}
                    <Text fontWeight='bold' color='#FFFFFF'>
                      {da.title}
                    </Text>
                    <Text></Text>
                  </Box>
                  <Flex justifyContent='center'>
                    <Box
                      style={{
                        width: '0px',
                        height: '0px',
                        borderRight: '10px solid transparent',
                        borderTop: '10px solid transparent',
                        borderLeft: '10px solid transparent',
                        borderBottom: '10px solid ' + da.fondo,
                        transform: 'rotate(180deg)'
                      }}></Box>
                  </Flex>
                  {Object.keys(da.data).map((k, v) => (
                    <Flex
                      color='black'
                      key={v4()}
                      justifyContent='space-between'
                      padding='1rem'
                      style={{
                        backgroundColor: !(v % 2 == 0)
                          ? da.fondo + '10'
                          : '#FFFFFF',
                        borderBottom: v < 3 ? '1px solid ' + da.fondo : ''
                      }}>
                      <Text>{k}</Text>
                      <Text>{da.data[k]}</Text>
                    </Flex>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>

          <Flex>
            <Spacer />{' '}
            <Link to='/seller/redirecciones'>
              <CVText
                variant='maxtext'
                lines={2}
                color='skyblue'
                fontWeight='bold'
                textTransform='capitalize'
                textDecoration='underline'
                fontSize='1.25rem'>
                Términos y Condiciones Vendedor
              </CVText>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Container>
  );
}

export default SellerInicio;
