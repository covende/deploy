import React from 'react';
import { Text, Box, Center } from '@chakra-ui/react';
import { Container, Grid } from '@material-ui/core';
import { CVButton, CVImage } from '@/common/CovendeTemplate';
import { typeofsale_producto } from '@/common/utils';

const Informacion = (props) => {
  const iconChek = (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <circle cx='16' cy='16' r='16' fill='#17BF93' />
    </svg>
  );

  return (
    <Container>
      <Box bg='white' padding='1rem' borderRadius='1rem'>
        <Container>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={3} md={3}>
              <Box>
                <CVImage
                  image={
                    props.tienda?.logo ||
                    'https://covendefiles.s3.amazonaws.com/images/1637190582399'
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={7} md={7}>
              <Box ml={15} mt={20}>
                <Box mb={7}>
                  <Text
                    as='span'
                    color='#004574'
                    fontWeight='bold'
                    fontSize='1xl'
                    mr={2}>
                    Nombre Comercial:
                  </Text>
                  {props.tienda?.comercial_name || props.tienda?.social_razon}
                </Box>
                <Box mb={7}>
                  <Text
                    as='span'
                    color='#004574'
                    fontWeight='bold'
                    fontSize='1xl'
                    mr={2}>
                    Dirección Fiscal:
                  </Text>
                  {props.tienda.direction}
                </Box>
                <Box mb={7}>
                  <Text
                    as='span'
                    color='#004574'
                    fontWeight='bold'
                    fontSize='1xl'>
                    Tipo de Venta:
                  </Text>
                  &nbsp; {typeofsale_producto(props.tienda.type_of_sale || '')}
                </Box>
                {/* <Box mb={7}>
                  <Text
                    as='span'
                    color='#004574'
                    fontWeight='bold'
                    fontSize='1xl'>
                    Actividad económica:
                  </Text>
                  &nbsp;{props.tienda.activity}
                </Box> */}
              </Box>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <Box mt={20}>
                <Box
                  bg='#EEE'
                  p={3}
                  borderRightRadius='20'
                  borderLeftRadius='20'
                  mt='5'
                  textAlign='center'>
                  Desempeño:
                </Box>
                <Box mt='5'>
                  <Center> {iconChek} &nbsp; &nbsp; Bueno</Center>
                </Box>
                <Box
                  bg='#EEE'
                  textAlign='center'
                  p={3}
                  borderRightRadius='20'
                  borderLeftRadius='20'
                  mt='5'>
                  0 Ventas Concretadas
                </Box>
                <Center mt={5}>
                  <CVButton backgroundColor='blue'>VER OPINIONES</CVButton>
                </Center>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box mt={5}>
          <Box>
            <Text color='#004574' fontWeight='bold' fontSize='1xl'>
              Descripción de la empresa:
            </Text>
          </Box>
          <Box>{props.tienda.company_description}</Box>
          <Box mt={10}></Box>
        </Box>
      </Box>
    </Container>
  );
};
export default Informacion;
