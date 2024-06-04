import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import CVDownload from '@CVTemplate/core/CVDownload';
import { IEPHeader, IEPRow } from './IEPUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  ORDERS_INCOME,
  ORDERS_INCOME_EXCEL
} from '@CVApi/core/faq/ClienteAsist/HelpService';
import { formatpaginate } from '@/common/utils/methods';

const IEPTable = ({ filtro, type }) => {
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({});
  const [page, setPage] = useState(1);
  console.log({ filtro });
  const initdata = async () => {
    setloading(true);
    AxiosGQL(ORDERS_INCOME(type, filtro, page))
      .then(({ ordersIncome }) => {
        console.log(ordersIncome);
        setlista(ordersIncome?.ordersIncome);
        setpagination(formatpaginate(ordersIncome.info));
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  useEffect(() => {
    initdata();
  }, [filtro, page]);
  return (
    <Box>
      <CVDataTable
        headers={IEPHeader}
        data={IEPRow(lista)}
        pagination={pagination}
        fetchdata={(page) => setPage(page)}
        loading={loading}
        Download={() => (
          <CVDownload
            fetchData={() => {
              return AxiosGQL(ORDERS_INCOME_EXCEL(type, filtro))
                .then(
                  ({ ordersIncomeCSV }) =>
                    ordersIncomeCSV && JSON.parse(ordersIncomeCSV)
                )
                .catch((err) => console.log(err));
            }}
          />
        )}
      />
    </Box>
  );
};

export default IEPTable;
