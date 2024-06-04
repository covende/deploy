import React from 'react';
import { Flex } from '@chakra-ui/react';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import { CVRenderHTML } from '@/common/CovendeTemplate/CVMethods';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function DevProducto({ producto, pedido }) {
  return (
    <Flex>
      <Flex>
        <CVImage image={producto.photo} height='50px' width='50px' />
      </Flex>
      <SizeBox />
      <Flex flexDirection='column' maxWidth='350px' overflow='auto' h='4rem'>
        <CVText fontWeight='600' color='blue'>
          ID Pedido: {pedido?.custom_id}
        </CVText>
        <CVText>{producto?.name}</CVText>
        <CVText variant='maxtext' lines={2} overflow='unset'>
          <CVRenderHTML>{producto?.featured_description}</CVRenderHTML>
        </CVText>
      </Flex>
    </Flex>
  );
}

export default DevProducto;
