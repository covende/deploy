import { coupon_status_counter } from '@/app/api/graphql/webcoupon/WCouponService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVButton, CVPanel } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COMPANIES_CUT_SALE_PAYMENT_STATUS_TOTALES } from '@CVApi/core/faq/ClienteAsist/HelpService';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function CBOTotales({ setPaymentStatus, cut_code }) {
  const [pending, setPending] = useState(0);
  const [paid, setPaid] = useState(0);
  const [total, setTotal] = useState(0);

  const values = {
    pending: {
      text: 'PENDIENTE',
      color: 'yellow'
    },
    paid: {
      text: 'PAGADO',
      color: 'green'
    },
    total: {
      text: 'TOTAL',
      color: 'blue'
    }
  };

  const initdata = async () => {
    AxiosGQL(COMPANIES_CUT_SALE_PAYMENT_STATUS_TOTALES(cut_code))
      .then(({ companyCutStatusCounter }) => {
        companyCutStatusCounter.pending &&
          setPending(companyCutStatusCounter.pending);
        companyCutStatusCounter.paid && setPaid(companyCutStatusCounter.paid);
        companyCutStatusCounter.total &&
          setTotal(companyCutStatusCounter.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    initdata();
  }, []);
  return (
    <CVPanel>
      <Flex justifyContent='space-around' width='100%' wrap='wrap'>
        <Box key={v4()} display='flex' w={{ base: '100%', md: '30%' }}>
          <CVButton
            width='100%'
            height='4rem'
            fontSize='1.5rem'
            borderRadius='1rem'
            backgroundColor={values.total.color}
            onClick={() => setPaymentStatus('ALL')}>
            {values.total.text}({total})
          </CVButton>
        </Box>
        <SizeBox />
        <Box key={v4()} display='flex' w={{ base: '100%', md: '30%' }}>
          <CVButton
            width='100%'
            height='4rem'
            fontSize='1.5rem'
            borderRadius='1rem'
            backgroundColor={values.pending.color}
            onClick={() => setPaymentStatus('PENDING')}>
            {values.pending.text}({pending})
          </CVButton>
        </Box>
        <SizeBox />
        <Box key={v4()} display='flex' w={{ base: '100%', md: '30%' }}>
          <CVButton
            width='100%'
            height='4rem'
            fontSize='1.5rem'
            borderRadius='1rem'
            backgroundColor={values.paid.color}
            onClick={() => setPaymentStatus('PAID')}>
            {values.paid.text}({paid})
          </CVButton>
        </Box>
      </Flex>
    </CVPanel>
  );
}

export default CBOTotales;
