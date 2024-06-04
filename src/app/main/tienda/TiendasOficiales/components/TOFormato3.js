import { storeicon } from '@/app/main/lista-deseos/WishListIcons';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import tiendasimage from '@/app/assets/img/tiendasimage.svg';
import { Link } from 'react-router-dom';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { PRODUCTS_BY_STORE_PUBLIC } from '@/app/api/graphql/webpublic/products/ProductosPublicService';
import TOProductos from './TOProductos';
import { CVImage } from '@/common/CovendeTemplate';

function TOFormato3({ tienda }) {
  const [lista, setlista] = useState([]);
  const [onload, setonload] = useState(true);
  const initdata = async () => {
    setonload(true);
    const { productsByStorePublic } = await AxiosGQL(
      PRODUCTS_BY_STORE_PUBLIC({ store_id: tienda._id, random_amount: 6 })
    );
    setlista(productsByStorePublic?.productsItemPublic || []);
    setonload(false);
  };

  useEffect(() => {
    //initdata();
  }, [tienda._id]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={5} md={3}>
        <Box
          height='100%'
          width='100%'
          backgroundColor='#FFFFFF'
          rounded='16px'
          padding='1.5rem'
          display='flex'
          justifyContent='space-around'
          flexDirection='column'>
          <Flex justifyContent='center'>
            <CVImage
              variant='avatar'
              image={tienda.image}
              name={tienda.comercial_name}
              width='64px'
              height='64px'
            />
            <SizeBox />
            <Box>
              <Typography variant='caption'>Tienda</Typography>
              <Text color='#17BF93'>{tienda.comercial_name}</Text>
            </Box>
          </Flex>
          <SizeBox />

          <Flex justifyContent='center'>
            {storeicon}
            <SizeBox />

            <Box>
              <Text>{tienda.valoracion}% Valoraciones Positivas</Text>
              <Text>{tienda.total_ventas}% Clientes felices</Text>
            </Box>
          </Flex>
          <SizeBox />
          <Flex justifyContent='center'>
            <Link to={tienda.ruta}>
              <Button
                style={{
                  backgroundColor: '#004772',
                  borderRadius: '19px',
                  color: '#FFFFFF'
                }}>
                VER TIENDA
              </Button>
            </Link>
          </Flex>
        </Box>
      </Grid>
      <Grid item xs={12} sm={7} md={9}>
        <Box
          backgroundColor='#FFB93E'
          borderRadius='16px'
          width='100%'
          height='100%'>
          <Flex
            justifyContent='space-around'
            alignItems='center'
            flexWrap='wrap'>
            <Box padding='1rem'>
              <Text fontSize='4rem' fontWeight='bold' color='#FFFFFF'>
                {tienda.comercial_name}
              </Text>
              <Text fontSize='1.5rem' color='#FFFFFF'>
                {tienda.store_lema}
              </Text>
            </Box>
            <CVImage image={tiendasimage} />
          </Flex>
        </Box>
      </Grid>
      {/* 
      
      <Grid item xs={12} sm={12} md={12}>
        <TOProductos lista={lista} onload={onload} items={6} />
      </Grid>
      
      */}
      <Grid item xs={12} sm={12} md={12}>
        <Divider border='3px solid #000000' />
      </Grid>
    </Grid>
  );
}

export default TOFormato3;
