import { CVDataTable } from '@/common/CovendeTemplate';
import React, { useEffect, useState } from 'react';
import { quotations_by_user_id } from '@/app/api/graphql/webquotation/QService';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { formatpaginate } from '@/common/utils/methods';
import { BCRows, BVHeaders } from './CotUtils';
import { Box } from '@chakra-ui/react';
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';
import CVInputImageGallery from '@CVTemplate/core/CVInputImageGallery';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';

function TableData({ filtro }) {
  const [pagination, setpagination] = useState({});
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);

  const ExpandData = ({ params, item }) => (
    <Box padding='2rem'>
      <CVText>
        <span style={{ fontWeight: 'bold' }}>Cantidad:&nbsp;</span>
        {item?.quantity} {item?.measure_unit}
      </CVText>
      <CVText>
        <span style={{ fontWeight: 'bold' }}>
          Tiempo de entrega requerido:&nbsp;
        </span>
        {item?.delivery_time?.value} {item?.delivery_time?.type}
      </CVText>
      <SizeBox />
      <CVRenderHTML>{item?.message}</CVRenderHTML>
      <SizeBox />

      {item?.file && (
        <CVInputImageGallery
          readOnly={true}
          mainText={false}
          gallery={item.file.split(',')}
          imageHeight='100px'
          imageWidth='100px'
          limit={item.file.split(',').length}
          justifyContent='start'
        />
      )}
    </Box>
  );

  const initdata = async (page = 1, itemsPage = 10) => {
    setloading(true);
    const us = getLoggedInUser();
    const { info, quotations } = await quotations_by_user_id({
      user_id: us.user_id,
      itemsPage,
      page
    });
    setpagination(formatpaginate(info));
    setlista(quotations);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, []);
  return (
    <CVDataTable
      fetchdata={initdata}
      loading={loading}
      pagination={pagination}
      data={BCRows(lista)}
      headers={BVHeaders}
      ExpandData={ExpandData}
    />
  );
}

export default TableData;
