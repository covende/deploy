import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVImage,
  CVInput,
  CVLine,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';

import { Box, Flex } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { v4 } from 'uuid';

function FBCTienda({
  pedido,
  storepoint,
  setstorepoint = (value) => console.log(value),
  settags,
  tags,
  storecomment,
  setstorecomment
}) {
  const setspoint = (value) => setstorepoint(value);

  return (
    <Box>
      <CVText fontSize='1.5rem' color='red' fontWeight='bold'>
        Calificar Tienda
      </CVText>
      <CVLine color='gray' lineHeight='1px' height='2px' />
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6}>
          <Flex>
            <Flex>
              <CVImage
                name={pedido?.company?.logo}
                image={pedido?.company?.logo ? pedido?.company?.logo : null}
                width='75px'
                height='75px'
                variant='avatar'
              />
            </Flex>
            <SizeBox />
            <Box width='100%' height='100%'>
              <CVText fontSize='1rem' color='blue'>
                {pedido?.company?.comercial_name} -{' '}
                {pedido?.company?.social_razon}
              </CVText>

              <CVText color='blue'>{pedido?.company?.direction}</CVText>
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
            onChange={(value) => setspoint(value)}
            puntuation={storepoint}
          />
        </Grid>
      </Grid>
      <CVText color='blue'>¿Qué recomiendas sobre el vendedor ?</CVText>
      <SizeBox />
      <Flex flexWrap='wrap' justifyContent='space-around'>
        {tags.map((item, idx) => (
          <CVButton
            height='1.5rem'
            fontSize='0.85rem'
            key={v4()}
            backgroundColor={item.selected ? 'primary' : 'gray'}
            onClick={() =>
              settags([
                ...tags.map((it, idj) => {
                  if (idx == idj) {
                    item.selected = !item.selected;
                  }
                  return it;
                })
              ])
            }>
            {item.title}
          </CVButton>
        ))}
      </Flex>
      {tags.filter((item) => item.selected).length == 0 && (
        <CVText
          className='errores'
          color='red'
          fontSize='0.85rem'
          fontWeight='bold'>
          Seleccione al menos una razón
        </CVText>
      )}
      <SizeBox />

      <CVInput
        error={storecomment == ''}
        errorMessage='Es necesario dejar un comentario'
        multiline={true}
        value={storecomment}
        onChange={(value) => setstorecomment(value)}
        height='100%'
        placeholder='Explica brevemente tu experiencia con este proveedor.'
      />
    </Box>
  );
}

export default FBCTienda;
