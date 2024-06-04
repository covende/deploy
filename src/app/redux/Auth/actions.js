import Types from './types';

const Backoffice = {
  login: (user) => ({
    type: Types.Backoffice.LOGIN,
    payload: user
  }),
  loginSucceeded: (user) => ({
    type: Types.Backoffice.LOGIN_SUCCEEDED,
    payload: user
  }),
  loginFailed: (error) => ({
    type: Types.Backoffice.LOGIN_FAILED,
    payload: error
  }),
  logout: (history) => ({
    type: Types.Backoffice.LOGOUT,
    payload: { history }
  }),
  register: (newRegister, history) => ({
    type: Types.Backoffice.REGISTER,
    payload: { newRegister, history }
  }),
  registerSucceeded: (user) => ({
    type: Types.Backoffice.REGISTER_SUCCEEDED,
    payload: user
  }),
  registerFailed: (error) => ({
    type: Types.Backoffice.REGISTER_FAILED,
    payload: error
  }),
  forgetPassword: (username) => ({
    type: Types.Backoffice.FORGET_PASSWORD,
    payload: { username }
  }),
  forgetPasswordSucceeded: (passwordResetStatus) => ({
    type: Types.Backoffice.FORGET_PASSWORD_SUCCEEDED,
    payload: passwordResetStatus
  }),
  forgetPasswordFailed: (error) => ({
    type: Types.Backoffice.FORGET_PASSWORD_FAILED,
    payload: error
  })
};

const BuyerSeller = {
  login: (user) => ({
    type: Types.BuyerSeller.LOGIN,
    payload: user
  }),
  loginSucceeded: (user) => ({
    type: Types.BuyerSeller.LOGIN_SUCCEEDED,
    payload: user
  }),
  updateUser: (data) => ({
    type: Types.BuyerSeller.UPDATE_USER_DATA,
    payload: data
  }),
  loginFailed: (error) => ({
    type: Types.BuyerSeller.LOGIN_FAILED,
    payload: error
  }),
  logout: (history) => ({
    type: Types.BuyerSeller.LOGOUT,
    payload: { history }
  }),
  register: (newRegister, history) => ({
    type: Types.BuyerSeller.REGISTER,
    payload: { newRegister, history }
  }),
  registerSucceeded: (user) => ({
    type: Types.BuyerSeller.REGISTER_SUCCEEDED,
    payload: user
  }),
  registerFailed: (error) => ({
    type: Types.BuyerSeller.REGISTER_FAILED,
    payload: error
  }),
  forgetPassword: (username) => ({
    type: Types.BuyerSeller.FORGET_PASSWORD,
    payload: { username }
  }),
  forgetPasswordSucceeded: (passwordResetStatus) => ({
    type: Types.BuyerSeller.FORGET_PASSWORD_SUCCEEDED,
    payload: passwordResetStatus
  }),
  forgetPasswordFailed: (error) => ({
    type: Types.BuyerSeller.FORGET_PASSWORD_FAILED,
    payload: error
  })
};

export default {
  Backoffice,
  BuyerSeller
};
