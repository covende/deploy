import React, { useEffect, useState } from 'react';
import IEPPTable from './IEProveedoresPartners/IEPPTable';

import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';

import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import IEPPFiltro from './IEProveedoresPartners/IEPPFiltro';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { PROVIDERS_PARTNERS } from '@CVApi/core/faq/ClienteAsist/HelpService';
import { formatpaginate } from '@/common/utils/methods';

const IEProveedoresPartners = () => {
  const [filtro, setfiltro] = useState({
    search: '',
    daterange: [new Date(), new Date()],
    status: 'PROCESED',
    firstTime: true
  });
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [partners, setPartners] = useState([]);

  function getProviders() {
    setLoading(true);
    AxiosGQL(PROVIDERS_PARTNERS(filtro, page))
      .then(({ providersPartners }) => {
        if (providersPartners.status) {
          setPagination(formatpaginate(providersPartners.info));
          setPartners(providersPartners.providersPartners);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProviders();
  }, [filtro, page]);
  return (
    <CVPanel height='auto' variant='box'>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Proveedores & Partners
        </CVText>
        <Box></Box>
      </Flex>
      <SizeBox />
      <IEPPFiltro filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <IEPPTable
        filtro={filtro}
        setfiltro={setfiltro}
        partners={partners}
        pagination={pagination}
        loading={loading}
        setPage={setPage}
      />
    </CVPanel>
  );
};

export default IEProveedoresPartners;
