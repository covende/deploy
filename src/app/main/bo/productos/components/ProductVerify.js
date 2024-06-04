import { FIND_PRODUCT_INIT } from '@/app/api/graphql/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Divider, Flex, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DescritionProduct from './vproducto/DescritionProduct';
import HeaderProduct from './vproducto/HeaderProduct';
import OtherProduct from './vproducto/OtherProduct';
import PresentationProduct from './vproducto/PresentationProduct';
import PricesProduct from './vproducto/PricesProduct';

function ProductVerify(props) {
  const [loading, setLoading] = useState(true);
  const [producto, setproducto] = useState(null);
  const findproduct = async (product_id, store_id) => {
    let { productById } = await AxiosGQL(
      FIND_PRODUCT_INIT({ product_id, store_id })
    );
    setLoading(false);
    if (productById?.status) {
      setproducto(productById.product);
    }
  };

  useEffect(() => {
    const { product_id, store_id } = props.match.params;
    findproduct(product_id, store_id);
  }, []);
  return loading ? (
    <Skeleton height='100vh' />
  ) : producto == null ? (
    <Box>Error: Producto no encontrado</Box>
  ) : (
    <Box rounded='1rem' backgroundColor='#FFFFFF'>
      <HeaderProduct producto={producto} setproducto={setproducto} />

      <Divider />

      <Box padding='2rem'>
        <PresentationProduct producto={producto} />
        <SizeBox height='2rem' />
        <Divider />
        <DescritionProduct producto={producto} />
        <SizeBox />
        <Divider />
        <PricesProduct producto={producto} />
        <SizeBox />
        <Divider />
        <OtherProduct producto={producto} />
        <SizeBox height='3rem' />
        <Flex justifyContent='center'>
          <Link
            to='/bo/productos'
            style={{
              border: '1px solid #FF5454',
              color: '#FF5454',
              fontWeight: 'bold',
              borderRadius: '20px',
              padding: '0px 1rem'
            }}>
            Regresar a lista
          </Link>
        </Flex>
        <br />
        <br />
        <br />
      </Box>
    </Box>
  );
}

export default ProductVerify;
