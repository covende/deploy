import { devolucion_by_buyer_id } from '@/app/api/graphql/webdevolucion/DevService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVDataTable, CVInput, CVRow, CVText } from '@/common/CovendeTemplate';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box } from '@chakra-ui/layout';
import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { DBHeaders, DBRows } from './components/DBUtils';
import DVCardProduct from './components/DVCardProduct';

function BuyerDevoluciones() {
  const [search, setsearch] = useState('');
  const [tmpSearch, setTmpSearch] = useState('');
  const [lista, setlista] = useState([]);
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(true);

  const fetchdata = async (page = 1, limit = 10) => {
    setloading(true);
    const us = getLoggedInUser();
    const result = await devolucion_by_buyer_id({
      buyer_id: us.user_id,
      page,
      limit,
      search
    });
    const formatdata = result.docs.map((item) => ({
      pedido_id: item.pedido_id,
      devolucion_id: item._id,
      reject_date: CVFormatDate({
        date: item?.request_date,
        time: true
      }),
      idpedido: item?.pedido?.custom_id,
      iddevolucion: item?.custom_id,
      buy_date: CVFormatDate({
        date: item?.pedido?.fecha_compra,
        time: true
      }),
      request_date: item.request_date,
      status: item.status,
      request_status: item?.request_status,
      product: item?.product,
      store: {
        name: item?.company?.comercial_name
      },
      pedido: item?.pedido
    }));
    setlista(formatdata);
    setpagination({ ...result, docs: [] });
    setloading(false);
  };

  useEffect(() => {
    fetchdata();
  }, [search]);

  return (
    <Container>
      <CVRow wrap='nowrap' justifyContent='space-between'>
        <CVText fontSize='1.5rem' color='red' fontWeight='bold'>
          Devoluciones
        </CVText>
        <CVInput
          width='350px'
          value={tmpSearch}
          onChange={setTmpSearch}
          buttonClick={() => setsearch(tmpSearch)}
          buttonColor='red'
          iconFind={true}
          color='red'
        />
      </CVRow>
      <SizeBox />
      <Box backgroundColor={COLORS['white']} rounded='1rem' padding='1rem'>
        {/* {lista.map((item) => (
          <DVCardProduct key={v4()} product={item} />
        ))} */}
        <CVDataTable
          pagination={pagination}
          loading={loading}
          fetchdata={fetchdata}
          headers={DBHeaders}
          data={DBRows(lista)}
        />
      </Box>
      <SizeBox />
    </Container>
  );
}

export default BuyerDevoluciones;
