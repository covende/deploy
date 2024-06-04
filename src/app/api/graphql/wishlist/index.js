// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { wishListDefs } from './typeDefs';

const api = {
  wishLists: async () => {
    const res = await InfraGQL.query(wishListDefs.query.WISHLISTS);
    return res.data.wishLists;
  },
  wishListByUserID: async () => {
    const res = await InfraGQL.query(wishListDefs.query.WISHLIST_BY_USER_ID);
    return res.data.wishListByUserID;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(
      wishListDefs.mutation.ADD_WISHLIST_ITEM,
      variables
    );
    return res.addWishInList;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      wishListDefs.mutation.DELETE_WISHLIST_ITEM,
      variables
    );
    return res.deleteWishFromList;
  }
};

export default api;
