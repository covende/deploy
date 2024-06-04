import { CVButton, CVText } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { v4 } from 'uuid';

function CVCardTotales() {
  const [totals, settotals] = useState([
    { value: 23, title: 'Todos', color: 'green' },
    { value: 23, title: 'Pendiente', color: 'yellow' },
    { value: 23, title: 'Abierto', color: 'primary' }
  ]);

  return (
    <Box padding='2rem' rounded='1rem' backgroundColor='#FFFFFF'>
      <Grid container spacing={2}>
        {totals.map((item) => (
          <Grid key={v4()} item xs={12} sm={12} md={4}>
            <CVButton
              backgroundColor={item.color}
              height='4rem'
              width='100%'
              borderRadius='1rem'
            >
              <Flex
                padding='2rem'
                width='100%'
                alignItems='center'
                justifyContent='space-between'
              >
                <CVText color='white'>{item.title}</CVText>{' '}
                <CVText color='white' fontWeight='bold' fontSize='2rem'>
                  {item.value}
                </CVText>
              </Flex>
            </CVButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CVCardTotales;
