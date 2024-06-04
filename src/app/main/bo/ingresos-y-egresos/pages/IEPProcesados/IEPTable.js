import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import CVDownload from '@CVTemplate/core/CVDownload';
import { IEPData, IEPHeader, IEPRow } from './IEPUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ORDERS_INCOME } from '@CVApi/core/faq/ClienteAsist/HelpService';

const IEPTable = ({ filtro }) => {
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({});

  const initdata = async () => {
    console.log({ filtro });
    AxiosGQL(ORDERS_INCOME(true)).then((res) => {
      setlista(res.ordersIncome?.ordersIncome);
    });
    setlista(IEPData);
  };

  useEffect(() => {
    initdata();
  }, [filtro]);
  return (
    <Box>
      <CVDataTable
        headers={IEPHeader}
        data={IEPRow(lista)}
        pagination={pagination}
        loading={loading}
        Download={() => <CVDownload />}
      />
    </Box>
  );
};

export default IEPTable;
