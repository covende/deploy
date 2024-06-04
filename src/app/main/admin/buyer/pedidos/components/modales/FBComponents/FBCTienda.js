import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVInput,
  CVLine,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { Grid } from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';

function FBCTienda({
  pedido,
  storepoint,
  setstorepoint = (value) => console.log(value),
  settags,
  errors,
  tags,
  storecomment,
  setstorecomment
}) {
  const setspoint = (value) => setstorepoint(value);
  const puntsString = {
    1: 'Muy malo',
    2: 'malo  ',
    3: 'regular ',
    4: 'bueno',
    5: 'Muy bueno'
  };

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
              <Avatar
                src={pedido?.logo}
                name={pedido?.comercial_name}
                size='lg'
              />
            </Flex>
            <SizeBox />
            <Box width='100%' height='100%'>
              <CVText fontSize='1rem' color='blue' fontWeight='bold'>
                {pedido?.comercial_name} - {pedido?.social_razon}
              </CVText>

              <CVText color='blue'>{pedido?.direction}</CVText>
            </Box>
          </Flex>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <CVText color='blue'>Calificar</CVText>
          <Flex align='center'>
            <CVRating
              key={v4()}
              height='3rem'
              precision={1}
              readOnly={false}
              onChange={(value) => setspoint(value)}
              puntuation={storepoint}
            />
            {puntsString[storepoint] && (
              <Text
                bg={COLORS['yellow']}
                borderRadius='5px'
                p='0.2rem 1rem'
                color='white'
                fontWeight='bold'
                ml='10px'
                fontSize='14px'>
                {puntsString[storepoint]}
              </Text>
            )}
          </Flex>
        </Grid>
      </Grid>
      <CVText color='blue'>¿ Qué recomiendas sobre el vendedor ?</CVText>
      <SizeBox />
      <Flex flexWrap='wrap' justifyContent='space-around' mb='5px'>
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
      {errors &&
        storecomment == '' &&
        tags.filter((item) => item.selected).length == 0 && (
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
        error={
          errors &&
          storecomment == '' &&
          tags.filter((item) => item.selected).length == 0
        }
        errorMessage='Es necesario dejar un comentario'
        multiline={true}
        value={storecomment}
        onChange={(value) => setstorecomment(value)}
        height='100%'
      />
    </Box>
  );
}

export default FBCTienda;
