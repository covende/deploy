const BannersOffer = {
  fetchSucceeded: (state, items) => ({
    ...state,
    BannersOffer: {
      ...state.BannersOffer,
      loading: false,
      data: items,
      error: undefined
    }
  }),
  addItemSucceeded: (state, itemAdded) => {
    state.BannersOffer.data.push(itemAdded);
    return {
      ...state,
      BannersOffer: {
        ...state.BannersOffer,
        loading: false,
        data: state.BannersOffer.data,
        error: undefined
      }
    };
  },
  editItemSucceeded: (state, itemEdited) => ({
    ...state,
    BannersOffer: {
      ...state.BannersOffer,
      loading: false,
      data: state.BannersOffer.data.map((item) =>
        item.banner_offer_id === itemEdited.banner_offer_id ? itemEdited : item
      ),
      error: undefined
    }
  }),
  deleteItemSucceeded: (state, itemDeleted) => ({
    ...state,
    BannersOffer: {
      ...state.BannersOffer,
      data: state.BannersOffer.data.filter(
        (item) => item.banner_offer_id !== itemDeleted.banner_offer_id
      ),
      loading: false,
      error: undefined
    }
  })
};

const BannersCategory = {
  fetchSucceeded: (state, items) => ({
    ...state,
    BannersCategory: {
      ...state.BannersCategory,
      loading: false,
      data: items,
      error: undefined
    }
  }),
  addItemSucceeded: (state, itemAdded) => {
    state.BannersCategory.data.push(itemAdded);
    return {
      ...state,
      BannersCategory: {
        ...state.BannersCategory,
        loading: false,
        data: state.BannersCategory.data,
        error: undefined
      }
    };
  },
  editItemSucceeded: (state, itemEdited) => ({
    ...state,
    BannersCategory: {
      ...state.BannersCategory,
      loading: false,
      data: state.BannersCategory.data.map((item) =>
        item.banner_categoryproduct_id === itemEdited.banner_categoryproduct_id
          ? itemEdited
          : item
      ),
      error: undefined
    }
  }),
  deleteItemSucceeded: (state, itemDeleted) => ({
    ...state,
    BannersCategory: {
      ...state.BannersCategory,
      data: state.BannersCategory.data.filter(
        (item) =>
          item.banner_categoryproduct_id !==
          itemDeleted.banner_categoryproduct_id
      ),
      loading: false,
      error: undefined
    }
  })
};

const BannersHome = {
  fetchSucceeded: (state, items) => ({
    ...state,
    BannersHome: {
      ...state.BannersHome,
      loading: false,
      data: items,
      error: undefined
    }
  }),
  addItemSucceeded: (state, itemAdded) => {
    state.BannersHome.data.push(itemAdded);
    return {
      ...state,
      BannersHome: {
        ...state.BannersHome,
        loading: false,
        data: state.BannersHome.data,
        error: undefined
      }
    };
  },
  editItemSucceeded: (state, itemEdited) => ({
    ...state,
    BannersHome: {
      ...state.BannersHome,
      loading: false,
      data: state.BannersHome.data.map((item) =>
        item.banner_home_id === itemEdited.banner_home_id ? itemEdited : item
      ),
      error: undefined
    }
  }),
  deleteItemSucceeded: (state, itemDeleted) => ({
    ...state,
    BannersHome: {
      ...state.BannersHome,
      data: state.BannersHome.data.filter(
        (item) => item.banner_home_id !== itemDeleted.banner_home_id
      ),
      loading: false,
      error: undefined
    }
  })
};

const BannersLogin = {
  fetchSucceeded: (state, items) => ({
    ...state,
    BannersLogin: {
      ...state.BannersLogin,
      loading: false,
      data: items,
      error: undefined
    }
  }),
  addItemSucceeded: (state, itemAdded) => {
    state.BannersLogin.data.push(itemAdded);
    return {
      ...state,
      BannersLogin: {
        ...state.BannersLogin,
        loading: false,
        data: state.BannersLogin.data,
        error: undefined
      }
    };
  },
  editItemSucceeded: (state, itemEdited) => ({
    ...state,
    BannersLogin: {
      ...state.BannersLogin,
      loading: false,
      data: state.BannersLogin.data.map((item) =>
        item.banner_login_id === itemEdited.banner_login_id ? itemEdited : item
      ),
      error: undefined
    }
  }),
  deleteItemSucceeded: (state, itemDeleted) => ({
    ...state,
    BannersLogin: {
      ...state.BannersLogin,
      data: state.BannersLogin.data.filter(
        (item) => item.banner_login_id !== itemDeleted.banner_login_id
      ),
      loading: false,
      error: undefined
    }
  })
};

const BannersCreateStore = {
  fetchSucceeded: (state, items) => ({
    ...state,
    BannersCreateStore: {
      ...state.BannersCreateStore,
      loading: false,
      data: items,
      error: undefined
    }
  }),
  addItemSucceeded: (state, itemAdded) => {
    state.BannersCreateStore.data.push(itemAdded);
    return {
      ...state,
      BannersCreateStore: {
        ...state.BannersCreateStore,
        loading: false,
        data: state.BannersCreateStore.data,
        error: undefined
      }
    };
  },
  editItemSucceeded: (state, itemEdited) => ({
    ...state,
    BannersCreateStore: {
      ...state.BannersCreateStore,
      loading: false,
      data: state.BannersCreateStore.data.map((item) =>
        item.banner_createstore_id === itemEdited.banner_createstore_id
          ? itemEdited
          : item
      ),
      error: undefined
    }
  }),
  deleteItemSucceeded: (state, itemDeleted) => ({
    ...state,
    BannersCreateStore: {
      ...state.BannersCreateStore,
      data: state.BannersCreateStore.data.filter(
        (item) =>
          item.banner_createstore_id !== itemDeleted.banner_createstore_id
      ),
      loading: false,
      error: undefined
    }
  })
};
export default {
  BannersOffer,
  BannersCategory,
  BannersHome,
  BannersLogin,
  BannersCreateStore
};
