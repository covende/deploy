import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box } from '@chakra-ui/react/';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import EstadisticaGlobal from '../../dashboard/components/EstadisticaGlobal';

function VBOTotales({ sellers, buyer }) {
  const lista = [
    {
      image: 'https://i.imgur.com/5AlWHZi.png',
      title: 'Total de Vendedores',
      quantity: sellers,
      variation: 30,
      status: true,
      color: 'primary'
    },
    {
      image: 'https://i.imgur.com/0Z43a3O.png',
      title: 'Total de Compradores',
      quantity: buyer,
      variation: 23,
      status: false,
      color: 'red'
    }
  ];
  return (
    <Box>
      {lista.map((item) => (
        <>
          <EstadisticaGlobal key={v4()} stats={item} typeUser='bo' />
          <SizeBox height='2rem' />
        </>
      ))}
    </Box>
  );
}

export default VBOTotales;
