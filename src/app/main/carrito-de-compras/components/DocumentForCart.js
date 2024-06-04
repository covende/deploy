import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVInput, CVText } from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { Box, Flex } from '@chakra-ui/react';
import { onlyNumber, onlyText } from '@CVTemplate/core/CVValidation';
import { Grid } from '@material-ui/core';
import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';

function DocumentForCart({
  settipodoc,
  tipodoc,
  factura,
  setfactura,
  information
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <Box backgroundColor='#FFFFFF' rounded='1rem' padding='1rem'>
      <CVText fontSize='1.25rem' fontWeight='bold' color='blue'>
        Tipo Documento
      </CVText>

      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box flex={{ base: 'none', md: '1' }} mr={{ base: '0', md: '1rem' }}>
          <CVRadio
            value={tipodoc}
            onChange={(value) => {
              settipodoc(value);
              if (value == 'Boleta') {
                setfactura({
                  ruc: information.dni,
                  razon_social: information.first_name + ' ' + information.last_name
                });
              } else {
                setfactura({
                  ruc: '',
                  razon_social: ''
                });
              }
            }}
            options={[
              { text: 'Boleta', value: 'Boleta' },
              { text: 'Factura', value: 'Factura' }
            ]}
          />
        </Box>
        <Box flex={{ base: 'none', md: '2' }}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Box mb={{ base: '1rem', md: '0' }} width={{ base: '100%', md: '280px' }}>
              <CVInput
           
                placeholder={tipodoc == 'Factura' ? 'Número de RUC' : 'Número de DNI'}
                value={factura.ruc}
                onChange={(value) => setfactura({ ...factura, ruc: onlyNumber(value) })}
                size={isMobile ? 'sm' : 'md'}
              />
            </Box>
            <Box ml={{ base: '0', md: '1rem' }} width={{ base: '100%', md: '280px' }}>
              <CVInput
              
                placeholder={tipodoc == 'Factura' ? 'Razón social' : 'Nombre y Apellido'}
                value={factura.razon_social}
                onChange={(value) => setfactura({ ...factura, razon_social: onlyText(value) })}
                size={isMobile ? 'sm' : 'md'}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DocumentForCart;
