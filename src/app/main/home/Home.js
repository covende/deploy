import React, { useEffect, Suspense, lazy, useState } from 'react';

// import Publicitario from './Publicitario';
// import Ofertas from './Ofertas';
// import MejorValorados from './MejorValorados';
// import MasVisitados from './MasVisitados';
// import MasVendidos from './MasVendidos';
// import Recomendaciones from './Recomendaciones';

// import CategoriasMasBuscadas from './CategoriasMasBuscadas';

const Ofertas = lazy(() => import('./Ofertas'));
const Publicitario = lazy(() => import('./Publicitario'));
const MejorValorados = lazy(() => import('./MejorValorados'));
const MasVisitados = lazy(() => import('./MasVisitados'));
const MasVendidos = lazy(() => import('./MasVendidos'));
const Recomendaciones = lazy(() => import('./Recomendaciones'));
const CategoriasMasBuscadas = lazy(() => import('./CategoriasMasBuscadas'));
import { getLoggedInUser } from '@/app/helpers/authUtils';

import {
  Main,
  Breadcumbs,
  BreadcumbsList,
  BreadcumbsItem
} from './Home.styles';
import { Container } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box } from '@chakra-ui/react';
// import CategoriasMasBuscadas from './CategoriasMasBuscadas';
import { CVGoUp } from '@/common/CovendeTemplate/CVMethods';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { A_CATEGORYPRODUCTS } from '@/app/main/bo/arborescencia-de-categorias/redux/Action';
import arrayToTree from 'array-to-tree';
import { A_HOME_DATA } from './redux/Action';
import LinksHelp from '../tienda/TiendasOficiales/componetes/LinksHelp';
import homeservice from '@CVApi/core/webpublic/home/homeservice';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { HOME_SERVICE } from '@CVApi/core/webpublic/home/LoadService';

function Home() {
  const { Banners } = useSelector((state) => state.HomeData);
  const dispatch = useDispatch();
  const auth = getLoggedInUser();
  const initdata = async () => {
    // console.log({ Banners });
    if (Banners?.length == 0) {
      let data = await AxiosGQL(HOME_SERVICE);
      dispatch({ type: 'START_BACKGROUND_SYNC' });

      dispatch(
        A_HOME_DATA({
          MasVisitadoBanner: data?.getHomeData?.images.MasVisitadoBanner || [],
          MasVendido: data?.getHomeData?.images.MasVendido || [],
          MejorValorado: data?.getHomeData?.images.MejorValorado || [],
          MasVisitados: data?.getHomeData?.images.MasVisitados || [],
          BestSellers: data?.getHomeData?.bestSellers?.productsItemPublic || [],
          Publicitario: data?.getHomeData?.images.Publicitario || [],
          CategoryProductsOfferPublic:
            data?.getHomeData.offerProducts?.productsItemPublic || [],
          CategoriesHeaderPublic: data?.getHomeData.categories,
          BestRated: data?.getHomeData.bestRated?.productsItemPublic || [],
          MostVisited: data?.getHomeData.mostVisited?.productsItemPublic || [],
          RecomendedByCategory:
            data?.getHomeData.recomendedByCategory?.productsItemPublic || [],
          Suggested: data?.getHomeData.suggested?.productsItemPublic || [],
          Banners: data?.getHomeData.images.Banners,
          ListCategories: data?.getHomeData.categories,
          loading: false
        })
      );
    }
  };

  useEffect(() => {
    CVGoUp();
    initdata();

    return () => {
      console.log('destry');
      // setData({});
      // dispatch(A_HOME_DATA());
    };
  }, []);
  return (
    <Box>
      {/* <Breadcumbs>
        <Container> <LinksHelp /> </Container>
    </Breadcumbs>  */}
      <Box mx={13}>
        <Publicitario />
      </Box>

      <Container>
        <Main>
          {/* <Publicitario /> */}
          <SizeBox />
          <Ofertas />
          <SizeBox />
          <CategoriasMasBuscadas />
          <SizeBox />
          <MejorValorados />
          <SizeBox />
          <MasVisitados />
          <SizeBox />
          <MasVendidos />
          <SizeBox />
          {auth != null && <Recomendaciones />}
        </Main>
      </Container>
    </Box>
  );
}

export default Home;
