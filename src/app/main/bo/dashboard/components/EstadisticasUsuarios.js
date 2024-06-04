import React, { useState, useEffect } from 'react';

// UI Components
import { Box, Flex } from '@chakra-ui/react';
import {
  CVChartLine,
  CVColumn,
  CVPanel,
  CVText
} from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaSquare } from 'react-icons/fa';

function EstadisticasUsuarios({ userStatistic }) {
  const [dates, setDates] = useState([]);
  const [data, setdata] = useState([
    {
      data: [0, 1000, 200, 6000, 1500, 9000],
      color: COLORS['primary'],
      colors: 'primary',
      label: 'Usuarios Vendedores',
      total: 310
    },
    {
      data: [2000, 3000, 2200, 9000, 3500, 11000],
      color: COLORS['green'],
      colors: 'green',
      label: 'Usuarios Compradores',
      total: 25
    }
  ]);

  useEffect(() => {
    let totalDate = [];
    let pointSeller = [];
    let pointBuyer = [];
    let totalSeller = 0;
    let totalBuyer = 0;
    userStatistic &&
      userStatistic.points.map((item, ndx) => {
        totalDate[ndx] = item.date;
        pointSeller[ndx] = item.sellers;
        pointBuyer[ndx] = item.buyers;
        totalSeller = totalSeller + item.sellers;
        totalBuyer = totalBuyer + item.buyers;
      });
    setDates(totalDate);
    setdata([
      { ...data[0], data: pointSeller, total: totalSeller },
      { ...data[1], data: pointBuyer, total: totalBuyer }
    ]);
  }, [userStatistic]);
  return (
    <Box>
      <CVPanel itemDirection='column' itemsAlign='center'>
        <CVText
          textAlign='center'
          fontSize='1.5rem'
          fontWeight='bold'
          color='blue'>
          Estadísticas de usuarios
        </CVText>
        <Flex width='100%' alignItems='stretch'>
          <Flex width='20%' direction='column' justifyContent='center'>
            {data.map((item) => (
              <CVColumn key={v4()} justifyContent='center' height='auto'>
                <FaSquare style={{ color: item.color }} />
                <CVText textAlign='start' fontSize='0.75rem'>
                  {item.label}
                </CVText>
                <CVText color={item.colors} fontWeight='bold'>
                  {item.total}
                </CVText>
                <SizeBox />
              </CVColumn>
            ))}
          </Flex>
          <Flex width='80%'>
            <CVChartLine labels={dates} data={data} />
          </Flex>
        </Flex>
      </CVPanel>
    </Box>
  );
}

export default EstadisticasUsuarios;
