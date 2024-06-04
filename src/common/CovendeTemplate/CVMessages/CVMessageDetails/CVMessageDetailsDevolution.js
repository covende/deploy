import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CVImage, CVText } from '../..';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVRenderHTML } from '../../CVMethods';

function CVMessageDetailsDevolution({ model }) {
  return (
    <Box>
      <Flex>
        <CVImage image={model?.product?.photo} width='75px' height='75px' />
        <SizeBox />
        <Box>
          <CVText fontWeight='bold' color='blue'>
            {model?.product?.name}
          </CVText>
          <CVText fontWeight='bold'>{model?.company?.comercial_name}</CVText>
          <CVText variant='maxtext' lines={3}>
            <CVRenderHTML>{model?.product?.featured_description}</CVRenderHTML>
          </CVText>
        </Box>
      </Flex>
    </Box>
  );
}

export default CVMessageDetailsDevolution;
