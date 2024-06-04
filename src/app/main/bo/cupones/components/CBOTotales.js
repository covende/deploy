import { coupon_status_counter } from '@/app/api/graphql/webcoupon/WCouponService';
import { CVButton, CVPanel } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function CBOTotales({ filtro, setfiltro }) {
  const [totales, settotales] = useState([]);

  const values = {
    Todos: '',
    Activos: 'Activo',
    Expirados: 'Expirado',
    Programados: 'Programado',
    Cancelados: 'Cancelado'
  };

  const initdata = async () => {
    const result = await coupon_status_counter();
    settotales(result);
  };

  useEffect(() => {
    initdata();
  }, []);
  return (
    <CVPanel>
      <Flex justifyContent='space-around' width='100%' wrap='wrap'>
        {totales.map((item) => (
          <Box key={v4()} display='flex' width='19%'>
            <CVButton
              width='100%'
              height='4rem'
              fontSize='1.5rem'
              borderRadius='1rem'
              backgroundColor={item.background_color}
              onClick={() =>
                setfiltro({ ...filtro, status: values[item.name] })
              }>
              {item.name}({item.total})
            </CVButton>
          </Box>
        ))}
      </Flex>
    </CVPanel>
  );
}

export default CBOTotales;
