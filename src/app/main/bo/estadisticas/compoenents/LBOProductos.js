import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVDataTable,
  CVDateRangePicker,
  CVDownload,
  CVText
} from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { FilterSeller } from './FilterSeller';
import { bopheaders, boprows } from './LBOProductosUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  TOP_PRODUCTS,
  TOP_PRODUCTS_CSV
} from '@CVApi/core/webbo/rankUsers/statisticsUsers';

function LBOProductos() {
  const [seller, setSeller] = useState([]);
  const [filtro, setfiltro] = useState({
    daterange: [new Date(), new Date(), false]
  });

  const toExcel = async () => {
    try {
      const { topProductsCSV } = await AxiosGQL(TOP_PRODUCTS_CSV(filtro));
      return JSON.parse(topProductsCSV);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AxiosGQL(TOP_PRODUCTS(filtro))
      .then(({ topProducts }) => setSeller(topProducts))
      .catch((err) => console.error(err));
  }, [filtro]);

  return (
    <Box paddingTop='2rem'>
      <Flex alignItems='center'>
        <CVText color='blue' fontWeight='bold' fontSize='1.5rem'>
          Top Productos
        </CVText>
      </Flex>
      <SizeBox />
      <CVDataTable headers={bopheaders} data={boprows(seller)} />
      <Flex alignItems='center'>
        <CVText>Descargar datos de todos los productos</CVText>
        <SizeBox />
        <CVDateRangePicker
          dateend={filtro.daterange[1]}
          disabledDate={false}
          datestart={filtro.daterange[0]}
          openDirection='up'
          onChange={(value) =>
            setfiltro({ ...filtro, daterange: [...value, true] })
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

export default LBOProductos;
