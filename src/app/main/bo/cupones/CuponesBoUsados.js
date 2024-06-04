import React, { useEffect, useState } from 'react';
import {
  CVDataTable,
  CVDownload,
  CVInput,
  CVPanel,
  CVText
} from '@/common/CovendeTemplate';
import { CUBOHeaders, CUBORows } from './CuponesBoUsadosUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box } from '@chakra-ui/layout';
import { used_coupons } from '@/app/api/graphql/webcoupon/WCouponService';

function CuponesBoUsados() {
  const [pagination, setpagination] = useState({});
  const [search, setsearch] = useState('');
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(true);

  const initdata = async (page = 1, limit = 10) => {
    setloading(true);
    const { info, coupons } = await used_coupons({
      itemsPage: limit,
      page,
      name: search
    });

    setlista(coupons);
    setpagination(info);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, [search]);

  return (
    <CVPanel padding='3rem' itemDirection='column' height='95%'>
      <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
        Lista de cupones usados
      </CVText>

      <Box>
        <SizeBox />
      </Box>

      <Box maxWidth='350px'>
        <CVInput
          value={search}
          onChange={(value) => setsearch(value)}
          iconFind={true}
        />
      </Box>

      <Box>
        <SizeBox />
      </Box>

      <Box width='100%'>
        <CVDataTable
          loading={loading}
          headers={CUBOHeaders}
          data={CUBORows(lista)}
          pagination={pagination}
          Download={() => <CVDownload />}
        />
      </Box>
    </CVPanel>
  );
}

export default CuponesBoUsados;
