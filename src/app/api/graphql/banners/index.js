// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { bannerDefs } from './typeDefs';

const BannersCategory = {
  fetchBannerCategories: async () => {
    const res = await InfraGQL.query(bannerDefs.query.BANNER_CATEGORIES);
    return res.data.bannerCategoryproducts;
  },
  fetchBannerCategoriesByLimit: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_CATEGORIES_BY_LIMIT,
      variables
    );
    return res.data.bannerCategoryproducts;
  },
  fetchBannerCategoriesByID: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_CATEGORY_BY_ID,
      variables
    );
    return res.data.bannerCategoryproductByID;
  },
  fetchBannerCategoriesByCategoryProductId: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_CATEGORIES_BY_CATEGORY_ID,
      variables
    );
    return res.data.bannerCategoryproductsByCategoryProductId;
  },
  addBannerCategoryItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.ADD_BANNER_CATEGORY,
      variables
    );
    return res.addBannerCategoryproduct;
  },
  editBannerCategoryItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.EDIT_BANNER_CATEGORY,
      variables
    );
    return res.editBannerCategoryproduct;
  },
  deleteBannerCategoryItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.DELETE_BANNER_CATEGORY,
      variables
    );
    return res.deleteBannerCategoryproduct;
  }
};

// Gestión de "Crea tu tienda"
const BannersCreaTienda = {
  fetchBannerCreateStore: async () => {
    const res = await InfraGQL.query(bannerDefs.query.BANNER_CREATE_STORES);
    return res.data.bannerCreatestores;
  },
  fetchBannerCreateStoreByLimit: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_CREATE_STORES_BY_LIMIT,
      variables
    );
    return res.data.bannerCreatestores;
  },
  fetchBannerCreateStoreByID: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_CREATE_STORE_BY_ID,
      variables
    );
    return res.data.bannerCreatestoreByID;
  },
  fetchBannerCreateStoreByTitle: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_CREATE_STORES_BY_TITLE,
      variables
    );
    return res.data.bannerCreatestoresByTitle;
  },
  addBannerCreateStoreItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.ADD_BANNER_CREATE_STORE,
      variables
    );
    return res.addBannerCreatestore;
  },
  editBannerCreateStoreItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.EDIT_BANNER_CREATE_STORE,
      variables
    );
    return res.editBannerCreatestore;
  },
  deleteBannerCreateStoreItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.DELETE_BANNER_CREATE_STORE,
      variables
    );
    return res.deleteBannerCreatestore;
  }
};

const BannersHome = {
  fetchBannerHome: async () => {
    const res = await InfraGQL.query(bannerDefs.query.BANNER_HOMES);
    return res.data.bannerHomes;
  },
  fetchBannerHomeByLimit: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_HOMES_BY_LIMIT,
      variables
    );
    return res.data.bannerHomes;
  },
  fetchBannerHomeByID: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_HOME_BY_ID,
      variables
    );
    return res.data.bannerHomeByID;
  },
  fetchBannerHomeByTitle: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_HOMES_BY_TITLE,
      variables
    );
    return res.data.bannerHomesByTitle;
  },
  addBannerHomeItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.ADD_BANNER_HOME,
      variables
    );
    return res.addBannerHome;
  },
  editBannerHomeItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.EDIT_BANNER_HOME,
      variables
    );
    return res.editBannerHome;
  },
  deleteBannerHomeItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.DELETE_BANNER_HOME,
      variables
    );
    return res.deleteBannerHome;
  }
};

// Gestión del Login
const BannersLogin = {
  fetchBannerLogin: async () => {
    const res = await InfraGQL.query(bannerDefs.query.BANNER_LOGINS);
    return res.data.bannerLogins;
  },
  fetchBannerLoginByLimit: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_LOGINS_BY_LIMIT,
      variables
    );
    return res.data.bannerLogins;
  },
  fetchBannerLoginByID: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_LOGIN_BY_ID,
      variables
    );
    return res.data.bannerLoginByID;
  },
  fetchBannerLoginByTitle: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_LOGINS_BY_TITLE,
      variables
    );
    return res.data.bannerLoginsByTitle;
  },
  addBannerLoginItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.ADD_BANNER_LOGIN,
      variables
    );
    return res.addBannerLogin;
  },
  editBannerLoginItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.EDIT_BANNER_LOGIN,
      variables
    );
    return res.editBannerLogin;
  },
  deleteBannerLoginItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.DELETE_BANNER_LOGIN,
      variables
    );
    return res.deleteBannerLogin;
  }
};

const BannersOffers = {
  fetchBannersOffers: async () => {
    const res = await InfraGQL.query(bannerDefs.query.BANNER_OFFERS);
    //console.log('BannersOffersres', res);
    return res.data.bannerOffers;
  },
  fetchBannersOffersByLimit: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_OFFERS_BY_LIMIT,
      variables
    );
    return res.data.bannerOffers;
  },
  fetchBannersOffersByID: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_OFFER_BY_ID,
      variables
    );
    return res.data.bannerOfferByID;
  },
  fetchBannersOffersByCategoryProductId: async (variables) => {
    const res = await InfraGQL.query(
      bannerDefs.query.BANNER_OFFERS_BY_CATEGORY_ID,
      variables
    );
    return res.data.bannerOffersByCategoryProductId;
  },
  addBannerOfferItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.ADD_BANNER_OFFER,
      variables
    );
    return res.addBannerOffer;
  },
  editBannerOfferItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.EDIT_BANNER_OFFER,
      variables
    );
    return res.editBannerOffer;
  },
  deleteBannerOfferItem: async (variables) => {
    const res = await InfraGQL.mutation(
      bannerDefs.mutation.DELETE_BANNER_OFFER,
      variables
    );
    return res.deleteBannerOffer;
  }
};

export default {
  BannersOffers,
  BannersCategory,
  BannersHome,
  BannersLogin,
  BannersCreaTienda
};
