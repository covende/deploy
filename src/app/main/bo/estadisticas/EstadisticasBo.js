import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { CVPanel } from '@/common/CovendeTemplate';
import EBOTotales from './compoenents/EBOTotales';
import VBOTotales from './compoenents/VBOTotales';
import GBOIngresos from './compoenents/GBOIngresos';
import GBOUsuarios from './compoenents/GBOUsuarios';
import { Flex, Box, Text } from '@chakra-ui/layout';
import LBOProductos from './compoenents/LBOProductos';
import LBOVendedores from './compoenents/LBOVendedores';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  AMOUNTS_SATISTIC_BACKCSV,
  SALES_GRAPH_BACK,
  BUYER_QUANTITY,
  SELLERS_QUANTITY
} from '@CVApi/core/webbo/rankUsers/statisticsUsers';
import CVSelect from '@CVTemplate/core/CVSelect';

const selectDaysFilter = [
  {
    text: 'Últimos 7 días',
    value: 7
  },
  {
    text: 'Últimos 30 días',
    value: 30
  },
  {
    text: 'Últimos 60 días',
    value: 60
  },
  {
    text: 'Todos',
    value: 360
  }
];

export const sumarDias = (fecha, dias) => {
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
};

function EstadisticasBo() {
  const [points, setPoints] = useState([]);
  const [comisions, setComisions] = useState(0);
  const [sales, setSales] = useState(0);
  const [date, setdate] = useState([new Date(), new Date(), false]);
  const [sellers, setSellers] = useState(0);
  const [buyer, setBuyer] = useState(0);
  const [lastDays, setLastDays] = useState(360);

  useEffect(() => {
    Promise.all([AxiosGQL(SELLERS_QUANTITY()), AxiosGQL(BUYER_QUANTITY())])
      .then((values) => {
        const { sellersQuantity } = values[0];
        const { buyersQuantity } = values[1];
        setSellers(sellersQuantity);
        setBuyer(buyersQuantity);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  const fetchToExcel = async () => {
    try {
      const { amountsStatisticBackCSV } = await AxiosGQL(
        AMOUNTS_SATISTIC_BACKCSV(date)
      );
      let parse = [];
      parse[0] = JSON.parse(amountsStatisticBackCSV);
      return parse;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AxiosGQL(SALES_GRAPH_BACK(date))
      .then(({ salesGraphBack }) => {
        setComisions(salesGraphBack.commissions);
        setSales(salesGraphBack.sales);
        setPoints(salesGraphBack.points);
      })
      .catch((err) => console.error(err));
  }, [date]);

  let toDay = new Date();

  return (
    <Container>
      <CVPanel itemDirection='column'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box>
              <Text color='#004772' fontSize='2rem' fontWeight='bold'>
                Estadísticas
              </Text>
              <CVSelect
                value={lastDays}
                width='26rem'
                options={selectDaysFilter}
                onChange={(value) => {
                  setLastDays(value);
                  let from = sumarDias(toDay, -value);
                  setdate([from, new Date(), true]);
                }}
              />
            </Box>
            <Flex
              height='100%'
              width='100%'
              justifyContent='center'
              alignItems='center'>
              <EBOTotales
                {...{ date, setdate, comisions, sales }}
                fetchData={fetchToExcel}
              />
            </Flex>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <GBOIngresos {...{ comisions, sales, points }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <GBOUsuarios {...{ sellers, buyer, date }} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Flex
              height='100%'
              width='100%'
              justifyContent='center'
              alignItems='center'>
              <VBOTotales sellers={sellers} buyer={buyer} />
            </Flex>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <LBOVendedores />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <LBOProductos />
          </Grid>
        </Grid>
      </CVPanel>
    </Container>
  );
}

export default EstadisticasBo;
