import { all, call, cancel, fork, put, takeLatest } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import { safe } from '../common/sagas';
import homeservice from '@/app/api/graphql/webpublic/home/homeservice';
import { A_HOME_DATA } from '@/app/main/home/redux/Action';
import { A_CATEGORYPRODUCTS } from '@/app/main/bo/arborescencia-de-categorias/redux/Action';
import arrayToTree from 'array-to-tree';

// Data
/**
 * Listar
 * @param {*} payload - *
 */
function* fetch() {
  const { response, error } = yield safe(call(homeservice));
  if (response) {
    if (response?.code >= 200 && response?.code < 300) {
      yield put(
        A_HOME_DATA({
          MasVisitadoBanner:
            response?.data?.getHomeData?.images.MasVisitadoBanner || [],
          MasVendido: response?.data?.getHomeData?.images.MasVendido || [],
          MejorValorado:
            response?.data?.getHomeData?.images.MejorValorado || [],
          MasVisitados: response?.data?.getHomeData?.images.MasVisitados || [],
          BestSellers:
            response?.data?.getHomeData?.bestSellers?.productsItemPublic || [],
          Publicitario: response?.data?.getHomeData?.images.Publicitario || [],
          CategoryProductsOfferPublic:
            response?.data?.getHomeData.offerProducts?.productsItemPublic || [],
          CategoriesHeaderPublic: response?.data?.getHomeData.categories,
          BestRated:
            response?.data?.getHomeData.bestRated?.productsItemPublic || [],
          MostVisited:
            response?.data?.getHomeData.mostVisited?.productsItemPublic || [],
          RecomendedByCategory:
            response?.data?.getHomeData.recomendedByCategory
              ?.productsItemPublic || [],
          Suggested:
            response?.data?.getHomeData.suggested?.productsItemPublic || [],
          Banners: response?.data?.getHomeData.images.Banners,
          ListCategories: response?.data?.getHomeData.categories,
          loading: false
        })
      );

      console.log('otra consulta');

      //   yield put(
      //   A_HOME_DATA({
      //     MasVisitadoBanner: response?.data?.MasVisitadoBanner?.docs || [],
      //     MasVendido: response?.data?.MasVendido?.docs || [],
      //     MejorValorado: response?.data?.MejorValorado?.docs || [],
      //     MasVisitados: response?.data?.MasVisitados?.docs || [],
      //     BestSellers: response?.data?.BestSellers?.productsItemPublic || [],
      //     Publicitario: response?.data?.Publicitario?.docs || [],
      //     CategoryProductsOfferPublic:
      //       response?.data?.CategoryProductsOfferPublic,
      //     CategoriesHeaderPublic: response?.data?.CategoriesHeaderPublic,
      //     BestRated: response?.data?.BestRated?.productsItemPublic || [],
      //     MostVisited: response?.data?.MostVisited?.productsItemPublic || [],
      //     RecomendedByCategory:
      //       response?.data?.RecomendedByCategory?.productsItemPublic || [],
      //     Suggested: response?.data?.Suggested?.productsItemPublic || [],
      //     Banners: response?.data?.Banners,
      //     ListCategories: response?.data?.ListCategories,
      //     loading: false
      //   })
      // );
      let lista = response?.data?.ListCategories;
      const tree = arrayToTree(lista, {
        parentProperty: 'parent_id',
        customID: '_id'
      });
      yield put(
        A_CATEGORYPRODUCTS({
          treecategorys: tree,
          categorys: lista,
          loading: false
        })
      );
    }
  } else yield put(A_HOME_DATA({ error }));
}

export function* watchFetch() {
  yield takeLatest('HOME_DATA', fetch);
}

function* WPSagas() {
  localStorage.setItem('load', 'uno');
  yield all([fork(watchFetch)]);
}

export default WPSagas;
