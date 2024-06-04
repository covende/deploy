import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import {
  DEPOSITS_PER_WEEK_CUT,
  DEPOSITS_PER_WEEK_EXCEL
} from '@CVApi/core/incomeAndExpenses/deposits/depositsPerWeekCut';
import { formatpaginate } from '@/common/utils/methods';
import { IEDepHeader, IEDepRow } from './IEDepUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import CVDownload from '@CVTemplate/core/CVDownload';

const IEDepTable = ({ filtro }) => {
  const [lista, setlista] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState({});

  const initdata = async (page = 1) => {
    setloading(true);
    AxiosGQL(DEPOSITS_PER_WEEK_CUT(filtro.search, page))
      .then(({ weeklyCuts }) => {
        if (weeklyCuts.status) {
          if (weeklyCuts?.info) {
            setlista(
              (weeklyCuts.weeklyCuts || []).map((cut, ndx) => {
                return {
                  ...cut,
                  number:
                    ndx +
                    1 +
                    (weeklyCuts?.info?.page - 1) * weeklyCuts?.info?.itemsPage
                };
              })
            );
          }
          setpagination(formatpaginate(weeklyCuts.info));
        }
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
    console.log({ filtro });
  };
  useEffect(() => {
    initdata();
  }, [filtro]);
  return (
    <Box>
      <CVDataTable
        headers={IEDepHeader}
        data={IEDepRow(lista)}
        pagination={pagination}
        loading={loading}
        fetchdata={initdata}
        Download={() => (
          <CVDownload
            fetchData={() =>
              AxiosGQL(DEPOSITS_PER_WEEK_EXCEL(filtro.search))
                .then(
                  ({ weeklyCutsCSV }) =>
                    weeklyCutsCSV && JSON.parse(weeklyCutsCSV)
                )
                .catch((err) => console.log(err))
            }
          />
        )}
      />
    </Box>
  );
};

export default IEDepTable;
