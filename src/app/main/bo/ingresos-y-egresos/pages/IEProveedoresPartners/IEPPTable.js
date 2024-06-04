import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import CVDownload from '@CVTemplate/core/CVDownload';
import { IEPPData, IEPPHeader, IEPPRow } from './IEPPUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { PROVIDERS_PARTNERS_CSV } from '@CVApi/core/faq/ClienteAsist/HelpService';

const IEPPTable = ({
  filtro,
  setfiltro,
  partners,
  loading,
  pagination,
  setPage
}) => {
  const [providersExcel, setProvidersExcel] = useState();

  useEffect(() => {
    AxiosGQL(PROVIDERS_PARTNERS_CSV(filtro))
      .then(({ providersPartnersCSV }) =>
        setProvidersExcel(providersPartnersCSV)
      )
      .catch((err) => console.log(err));
  }, [filtro]);

  return (
    <Box>
      <CVDataTable
        headers={IEPPHeader(filtro, setfiltro)}
        data={IEPPRow(partners)}
        fetchdata={(page) => setPage(page)}
        pagination={pagination}
        loading={loading}
        Download={() => (
          <CVDownload
            fetchData={() => providersExcel && JSON.parse(providersExcel)}
          />
        )}
      />
    </Box>
  );
};

export default IEPPTable;
