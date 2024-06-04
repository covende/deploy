import React, { useEffect, useState } from 'react';

// Components
import VendedoresNoAprobados from './components/VendedoresNoAprobados';
import AlertasDashboard from './components/AlertasDashboard';
import EstadisticasUsuarios from './components/EstadisticasUsuarios';
import EstadisticasGlobal from './components/EstadisticasGlobal';
import ActividadesUsuarios from './components/ActividadesUsuarios';
;
import { Container, Grid } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVRow } from '@/common/CovendeTemplate';
import { ImUserPlus } from 'react-icons/im';
import { Box } from '@chakra-ui/layout';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { FIRST_CARD_BACKOFFICE } from '@/app/api/graphql/webbo/rankUsers/statisticsBo';

function DashboardBo() {
  const [statistics, setStatistics] = useState({});
  useEffect(() => {
    AxiosGQL(FIRST_CARD_BACKOFFICE())
      .then(({ firstCardBackoffice }) => setStatistics(firstCardBackoffice))
      .catch((err) => console.log(err));
  }, []);
  console.log({ statistics });
  return (
    <Container>
      {/* <CVRow justifyContent='end' style={{ paddingBottom: '1rem' }}>
        <Box>
          <CVButton>
            <ImUserPlus />
            <SizeBox />
            Nuevo Usuario Covende
          </CVButton>
        </Box>
        <SizeBox />
        <Box>
          <CVButton variant='outlined'>Búsqueda avanzada</CVButton>
        </Box>
      </CVRow> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <VendedoresNoAprobados pendingSellers={statistics.pendingSellers} />
          <SizeBox />
          <EstadisticasUsuarios userStatistic={statistics.userStatistic} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <AlertasDashboard />
          <SizeBox />
          <EstadisticasGlobal
            buyers={statistics.buyersTotal}
            sellers={statistics.salesTotal}
            messages={statistics.messagesToReply}
            products={statistics.approvedProducts}
          />
          <SizeBox />
          <ActividadesUsuarios
            performance={statistics.performance}
            twoBestProducts={statistics.productsBestSeller}
            activityUsers={statistics.activityUsers}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashboardBo;
