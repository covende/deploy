import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVCheck, CVInput, CVText } from '@/common/CovendeTemplate';
import {
  isOnlyNumber,
  onlyNumber
} from '@/common/CovendeTemplate/CVValidation';
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

function CBOAdicionales({ adicionals, setadicionals }) {
  return (
    <Box>
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        3. Adicionales
      </CVText>
      <SizeBox />
      <Flex alignItems='center' width='100%'>
        <CVText color='blue'>Monto mínimo de compra</CVText>
        <SizeBox />
        <Box maxWidth='350px'>
          <CVInput
            error={
              adicionals.minimiun == ''
                ? false
                : !isOnlyNumber(adicionals.minimiun + '')
            }
            value={adicionals.minimiun}
            onChange={(value) =>
              setadicionals({ ...adicionals, minimiun: onlyNumber(value) })
            }
          />
        </Box>
        <SizeBox />
        <CVText color='gray'>soles</CVText>
      </Flex>
      <SizeBox />
      <CVCheck
        value={adicionals.inOffers}
        onChange={(value) => setadicionals({ ...adicionals, inOffers: value })}
        title='No aplica para productos en oferta'
        titleAlign='left'
        checkIcon={<AiOutlineCheck />}
      />
    </Box>
  );
}

export default CBOAdicionales;
