import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import { IESData, IESHeader, IESRow } from './IESUtils';
import CVDownload from '@CVTemplate/core/CVDownload';
import { formatpaginate } from '@/common/utils/methods';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { SUBSCRIPTIONS_PAGINATION } from '@CVApi/core/incomeAndExpenses/subscriptions/HelpSubscriptions';
import useGetPermisions from '@/common/hooks/useGetPermisions';

const IESTable = ({ filtro, download }) => {
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState();
  const [firstTime, setFirstTime] = useState(true);
  const PermisionsIngresosYE = useGetPermisions(
    'Backoffice',
    'Ingresos y Egresos'
  );

  const initdata = (page = 1) => {
    AxiosGQL(SUBSCRIPTIONS_PAGINATION(filtro, firstTime, page))
      .then(({ subscriptionsPagination }) => {
        if (subscriptionsPagination) {
          setlista(subscriptionsPagination.usersSubscription);
          setpagination(formatpaginate(subscriptionsPagination.info));
        }
      })
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    setFirstTime(false);
    initdata();
  }, [filtro]);
  return (
    <Box>
      <CVDataTable
        headers={IESHeader}
        fetchdata={initdata}
        data={IESRow(lista, PermisionsIngresosYE)}
        pagination={pagination}
        loading={loading}
        Download={() => <CVDownload fetchData={download} />}
      />
    </Box>
  );
};

export default IESTable;
