import React, { useEffect, useState } from 'react';
import { Flex, Text, Box, useDisclosure } from '@chakra-ui/react';

import { useToast } from '@chakra-ui/toast';

import { CompaniesCategoriesBoContainer } from './CompaniesCategoriesBo.styles';
import CustomerFiltros from './CustomerFiltros';
import { columnsData, inputDataProcessed } from './utils';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import { ALL_COMPANIES_CATEGORIES } from '@CVApi/core/webbo/BClientService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import MFilterCategories from '@CVPages/core/bo/clientes/components/MFilterCategories';
import { formatFecha, formatpaginate } from '@/common/utils/methods';
import CVDownloadRest from '@CVTemplate/core/CVDownloadRest';
// import CustomTable from './components/CustomTable';
// import CustomModal from './components/CustomModal';
// import { useDisclosure } from '@chakra-ui/hooks';
// import useGetPermisions from '@/common/hooks/useGetPermisions';

// Page
function CompaniesCategoriesBo() {
  const [companies, setCompanies] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [loadings, setLoadings] = useState(true);
  const addToast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [total, setTotal] = useState(0);
  const permissions = useGetPermisions(
    'Backoffice',
    'Arborescencia de categorías'
  );

  const initFilter = {
    bloqueados: 'ALL',
    verificados: 'ALL',
    categories: [],
    datestart: '',
    dateend: '',
    tipo: '',
    search: '',
    ejecutivo: 'ALL',
    ambiente: 'PRODUCTION',
    firstTime: true,
    rangeTime: false,
    singleTime: ''
  };

  const [filtros, setfiltros] = useState(initFilter);

  const fetchdata = async (page = 1, limit = 10, filter = initFilter) => {
    setLoadings(true);
    try {
      const { allCompanies: resp } = await AxiosGQL(
        ALL_COMPANIES_CATEGORIES(page, limit, filter)
      );

      if (resp?.data) setCompanies(resp.data);
      if (resp?.info) setPaginate(formatpaginate(resp?.info));

      setTotal(resp?.info?.total || 0);
      setLoadings(false);
    } catch (error) {
      console.log(error);
    }
  };

  const download = async () => {
    let start_date = formatFecha(filtros?.datestart),
      end_date = formatFecha(filtros?.dateend);

    let body = {
      search: filtros?.search || '',
      environment: filtros?.ambiente || '',
      asesor: filtros?.ejecutivo || '',
      categories: filtros?.categories || []
    };

    if (end_date != start_date)
      body.date_range = {
        desde: start_date,
        hasta: end_date
      };

    return { body, url: '/api.companies-bo' };
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <Flex flex={1} p={4}>
      <CompaniesCategoriesBoContainer>
        <Text fontWeight='bold' color='#004474' fontSize='1.5rem'>
          Tiendas
        </Text>
        <br />
        <CustomerFiltros
          filtros={filtros}
          setfiltros={setfiltros}
          fetchdata={fetchdata}
          initFilter={initFilter}
          onOpenCategories={onOpen}
        />
        <br />
        <CVDataTable
          loading={loadings}
          pagination={paginate}
          fetchdata={(page) => fetchdata(page, 10, filtros)}
          headers={columnsData}
          data={inputDataProcessed(
            companies,
            {
              cflagValidated: () => {},
              cflagactive: () => {},
              cdeleteitem: () => {},
              page: paginate?.page || 0
            },
            permissions
          )}
          Download={() => (
            <CVDownloadRest fetchData={download} fileName='tiendas' />
          )}
        />
        <Box ml='1rem' mt='1rem'>
          <Text fontSize='1rem'>{total} Clientes</Text>
        </Box>

        <MFilterCategories
          isOpen={isOpen}
          onClose={onClose}
          categories={filtros.categories}
          setCategories={(categories) => {
            setfiltros({ ...filtros, categories });
            fetchdata(1, 10, { ...filtros, categories });
          }}
        />
      </CompaniesCategoriesBoContainer>
    </Flex>
  );
}

export default CompaniesCategoriesBo;
