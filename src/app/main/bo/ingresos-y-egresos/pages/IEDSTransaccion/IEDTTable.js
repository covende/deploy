import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import { IEDTHeader, IEDTRow } from './IEDTUtils';
import CVDownload from '@CVTemplate/core/CVDownload';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  TRANSACTIONS_WEEKLY_CUT,
  TRANSACTIONS_WEEKLY_EXCEL
} from '@CVApi/core/incomeAndExpenses/deposits/depositsPerWeekCut';
import CVInput from '@CVTemplate/core/CVInput';
import { formatpaginate } from '@/common/utils/methods';

const IEDTTable = ({ store_id, cut_code, isViewStoreName }) => {
  const [loading, setloading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [itemsPage, setItemsPage] = useState(0);
  const [page, setPage] = useState(1);

  const [transactionData, setTransactionData] = useState([]);
  const fetchData = () => {
    setloading(true);
    AxiosGQL(TRANSACTIONS_WEEKLY_CUT(cut_code, itemsPage, page, store_id))
      .then(({ transactionsWeeklyCut }) => {
        if (transactionsWeeklyCut?.info) {
          setTransactionData(
            (transactionsWeeklyCut.transactionsWeeklyCut || []).map(
              (transaction, ndx) => {
                return {
                  ...transaction,
                  number:
                    ndx +
                    1 +
                    (transactionsWeeklyCut.info?.page - 1) *
                      transactionsWeeklyCut.info?.itemsPage
                };
              }
            )
          );
        }
        setPagination(formatpaginate(transactionsWeeklyCut.info));
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, [itemsPage, page]);
  return (
    <Box>
      <Flex w='15rem'>
        <CVInput
          type='number'
          value={itemsPage == 0 ? 'todos' : itemsPage}
          onChange={(value) => setItemsPage(value)}
          title='Número de registros'
        />
      </Flex>
      <CVDataTable
        headers={IEDTHeader(isViewStoreName)}
        data={IEDTRow(transactionData, isViewStoreName)}
        pagination={pagination}
        fetchdata={(page) => setPage(page)}
        loading={loading}
        Download={() => (
          <CVDownload
            fetchData={() =>
              AxiosGQL(TRANSACTIONS_WEEKLY_EXCEL(cut_code, store_id))
                .then(
                  ({ transactionsWeeklyCutCSV }) =>
                    transactionsWeeklyCutCSV &&
                    JSON.parse(transactionsWeeklyCutCSV)
                )
                .catch((err) => console.log(err))
            }
          />
        )}
      />
    </Box>
  );
};

export default IEDTTable;
