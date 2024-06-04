import useGetPermisions from '@/common/hooks/useGetPermisions';
import { Flex, Text } from '@chakra-ui/react';
import { Container } from '@material-ui/core';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Filtros from './components/Filtros';
import TableData from './components/TableData';

function BuyerPedidos() {
  const permissions = useGetPermisions('Comprar', 'Pedidos');
  const [filtros, setfiltros] = useState({
    tipo: 'ALL',
    search: '',
    time: 'all'
  });
  const buttonref = useRef();
  return (
    <Container>
      <Flex justifyContent='space-between'>
        <Text fontSize='1.5rem' fontWeight='bold' textColor='#FF5454'>
          Pedidos
        </Text>
        {permissions.ver && (
          <Link
            to='/buyer/cotizacion'
            style={{
              color: '#5164C4',
              border: '1px solid #5164C4',
              paddingRight: '1rem',
              paddingLeft: '1rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center'
            }}>
            IR A MIS COTIZACIONES
          </Link>
        )}
      </Flex>
      <br />
      {permissions.ver && (
        <Filtros
          filtro={filtros}
          setfiltro={setfiltros}
          buttonref={buttonref}
        />
      )}
      <br />
      <TableData
        setreference={(ref) => (buttonref.current = ref)}
        selectable
        filtro={filtros}
        permissions={permissions}
      />
    </Container>
  );
}

export default BuyerPedidos;
