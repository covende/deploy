// const reg_password =
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!_%*?&])[A-Za-z\d@$!_%*?&]{8,}$/;
const reg_password =
  /^(?=.*[a-z])(?=.*[A-Z]?)(?=.*\d)(?=.*[@$!_%*?&]?)[A-Za-z\d@$!_%*?&]{8,}$/;
const reg_password_basic =
  /^(?=.*[a-z])(?=.*[A-Z]?)(?=.*\d)[A-Za-z\d@$!_%*?&]{8,}$/;
const reg_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const reg_text = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/;
const reg_phone = /^[9][0-9]{8}$/;
const reg_number = /^[0-9]*$/;
const reg_money = /^(?!0\.00)\d{1,4}(,\d{3})*(\.\d\d)?$/;
export const detect_cellphone = /\+?[0-9]{0,2}?[9|0][0-9]{5,}/g;
export const detect_url = /https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*/g;

export const isEmail = (email) => reg_email.test(email);
export const isPassword = (pass) => reg_password.test(pass);
export const isPasswordBasic = (pass) => reg_password_basic.test(pass);
export const isIDNumber = ({ caracters = 8, idcard }) =>
  new RegExp(`^[0-9]{${eval(caracters) || 8}}$`).test(idcard);
export const isMoney = (money) => reg_money.test(money);

export const isOnlyNumber = (text) => reg_number.test(text);
export const isOnlyText = (text) => reg_text.test(text);
export const isPhone = (phone) => reg_phone.test(phone);

export const onlyNumber = (text) => (text + '').replace(/\D/g, '');
export const onlyEmail = (text) => text.replace(/[^a-zA-Z0-9@._-]/g, '');
export const onlyText = (text) => text.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]*$/, '');
export const onlyMoney = (text) => text.replace(/[^0-9.]/g, '');
/**
 *
 * @param {Object} errors
 */
export const CVErrorsValidate = (errors = {}) => {
  var status = true;
  status = Object.keys(errors)
    .map((k, v) => errors[k] || false)
    .join(`,`);
  return status.includes('false');
};

export const CVErrorTags = (clase = 'errores') =>
  document.querySelectorAll('.' + clase).length != 0;
