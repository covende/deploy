import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { Box } from '@chakra-ui/react';
import React from 'react';

function PaymentCart({ paymethods, tipopago, settipopago }) {
  return (
    <Box backgroundColor='#FFFFFF' rounded='1rem' padding='1rem'>
      <CVText fontSize='1.25rem' fontWeight='bold' color='blue'>
        Método de Pago
      </CVText>
      <CVRadio
        itemDirection='column'
        value={tipopago}
        onChange={(value) => settipopago(value)}
        options={paymethods.map((item) => ({
          value: item._id + '|' + item.code,
          text: (
            <Box display='flex' alignItems='center'>
              <CVText>{item.title}</CVText>
              <SizeBox />
              <CVImage height='2rem' width='auto' image={item.image} />
            </Box>
          )
        }))}
      />
    </Box>
  );
}

export default PaymentCart;
