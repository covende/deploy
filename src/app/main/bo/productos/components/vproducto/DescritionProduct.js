import { Box, Divider, Text } from '@chakra-ui/react';
import { Typography } from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';

function DescritionProduct({ producto }) {
  return (
    <Box>
      <Text fontWeight='bold' color='#174872'>
        Descripción destacada:
      </Text>

      <div
        dangerouslySetInnerHTML={{
          __html: producto?.product_detail?.featured_description || ''
        }}
      />
      <br />
      <Divider />
      <Text fontWeight='bold' color='#174872'>
        Descripción detallada:
      </Text>

      <div
        dangerouslySetInnerHTML={{
          __html: producto?.product_detail?.detailed_description || ''
        }}
      />

      <br />
      <Divider />
      <Text fontWeight='bold' color='#174872'>
        Licencias o Permisos especiales:
      </Text>
      <Typography>{producto?.product_licenses_or_permits || ''}</Typography>
      <br />
      <Divider />
      <Text fontWeight='bold' color='#174872'>
        Palabras claves:
      </Text>
      <br />
      {(producto?.product_detail?.keywords || '').split(',').map((word) => (
        <Typography key={v4()}>{word}</Typography>
      ))}
    </Box>
  );
}

export default DescritionProduct;
