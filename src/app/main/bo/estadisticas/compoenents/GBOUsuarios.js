import React, { useState, useEffect } from 'react';

// UI Components
import { Box, Flex } from '@chakra-ui/react';
import { CVChartLine, CVPanel, CVRow, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaSquare } from 'react-icons/fa';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { USERS_GRAPH_BACK } from '@CVApi/core/webbo/rankUsers/statisticsUsers';

function GBOUsuarios({ sellers, buyer, date: dat }) {
  const [data, setdata] = useState([
    {
      data: [0, 1000, 200, 6000, 1500, 9000],
      color: COLORS['primary'],
      colors: 'primary',
      label: `Usuarios
      Compradores`,
      total: sellers
    },
    {
      data: [2000, 3000, 2200, 9000, 3500, 11000],
      color: COLORS['green'],
      colors: 'green',
      label: `Usuarios 
      Vendedores`,
      total: buyer
    }
  ]);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    AxiosGQL(USERS_GRAPH_BACK(dat))
      .then(({ usersGraphBack }) => {
        let totalBuyers = [];
        let totalSellers = [];
        let totalDates = [];
        usersGraphBack.points.map(({ buyers, date, sellers }, ndx) => {
          totalBuyers[ndx] = buyers;
          totalSellers[ndx] = sellers;
          totalDates[ndx] = date;
        });
        setdata([
          {
            ...data[0],
            data: totalBuyers.reverse(),
            total: buyer
          },
          {
            ...data[1],
            data: totalSellers.reverse(),
            total: sellers
          }
        ]);
        setDates(totalDates.reverse());
      })
      .catch((error) => console.error(error));
  }, [sellers, buyer, dat]);

  return (
    <Box padding='1rem' border='1px solid #ECECEC' rounded='1rem'>
      <CVPanel itemDirection='column' itemsAlign='center'>
        <CVText
          textAlign='center'
          fontSize='1.5rem'
          fontWeight='bold'
          color='blue'>
          Usuarios
        </CVText>
        <Flex width='100%' direction='column'>
          <Flex width='100%'>
            <CVChartLine labels={dates} data={data} />
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

export default GBOUsuarios;
