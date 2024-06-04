import { formatpaginate } from '@/common/utils/methods';
import { account_refunds } from '@CVApi/core/webreembolso/ReemServices';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import CVGridText from '@CVTemplate/core/CVGridText';
import React, { useEffect, useState } from 'react';
import { RData, RHeaders } from './RUtils';
import { Box, Flex } from '@chakra-ui/react';
import CVDownload from '@CVTemplate/core/CVDownload';

const RTable = ({ filtro, setfiltro, setref }) => {
  const [pagination, setpagination] = useState({});
  const [loading, setloading] = useState(false);
  const [lista, setlista] = useState([]);
  const [dataExcel, setDataExcel] = useState();

  const ExpandData = ({ item, params }) => (
    <Box>
      <Flex>
        <CVGridText
          maxWidth='400px'
          options={[
            { title: 'ID Procedencia:', content: item?.idprovenance },
            { title: 'Fecha de depósito:', content: item?.deposit_date },
            { title: 'Agente Covende:', content: item?.agent_covende }
          ]}
        />
      </Flex>
    </Box>
  );

  const initdata = async (page = 1, limit = 10) => {
    setloading(true);
    const { accountRefundsCSV, datos, info } = await account_refunds({
      page,
      provenance: filtro?.provenance,
      coupon_refund: filtro?.coupon_refund,
      deposited: filtro?.deposited,
      itemsPage: limit,
      desde: filtro?.daterange[0],
      hasta: filtro?.daterange[1],
      search: filtro?.search
    });
    setDataExcel(accountRefundsCSV);
    setloading(false);
    setlista(datos);
    setpagination(formatpaginate(info));
  };

  useEffect(() => {
    initdata(1, 10);
  }, [filtro]);

  return (
    <CVDataTable
      headers={RHeaders(filtro, setfiltro)}
      data={RData(lista)}
      pagination={pagination}
      loading={loading}
      fetchdata={initdata}
      ExpandData={ExpandData}
      selectable={true}
      selectedAction={(selecteds) =>
        localStorage.setItem('selecteds', JSON.stringify(selecteds))
      }
      selectedComponente={<Box ref={(ref) => setref(ref)}></Box>}
      Download={() => (
        <CVDownload fetchData={() => dataExcel && JSON.parse(dataExcel)} />
      )}
    />
  );
};

export default RTable;
