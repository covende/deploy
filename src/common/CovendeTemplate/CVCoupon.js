import React, { useEffect, useState } from 'react';

// Components

import { Box, CircularProgress, Text } from '@chakra-ui/react';

/**
 *
 * @param {Function} param0.callback
 * @returns
 */
function CVCouponPay({ callback }) {
  const [activePayment, setactivePayment] = useState(true);

  const initdata = async () => {
    setactivePayment(false);
    setTimeout(() => {
      setactivePayment(true);
      callback({ status: true, data: {} });
    }, 800);
  };

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box width='700px' height='0px' color='white' borderRadius='10px'>
      <Text
        py='4px'
        color='#004772'
        fontSize='30px'
        fontStyle='normal'
        fontWeight='700'
        lineHeight='45px'
        letterSpacing='0em'></Text>

      <CircularProgress
        isIndeterminate
        color='covende.default.main'
        display={activePayment ? 'none' : 'grid'}
        width='100%'
        height='calc(100% - 53px)'
        justifyItems='center'
        alignItems='center'
      />
    </Box>
  );
}

export default CVCouponPay;
