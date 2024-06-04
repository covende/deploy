import React, { useState } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVImage,
  CVInput,
  CVLine,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';
import { v4 } from 'uuid';
import { CVRenderHTML } from '@/common/CovendeTemplate/CVMethods';

function FBCProduct({
  productpoint,
  setproductpoint = (value) => console.log(value),
  producto,
  errors,
  productcomment,
  setproductcomment
}) {
  const setpointer = (value) => setproductpoint(value);
  return (
    <Box>
      <CVText fontSize='1.5rem' color='red' fontWeight='bold'>
        Calificar Producto
      </CVText>
      <CVLine color='gray' lineHeight='1px' height='2px' />
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          <Flex alignItems='center'>
            <Box>
              <CVImage
                height='75px'
                width='75px'
                borderRadius='1rem'
                image={producto?.photo || 'https://via.placeholder.com/150'}
              />
            </Box>
            <SizeBox />
            <Box>
              {producto?.name}
              <SizeBox />
              <CVText variant='maxtext' lines={3}>
                <CVRenderHTML>{producto?.featured_description}</CVRenderHTML>
              </CVText>
            </Box>
          </Flex>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <CVText color='blue'>Calificar</CVText>
          <CVRating
            key={v4()}
            height='3rem'
            precision={1}
            readOnly={false}
            onChange={(value) => setpointer(value)}
            puntuation={productpoint}
          />
        </Grid>
      </Grid>
      <SizeBox />
      <CVText color='blue'>Escribe un comentario</CVText>
      <CVInput
        error={errors && productcomment == ''}
        errorMessage='Es necesario dejar un comentario'
        multiline={true}
        value={productcomment}
        onChange={(value) => setproductcomment(value)}
        height='100%'
        placeholder='Explica brevemente tu experiencia con el pedido'
      />
      <SizeBox />
    </Box>
  );
}

export default FBCProduct;
