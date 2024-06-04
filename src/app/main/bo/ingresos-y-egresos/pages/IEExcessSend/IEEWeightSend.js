import React, { useState, useEffect } from 'react';

import { Flex, Box, Heading } from '@chakra-ui/react';
import { COLORS } from '@CVTemplate/core/CVThemes';
import CVSearchInput from '@CVTemplate/core/CVSearchInput';
import CVDateRangePicker from '@CVTemplate/core/CVDateRangePicker';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVDataTable from '@CVTemplate/core/CVDataTable';
import { IEEWSHeaders, IEEWSRow } from './IEEUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { SHIPPING_WEIGHT_COMPARISON_HISTORY } from '@CVApi/core/faq/ClienteAsist/HelpService';
import { formatpaginate } from '@/common/utils/methods';

function IEEWeightSend() {
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    search: '',
    range: [new Date(), new Date(), false]
  });

  const initData = async () => {
    setLoading(true);
    const { shippingWeightComparisonHistory } = await AxiosGQL(
      SHIPPING_WEIGHT_COMPARISON_HISTORY(1, 10, filtro)
    );
    if (shippingWeightComparisonHistory) {
      setPagination(formatpaginate(shippingWeightComparisonHistory.info));
      setList(shippingWeightComparisonHistory.data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [filtro]);

  return (
    <Box>
      <Heading
        my='31px'
        as='h1'
        color={COLORS.blue}
        fontSize='26px'
        fontWeight={600}>
        Historial de comparación de peso de envíos
      </Heading>
      <Flex mb='42px'>
        <CVSearchInput
          placeholder='Buscar por remito'
          onSubmit={(value) => setFiltro({ ...filtro, search: value })}
        />
        <SizeBox width='90px' />
        <CVDateRangePicker
          title='Tiempo'
          disabledDate={false}
          datestart={filtro.range[0]}
          dateend={filtro.range[1]}
          onChange={(value) =>
            setFiltro({ ...filtro, range: [...value, true] })
          }
        />
      </Flex>
      <CVDataTable
        headers={IEEWSHeaders}
        data={IEEWSRow(list)}
        pagination={pagination}
        // fetchdata={(page) => setPage(page)}
        loading={loading}
      />
    </Box>
  );
}

export default IEEWeightSend;
