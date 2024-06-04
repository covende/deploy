import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { rolemenu } from '@/app/helpers/role';
import { useHistory, useLocation } from 'react-router-dom';

function OptionBulkLoad({ isOpen, onClose, process }) {
  const history = useHistory();
  const location = useLocation();

  let bulkLoadProducts = () => {
    if (rolemenu() == '/bo/') {
      let position = location.pathname.indexOf('productos');
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=carga'
      );
    } else {
      history.push('/seller/productos/carga');
    }
  };

  return (
    <CVModal isOpen={isOpen} onClose={onClose}>
      <SizeBox />
      <Flex
        flexDirection='column'
        justifyContent='flex-center'
        alignItems='center'>
        <CVButton
          width='90%'
          backgroundColor='blue'
          fontWeight='bold'
          height='3rem'
          onClick={() => bulkLoadProducts()}>
          Carga Masiva de productos
        </CVButton>

        <SizeBox />

        <CVButton
          width='90%'
          backgroundColor='yellow'
          fontWeight='bold'
          height='3rem'
          onClick={() => process('stock')}>
          Actualizar precio o stock
        </CVButton>

        <SizeBox />

        <CVButton
          width='90%'
          backgroundColor='skyblue'
          fontWeight='bold'
          height='3rem'
          onClick={() => process('preparationTime')}>
          Actualizar tiempo de preparación
        </CVButton>

        <SizeBox />

        <CVButton
          width='90%'
          backgroundColor='green'
          fontWeight='bold'
          height='3rem'
          onClick={() => process('offer')}>
          Actualizar promoción
        </CVButton>

        <SizeBox />
        <CVButton
          width='90%'
          backgroundColor='blue'
          fontWeight='bold'
          height='3rem'
          onClick={() => process('updateProductos')}>
          Actualización Masiva de productos
        </CVButton>
      </Flex>
    </CVModal>
  );
}

export default OptionBulkLoad;
