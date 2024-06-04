import { list_coupons } from '@/app/api/graphql/webcoupon/WCouponService';
import { CVDataTable, CVPanel } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { cuponHeaders, cuponrows } from './CBODataTableUtils';

function CBODataTable({ filtro, setfiltro }) {
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);
  const [lista, setlista] = useState([]);

  const fetchdata = async (page = 1, limit = 10) => {
    setloading(true);
    const { info, coupons } = await list_coupons({
      itemsPage: limit,
      page,
      search: filtro.search,
      status: filtro.status
    });
    setloading(false);
    setpagination(info);
    setlista(coupons);
  };
  const reset = (page) => {
    fetchdata(page || pagination?.page);
  };

  useEffect(() => {
    fetchdata();
  }, [filtro]);

  return (
    <Box padding='1rem' backgroundColor='white' rounded='1rem'>
      <CVDataTable
        fetchdata={fetchdata}
        loading={loading}
        pagination={pagination}
        data={cuponrows({ lista: lista, fetchdata: reset })}
        headers={cuponHeaders({ filtro, setfiltro })}
      />
    </Box>
  );
}

export default CBODataTable;
