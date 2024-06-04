import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVPanel,
  CVRating,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import { COLORS, TIPODATE } from '@/common/CovendeTemplate/CVThemes';
import { Flex, Box } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';

function ETotales({ setFiltro, storeCalification }) {
  const [time, settime] = useState('all');
  const { visits, score, increase } = storeCalification;
  return (
    <Grid item xs={12} sm={12} md={6}>
      <CVSelect
        options={TIPODATE}
        value={time}
        onChange={(value) => {
          settime(value);
          let time = TIPODATE.find((type) => type.value == value);
          setFiltro({
            ...time.time(),
            firstTime: value == 'all' ? true : false
          });
        }}
      />
      <SizeBox />
      <CVPanel
        useBackgroundClip={true}
        backgroundColor='primary'
        itemDirection='column'
        itemsAlign='center'
        itemJustify='space-around'>
        <CVText fontWeight='bold' color='white' fontSize='1.5rem'>
          Calificación de la tienda
        </CVText>
        <Flex alignItems='center'>
          <CVText fontSize='4rem' fontWeight='bold' color='white'>
            {Number(score).toFixed(1) || 0}
          </CVText>
          <SizeBox />
          <Box border='1px solid #FFFFFF' padding='0.5rem' rounded='1rem'>
            <CVRating
              puntuation={score || 0}
              height='3rem'
              color={COLORS['yellow']}
            />
          </Box>
        </Flex>
        <Flex width='100%'>
          <Flex
            width='60%'
            borderBottom='2px solid #FFFFFF'
            alignItems='center'>
            <CVText
              fontSize='1.5rem'
              textAlign='start'
              fontWeight='bold'
              color='white'>
              Cantidad de visitas a la tienda
            </CVText>
          </Flex>
          <Flex width='40%' alignItems='end' direction='column'>
            <CVText fontSize='3rem' fontWeight='bold' color='white'>
              {visits || 0}
            </CVText>

            <CVButton color='primary' backgroundColor='white'>
              {increase || 0}
              <SizeBox />
              <HiOutlineArrowNarrowUp style={{ color: COLORS['primary'] }} />
            </CVButton>
          </Flex>
        </Flex>
        <Flex direction='column' alignItems='center'>
          <Box
            padding='1rem'
            rounded='1rem'
            backgroundColor='#FFFFFF'
            color={COLORS['primary']}>
            <CVText textAlign='center' color='primary'>
              Tus visitas
            </CVText>
            <CVText textAlign='center' color='primary'>
              subieron en esta
            </CVText>
            <CVText textAlign='center' color='primary'>
              semana
            </CVText>
          </Box>
          <Flex borderRight='2px dashed  #FFFFFF' height='3rem'></Flex>
          <Box
            width='2rem'
            height='2rem'
            border='5px solid #FFFFFF'
            rounded='2rem'
            backgroundColor='transparent'></Box>
        </Flex>
      </CVPanel>
    </Grid>
  );
}

export default ETotales;
