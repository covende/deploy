import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVChartLine, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';

function GrafIngresoVentas({ grapSeller }) {
  const [labels, setlabels] = useState([
    '09 Dic',
    '10 Dic',
    '11 Dic',
    '12 Dic',
    '13 Dic',
    '14 Dic',
    '15 Dic',
    '16 Dic',
    '17 Dic'
  ]);
  const [data, setdata] = useState([
    {
      color: COLORS['green'],
      data: [0, 1000, 500, 1000, 100, 3000, 0, 1000, 4000]
    }
  ]);
  useEffect(() => {
    let dates = [];
    let income = [];
    grapSeller.points.map(({ date, total }) => {
      dates = [...dates, date];
      income = [...income, total];
    });
    setlabels(dates.reverse());
    setdata([{ ...data[0], data: income.reverse() }]);
  }, [grapSeller]);
  return (
    <Box rounded='2rem' padding='1rem' border='1px solid #ECECEC'>
      <SizeBox />
      <CVText fontSize='2rem' color='blue' fontWeight='bold' textAlign='center'>
        Ingreso por ventas
      </CVText>
      <SizeBox />
      <CVChartLine data={data} labels={labels} prefixY='S/ ' />
    </Box>
  );
}

export default GrafIngresoVentas;
