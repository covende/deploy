import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CVButton, CVImage, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Grid } from '@material-ui/core';

const EstadisticaGlobal = ({ stats, typeUser = 'seller ' }) => (
  <Grid item xs={12} sm={12} md={typeUser === 'seller ' ? 6 : 10}>
    <Flex
      border={typeUser === 'bo' ? '1px solid #B1B1B1' : 'none'}
      width='100%'
      height='100%'
      backgroundColor='#FFFFFF'
      padding='1rem'
      rounded='1rem'
      align='center'
      mx='auto'>
      <CVImage
        variant='avatar'
        height='81px'
        width='83px'
        image={stats.image}
        name='global'
      />
      <SizeBox />
      <Box>
        <CVText textAlign='start' fontSize='18' fontWeight='bold' color='blue'>
          {stats.title}
        
        </CVText>

        <Flex align='end' justify='space-between'>
          <CVText textAlign='start' fontSize='35' color='blue'>
            {stats.quantity}
          </CVText>
          <CVButton
            backgroundColor={stats.color}
            fontSize='12px'
            padding='3px 5px '
            fontWeight='bold'
            height='auto'>
            {stats.status ? '+' : '-'} {stats.variation}%
          </CVButton>
        </Flex>
      </Box>
    </Flex>
  </Grid>
    
);

export default EstadisticaGlobal;
