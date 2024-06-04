import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CVImage, CVLine, CVText } from '../..';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVRenderHTML } from '../../CVMethods';

function CVMessageDetailsQuotation({ model }) {
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Flex width='100%'>
        <CVImage image={model?.product?.photo} width='75px' height='75px' />
        <SizeBox />
        <Box width='100%'>
          <CVText fontWeight='bold' color='blue'>
            {model?.product?.name}
          </CVText>
          <CVLine lineHeight='1px' color='lightGray' />
          <CVText>
            <span style={{ fontWeight: 'bold' }}>Cantidad:</span>
            {model?.quantity} {model?.measure_unit}
          </CVText>
          <CVText>
            <span style={{ fontWeight: 'bold' }}>
              Tiempo de entrega requerido:
            </span>
            {model?.delivery_time?.value} {model?.delivery_time?.type}
          </CVText>
          <SizeBox />
          {open ? (
            <Box maxH='200px' overflow='auto' width='100%'>
              <CVText>
                <CVRenderHTML>{model?.message}</CVRenderHTML>
              </CVText>
            </Box>
          ) : (
            <></>
          )}
          <Box onClick={() => setopen(!open)}>
            <CVText color='primary'>{open ? 'Ver Menos' : 'Ver Mas'}</CVText>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default CVMessageDetailsQuotation;
