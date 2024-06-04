import React from 'react';
import {
  Text,
  Box,
  Flex,
  Center,
  Button,
  Input,
  Spacer,
  Divider
} from '@chakra-ui/react';

import { Grid } from '@material-ui/core';
//assets

const plusIcon = (
  <svg
    width='8'
    height='9'
    viewBox='0 0 8 9'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M8 5.64706H5.06353V9H2.9302V5.64706H0V3.37412H2.9302V0H5.06353V3.37412H8V5.64706Z'
      fill='#004772'
    />
  </svg>
);

function MetodoPago(props) {
  const mockOProduct = [];

  return (
    <Box>
      <Box p={55}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={9} md={9}>
            <Box bg='white' mb={10} m={1} borderRadius='24px'>
              <Box p={5}>
                <Flex>
                  <Text ml={1}> Número de Tarjeta</Text>{' '}
                  <Input ml={3} width='70%' />
                </Flex>
                <br />
                <Flex>
                  <Text ml={1}>
                    {' '}
                    Nombre del titular <br />
                    de la tarjeta
                  </Text>{' '}
                  <Input ml={3} width='40%' placeholder='Nombres' />
                  <Input ml={3} width='40%' placeholder='Apellidos' />
                </Flex>
                <br />
                <Flex>
                  <Text ml={1}> Fecha de vencimiento</Text>{' '}
                  <Input ml={3} width='40%' placeholder='mm/yy' />
                  <Text ml={1}> Codigo de seguridad</Text>{' '}
                  <Input ml={3} width='40%' />
                </Flex>
                <Box>
                  <Center>
                    <Button borderRadius='24px' p={5} colorScheme='facebook'>
                      VALIDAR
                    </Button>
                  </Center>
                </Box>
              </Box>
            </Box>

            <Flex mt={50} bg='white' m={2} borderRadius='24px'>
              <Box p={4}>
                <Text color='#004574' fontWeight='bold' fontSize='1xl'>
                  Cuenta del Comprandor
                </Text>
              </Box>
              <Box p={4} width='50%'>
                JUAN PEREZ DEL CARMEN <br />
                Avenida el Peruano Mz 5 Lima-Peru
                <br /> Código postal 12000
                <Flex>
                  <Button colorScheme='blue.700' variant='link'>
                    Cambiar
                  </Button>
                  <Spacer />
                  <Button
                    leftIcon={plusIcon}
                    colorScheme='blue.700'
                    variant='link'>
                    Añadir direción
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <Box bg='white' m={1} p={1} borderRadius='24px'>
              <Box my={3}>
                <Text
                  ml={1}
                  fontWeight='bold'
                  colorScheme='white'
                  fontSize='2xl'>
                  Resumen de Compra
                </Text>
                <Divider orientation='horizontal' />
              </Box>
              <Box my={5}>
                <Box>
                  <Text
                    padding='10px'
                    align='left'
                    fontSize='2sl'
                    color='#004574'
                    fontWeight='bold'>
                    TOTAL
                  </Text>
                  <Text
                    align='right'
                    ml={1}
                    fontSize='2sl'
                    color='#004574'
                    fontWeight='bold'>
                    S/251.00
                  </Text>
                </Box>
                <Center>
                  <Button borderRadius='24px' p={5} colorScheme='facebook'>
                    FINALIZAR PEDIDO
                  </Button>
                </Center>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MetodoPago;
