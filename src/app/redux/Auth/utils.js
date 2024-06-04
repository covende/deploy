import { getLoggedInUser, updateCookieData } from '@/app/helpers/authUtils';

const Backoffice = {
  succeeded: (state, item) => {
    let dataMutation = {};
    // if (item.code === 200) {
    //   dataMutation = {
    //     user: item.data,
    //     loading: false,
    //     error: nulll
    //   };
    // } else {
    //   dataMutation = {
    //     user: null,
    //     loading: false,
    //     error: item.status
    //   };
    // }
    return {
      ...state,
      Backoffice: {
        ...state.Backoffice,
        loading: true,
        menu: item.sidebars
      }
    };
  },
  forgetPasswordSucceeded: (state, status) => ({
    ...state,
    Backoffice: {
      ...state.Backoffice,
      passwordResetStatus: status,
      loading: false,
      error: null
    }
  }),
  logout: (state, item) => {}
};

const BuyerSeller = {
  succeeded: (state, item) => {
    let dataMutation = {};
    if (item.code === 200) {
      dataMutation = {
        user: getLoggedInUser(),
        loading: true,
        // error: null,
        menu: item.sidebars
      };
    } else {
      dataMutation = {
        user: null,
        loading: false,
        error: item.status
      };
    }

    return {
      ...state,
      BuyerSeller: {
        ...state.BuyerSeller,
        ...dataMutation
      }
    };
  },
  forgetPasswordSucceeded: (state, status) => ({
    ...state,
    BuyerSeller: {
      ...state.BuyerSeller,
      passwordResetStatus: status,
      loading: false,
      error: null
    }
  }),
  updateUser: (state, data) => {
    updateCookieData(data);
    let dataMutation = {
      user: {
        ...state.BuyerSeller?.user,
        ...data
      },
      loading: true
    };
    return {
      ...state,
      BuyerSeller: {
        ...state.BuyerSeller,
        ...dataMutation
      }
    };
  }
};

export default {
  Backoffice,
  BuyerSeller
};
