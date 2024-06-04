import React from 'react';

import { Flex, Box, Stack, Text } from '@chakra-ui/react';
import { listaLogos } from './FooterBrand.data';
import { CVImage, CVLine, CVPanel, CVText } from '@/common/CovendeTemplate';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import subPanel from '@/app/assets/images/logo/subPanel.svg';
import SubPanel2 from '@/app/assets/images/logo/SubPanel2.svg';

import useWindowSize from '@/common/hooks/useWindowSize';
function FooterBrand() {
  const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;

  return (
    // <Stack>
    <>
      {/* <CVLine color='gray' lineHeight='1px' /> */}
      {/*       
      <SizeBox height='2rem' /> */}
      <Box maxW='100%'>
        <CVImage image={isMobile ? SubPanel2 : subPanel} width='auto' />
      </Box>
      {/* <SizeBox height='2rem' /> */}
      {/* <CVPanel
        padding='1rem'
        borderRadius={0}
        itemDirection='column'
        itemsAlign='center'
        backgroundColor='primary'>
        <CVText color='white' fontWeight='bold' fontSize='1.25rem'>
          Covende está
          <SizeBox width='0.35rem' />
          <CVText color='blue' fontWeight='bold' fontSize='1.25rem'>
            autorizado por Visa
          </CVText>
          <SizeBox width='0.35rem' />
          para realizar transacciones electrónicas.
        </CVText>
      </CVPanel> */}

      <Flex
        align='center'
        justify='space-around'
        wrap='wrap'
        w='100%'
        p={8}
        padding='16px 16px 0px 16px'>
        {listaLogos.map((item) => (
          <Box key={v4()} maxW='100%'>
            <CVImage
              height={isMobile ? '14px' : '32px'}
              image={item.src}
              width='auto'
            />
          </Box>
        ))}
      </Flex>
    </>
    //</Stack>
  );
}

export default FooterBrand;
