import React, { useState, useEffect } from 'react';

// UI Components
import { Box, Flex } from '@chakra-ui/react';
import { CVChartLine, CVPanel, CVRow, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaSquare } from 'react-icons/fa';

function GBOIngresos({ comisions, sales, points }) {
  const [labels, setLabels] = useState([]);
  const [data, setdata] = useState([
    {
      data: [0, 1000, 200, 6000, 1500, 9000],
      color: COLORS['primary'],
      colors: 'primary',
      label: 'Ventas totales',
      total: 0
    },
    {
      data: [2000, 3000, 2200, 9000, 3500, 11000],
      color: COLORS['green'],
      colors: 'green',
      label: 'Ingresos por comisiones',
      total: 0
    }
  ]);

  useEffect(() => {
    const processData = () => {
      let lab = [];
      let pointsSales = [];
      let pointsCommissions = [];
      points.map((point, ndx) => {
        lab[ndx] = point.date;
        setLabels(lab);
        pointsSales[ndx] = point.sales;
        pointsCommissions[ndx] = point.commissions;
        setdata([
          {
            ...data[0],
            data: pointsSales,
            total: sales
          },
          {
            ...data[1],
            data: pointsCommissions,
            total: comisions
          }
        ]);
      });
    };
    processData();
  }, [points]);

  return (
    <Box padding='1rem' border='1px solid #ECECEC' rounded='1rem'>
      <CVPanel itemDirection='column' itemsAlign='center'>
        <CVText
          textAlign='center'
          fontSize='1.5rem'
          fontWeight='bold'
          color='blue'>
          Ingresos y Ventas
        </CVText>
        <Flex width='100%' direction='column'>
          <Flex width='100%'>
            <CVChartLine labels={labels} data={data} />
          </Flex>
          <Flex width='100%' justifyContent='center'>
            {data.map((item) => (
              <CVRow
                key={v4()}
                justifyContent='center'
                height='auto'
                alignItems='center'>
                <FaSquare style={{ color: item.color }} />
                <SizeBox />
                <CVText textAlign='start' fontSize='0.75rem'>
                  {item.label}
                </CVText>
                <SizeBox />
                <CVText color={item.colors} fontWeight='bold'>
                  {item.total}
                </CVText>
                <SizeBox />
              </CVRow>
            ))}
          </Flex>
        </Flex>
      </CVPanel>
    </Box>
  );
}

export default GBOIngresos;
