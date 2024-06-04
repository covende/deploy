const tstate = {
  MasVisitadoBanner: [],
  MasVendido: [],
  MejorValorado: [],
  MasVisitados: [],
  BestSellers: [],
  Publicitario: [],
  CategoryProductsOfferPublic: [],
  CategoriesHeaderPublic: [],
  BestRated: [],
  MostVisited: [],
  RecomendedByCategory: [],
  Suggested: [],
  Banners: [],
  ListCategories: [],
  loading: true
};

const HomeData = (state = tstate, { type, data }) => {
  if (type == 'HOME_DATA') {
    return { ...state, ...data };
  }
  return state;
};

export default HomeData;
