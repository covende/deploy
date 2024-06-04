import { Eye } from '@/app/assets/icons/index';
import { svgDelete } from '@/app/assets/images/SVG';
import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';

const ProductVerifyAction = ({
  product_id,
  store_id,
  action,
  permisionsProductBO
}) => {
  return (
    <Flex alignItems='center'>
      {permisionsProductBO.ver && (
        <Link
          style={{ margin: 'auto' }}
          to={'/bo/productos/' + product_id + '/' + store_id + '/verifica'}>
          {Eye}
        </Link>
      )}
      {permisionsProductBO.eliminar && (
        <Button colorScheme='teal' variant='ghost' onClick={() => action()}>
          {svgDelete}
        </Button>
      )}
    </Flex>
  );
};

export default ProductVerifyAction;
