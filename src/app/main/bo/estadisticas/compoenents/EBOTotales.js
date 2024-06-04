import React, { useEffect } from 'react';
import CardTotal from '@/app/main/admin/seller/estadisticas/components/CardTotal';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVDateRangePicker,
  CVDownload,
  CVText
} from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';
import { moneyformat } from '@/common/utils/methods';

function EBOTotales({ date, setdate, comisions, sales, fetchData }) {
  return (
    <Grid container spacing={2}>
      <CardTotal
        title='Ventas Totales'
        value={`S/ ${moneyformat(sales)}`}
        backgroundColor='primary'
      />
      <CardTotal
        title='Ingresos por comisiones'
        value={`S/ ${moneyformat(comisions)}`}
        backgroundColor='green'
      />
      <Grid item xs={12} sm={12} md={12}>
        <Flex justifyContent='space-between' alignItems='center'>
          <CVText color='blue' fontSize='1.2rem'>
            Descargar Ingresos:
          </CVText>
          <SizeBox />
          <CVDateRangePicker
            disabledDate={false}
            datestart={date[0]}
            dateend={date[1]}
            onChange={(value) => setdate([...value, true])}
          />
          <SizeBox />
          {/* <CVButton variant='outlined'>
            <CVDownload text='' fetchData={fetchData} />
          </CVButton> */}
        </Flex>
      </Grid>
    </Grid>
  );
}

export default EBOTotales;
