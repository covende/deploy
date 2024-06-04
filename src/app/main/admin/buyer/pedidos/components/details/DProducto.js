import { PRODUCT_REVIEW_BY_CUSTOMER } from '@/app/api/graphql/webbuyer/WBReviewTypes';
import { PUBLIC_PRODUCT_BY_ID } from '@/app/api/graphql/webpublic/products/CartService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVImage,
  CVPanel,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import { CVRenderHTML } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

function DProducto({ pedido, product, onOpen, setapplyto, reload }) {
  const [puntuacion, setpuntuacion] = useState(0);
  const initdata = async () => {
    const { productReviewByCustomer } = await AxiosGQL(
      PRODUCT_REVIEW_BY_CUSTOMER({
        product_id: pedido.product_id,
        customer_id: pedido.buyer_id
      })
    );
    setpuntuacion(productReviewByCustomer?.rating || 0);
  };

  useEffect(() => {
    initdata();
  }, [pedido, reload]);

  return (
    <Box>
      <SizeBox />
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        Detalles de Producto
      </CVText>
      <SizeBox />
      <CVPanel itemsAlign='center'>
        <CVImage
          width='75px'
          height='75px'
          borderRadius='1rem'
          image={product?.photo || 'https://via.placeholder.com/150'}
        />

        <SizeBox />
        <Box width='100%' height='100%'>
          <CVText color='blue' fontWeight='bold'>
            {product?.name || ''}
          </CVText>

          <CVText variant='maxtext' lines={3} overflow='auto'>
            <CVRenderHTML>{product?.featured_description || ''}</CVRenderHTML>
          </CVText>

          <Flex justifyContent='space-between' marginTop='1rem'>
            <CVRating height='2rem' puntuation={product?.stars} />
            {/* <CVRating height='2rem' puntuation={puntuacion} /> */}
            <CVButton
              disabled={puntuacion > 0}
              color='yellow'
              fontWeight='bold'
              variant='outlined'
              onClick={() => {
                setapplyto('product');
                onOpen();
              }}>
              <AiFillStar style={{ color: COLORS['yellow'] }} />
              <SizeBox />
              CALIFICAR
            </CVButton>
          </Flex>
        </Box>
      </CVPanel>
    </Box>
  );
}

export default DProducto;
