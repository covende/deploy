import React, { useEffect, useState } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVDataTable,
  CVDateRangePicker,
  CVDownload,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import { FilterSeller } from './FilterSeller';
import { bovheaders, bovrows } from './LBOVendedoresUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  TOP_USERS,
  TOP_USERS_CSV
} from '@CVApi/core/webbo/rankUsers/statisticsUsers';

function LBOVendedores() {
  const [seller, setSeller] = useState([]);
  const [filtro, setfiltro] = useState({
    range: [new Date(), new Date(), false],
    idCategoryFilter: '',
    idSubCategoryFilter: '',
    type_sales: '',
    rank: ''
  });

  const toExcel = async () => {
    try {
      const { topSellersCSV } = await AxiosGQL(TOP_USERS_CSV(filtro));
      return JSON.parse(topSellersCSV);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AxiosGQL(TOP_USERS(filtro))
      .then(({ topSellers }) => setSeller(topSellers))
      .catch((err) => console.error(err));
  }, [filtro]);

  return (
    <Box paddingTop='2rem'>
      <Flex alignItems='center'>
        <CVText color='blue' fontWeight='bold' fontSize='1.5rem'>
          Vendedores
        </CVText>
        <SizeBox />
      </Flex>
      <FilterSeller setfiltro={setfiltro} filtro={filtro} />
      <SizeBox />
      <CVDataTable headers={bovheaders} data={bovrows(seller)} />
      <Flex alignItems='center'>
        <CVText>Descargar datos de todos los vendedores</CVText>
        <SizeBox />
        <CVDateRangePicker
          dateend={filtro.range[1]}
          disabledDate={false}
          datestart={filtro.range[0]}
          onChange={(value) =>
            setfiltro({ ...filtro, range: [...value, true] })
          }
        />
        <SizeBox />
        <CVButton variant='outlined'>
          <CVDownload text='' fetchData={toExcel} />
        </CVButton>
      </Flex>
    </Box>
  );
}

export default LBOVendedores;
