import { Box } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

function BuyerCotizacionDetails() {
  const { idquotation } = useParams();
  return <Box>{idquotation}</Box>;
}

export default BuyerCotizacionDetails;
