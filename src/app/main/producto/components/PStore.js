import React, { useEffect, useState } from 'react';

import { Box, Grid } from '@material-ui/core';
import { Flex } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import {
  CVButton,
  CVImage,
  CVLine,
  CVPanel,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import {
  FIND_COMPANY,
  SALES_COMPLETED
} from '@/app/api/graphql/webpublic/stores/StoresService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

const IconCheckBig = () => {
  return (
    <svg
      width='39'
      height='39'
      viewBox='0 0 39 39'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <circle cx='19.5' cy='19.5' r='19.5' fill='#17BF93' />
      <path
        d='M10 20.4615L15.6842 26L28 14'
        stroke='white'
        strokeWidth='7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

function PStore({ store, setienda }) {
  const { pathname } = useLocation();
  const [desempeno, setdesempeno] = useState({
    color: COLORS['green'],
    texto: 'Bueno',
    puntos: '94'
  });
  const [star, setstar] = useState(0);
  const [ventas, setventas] = useState(0);
  const [tienda_store, settienda_store] = useState({});
  const us = getLoggedInUser();
  const initdata = async () => {
    const { company } = await AxiosGQL(`${FIND_COMPANY(store, true, true)}`);
    const { salesCompleted } = await AxiosGQL(SALES_COMPLETED(company._id));
    setventas(salesCompleted);
    settienda_store(company);
    setstar(company.stars || 0);
    setienda({
      store_name: company.comercial_name || company.social_razon,
      type_of_sale: company.type_of_sale,
      _id: company._id,
      stars: company.stars
    });
  };
  useEffect(() => {
    initdata();
  }, [store]);

  return (
    <Grid item xs={12} sm={5} md={3}>
      <CVPanel height='100%' variant='box'>
        <CVText
          fontWeight='bold'
          textAlign='center'
          fontSize='1.5rem'
          color='blue'>
          Vendedor
        </CVText>
        <SizeBox width='1rem' />
        <Flex alignItems='center' justifyContent='center'>
          <CVImage
            width='75px'
            height='75px'
            image={tienda_store.logo}
            variant='avatar'
          />
          <SizeBox width='1rem' />
          <Box>
            <CVText color='blue' fontWeight='bold' fontSize='1.25rem'>
              {tienda_store.comercial_name || tienda_store.social_razon}
            </CVText>
            <Flex>
              <CVRating puntuation={star} height='2.5rem' marginStar='0 3px' />
            </Flex>
          </Box>
        </Flex>
        <CVLine lineHeight='1px' color='gray' />
        <SizeBox height='1.25rem' />
        <CVText>Desempeño:</CVText>
        <SizeBox height='1.25rem' />
        <Flex justifyContent='center' alignItems='center'>
          <i
            className='fas fa-check-circle'
            style={{ fontSize: '3.2rem', color: desempeno.color }}></i>
          <IconCheckBig />
          <SizeBox width='1rem' />
          <Box>
            <CVText fontSize='1.25rme' color='blue'>
              {desempeno.texto}
            </CVText>
            <CVText fontSize='1.75rem' color='green' fontWeight='bold'>
              {desempeno.puntos}%
            </CVText>
          </Box>
        </Flex>
        <SizeBox height='1.25rem' />
        <CVButton
          boxShadow='none'
          backgroundColor='grayTransparent'
          color='black'>
          <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
            {ventas}
          </span>
          Ventas Concretadas
        </CVButton>
        {!pathname.includes('tienda-opinions') && (
          <>
            <SizeBox height='1.25rem' />
            <Link style={{ width: '100%' }} to={`/tienda-opinions/${store}`}>
            <CVButton
              variant='outlined'
              color='blue'
              fontWeight='bold'
              boxShadow='none'>
              VER OPINIONES
            </CVButton>
            </Link> 
            <SizeBox height='1.25rem' />
          </>
        )}
        <SizeBox height='1.25rem' />
        {us && (
          <Link style={{ width: '100%' }} to={`/tienda-reportes/${store}`}>
            <CVButton backgroundColor='red' boxShadow='none'>
              REPORTAR TIENDA
            </CVButton>
          </Link>
        )}
        <SizeBox height='1.25rem' />
      </CVPanel>
    </Grid>
  );
}

export default PStore;
