
import React, { useEffect, useState } from 'react';
import { Grid } from '@/../node_modules/@material-ui/core/index';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
import CTotales from './CTotales';
import ETotales from './ETotales';
import GrafIngresoVentas from './GrafIngresoVentas';
import GrafNumeroVentas from './GrafNumeroVentas';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  GRAPH_SELLER,
  GRAPH_SELLER_CSV,
  SELLER_STATISTIC_CARD,
  SELLER_STATISTIC_GROUP,
  TOP_PRODUCT_SELLER
} from '@CVApi/core/webseller/statistics';
import CVDownload from '@CVTemplate/core/CVDownload';

const Stadistics = ({ store_id }) => {
  const [filtro, setFiltro] = useState({
    start_date: new Date(),
    end_date: new Date(),
    firstTime: true
  });
  const [abstract, setAbstract] = useState({});
  const [storeCalification, setStoreCalification] = useState({
    visits: 0
  });
  const [topListProduct, setTopListProduct] = useState([]);
  const [grapSeller, setGrapSeller] = useState({
    points: []
  });

  useEffect(() => {
    Promise.all([
      AxiosGQL(SELLER_STATISTIC_GROUP(store_id, filtro)),
      AxiosGQL(SELLER_STATISTIC_CARD(store_id, filtro)),
      AxiosGQL(TOP_PRODUCT_SELLER(store_id, filtro)),
      AxiosGQL(GRAPH_SELLER(store_id, filtro))
    ])
      .then((response) => {
        if (response) {
          setAbstract(response[0].sellerStatisticGroup);
          setStoreCalification(response[1].sellerStatisticCard);
          setTopListProduct(response[2].topProductsSeller);
          setGrapSeller(response[3].graphSeller);
        }
      })
      .catch((error) => console.error(error));
  }, [filtro]);

  return (
    <>
      <CVText color='blue' fontSize='2rem' fontWeight='bold'>
        Estadísticas
      </CVText>
      <SizeBox />
      <Grid container spacing={2}>
        <CTotales abstract={abstract} topListProduct={topListProduct} />
        <ETotales setFiltro={setFiltro} storeCalification={storeCalification} />
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <GrafIngresoVentas grapSeller={grapSeller} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <GrafNumeroVentas grapSeller={grapSeller} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <CVDownload
            fetchData={async () =>
              AxiosGQL(GRAPH_SELLER_CSV(store_id, filtro))
                .then(
                  ({ graphSellerCSV }) =>
                    graphSellerCSV && JSON.parse(graphSellerCSV)
                )
                .catch((err) => console.log(err))
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Stadistics