import React from 'react';
import { CVColumn, CVImage, CVRow, CVText } from '@/common/CovendeTemplate';
// UI Components
import { Center, Divider, HStack, Text, Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { v4 } from 'uuid';

const VendedorPorAprobar = (props) => (
  <CVRow
    style={{
      borderRadius: '12px',
      borderTop: '1px solid #CDCCCC',
      borderRight: '1px solid #CDCCCC',
      borderBottom: '1px solid #CDCCCC',
      borderLeft: '15px solid #00ADF6',
      minHeight: '90px',
      marginBottom: '0.5rem'
    }}
    wrap='nowrap'
    alignItems='center'
    justifyContent='space-between'>
    <CVImage
      variant='avatar'
      height='68px'
      width='68px'
      image={props.customer.photo}
      name={props.customer.comercial_name}
    />
    <SizeBox />
    <Center margin='auto' height='70px'>
      <Divider orientation='vertical' width='2px' color='#D4D4D4' />
    </Center>
    <SizeBox />
    <CVColumn wrap='nowrap' justifyContent='center' height='80px'>
      <HStack>
        <Text variant='primary-xxs'>ID: </Text>
        <Text variant='normal-xxs'>{props.customer.id}</Text>
      </HStack>
      <HStack>
        <Text variant='primary-xxs'>Nombre Comercial: </Text>
        <Text variant='normal-xxs'>{`${props.customer.comercial_name}`}</Text>
      </HStack>
      <HStack>
        <Text variant='primary-xxs'>DNI o RUC: </Text>
        <Text variant='normal-xxs'>{props.customer.ruc}</Text>
      </HStack>
      <HStack>
        <Text variant='primary-xxs'>Fecha de Registro: </Text>
        <Text variant='normal-xxs'>{props.customer.register_date}</Text>
      </HStack>
    </CVColumn>

    <CVColumn
      width='50px'
      height='80px'
      justifyContent='space-between'
      alignItems='center'
      //alignItems='end'
      style={{ padding: '1rem' }}>
      <CVImage image='https://i.imgur.com/UTddABJ.png' />
      <CVImage
        link={`/bo/clientes/${props.customer.customer_id}/information`}
        image='https://i.imgur.com/9r1ajai.png'
      />
      <CVImage image='https://i.imgur.com/xd4dBgK.png' /> 
    </CVColumn>
  </CVRow>
);

function VendedoresNoAprobados({ pendingSellers }) {
  return (
    <Box backgroundColor='#FFFFFF' padding='1rem' rounded='1rem'>
      <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
        Vendedores por aprobar
      </CVText>
      <SizeBox />
      <CVColumn style={{ maxHeight: '350px' }} overflow='auto' wrap='nowrap'>
        {pendingSellers &&
          pendingSellers.map((item) => (
            <VendedorPorAprobar key={v4()} customer={item} />
          ))}
      </CVColumn>
    </Box>
  );
}

export default VendedoresNoAprobados;
