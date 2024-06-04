import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { userFragment } from '../../users/typeDefs/fragments';

const queryValidateCodeByBuyer = (code) => `
    ${userFragment.USER_FOR_LOGIN_ALL_FIELDS}
    mutation {
        validateCodeByBuyer(code: "${code}"){...userForLoginAllFields}
    }
`;

const queryValidateSubAccountByCode = (code) => `
mutation {
    validateSubAccountByCode(code: "${code}"){
      status
      message
      user_id
    }
}`;

const queryValidateCodeBySeller = (code) => `
    mutation {
        validateCodeBySeller(code: "${code}")
    }
`;

const querySendValidationCodeByEmail = (email) => `
mutation {
  sendValidationCodeByEmail(email: "${email}") {
    code
    message
    description
    error
  }
}
`;

const queryUserLoginByCode = (code) => `
    ${userFragment.USER_FOR_LOGIN_ALL_FIELDS}
    query {
        userLoginByCode(code: "${code}"){...userForLoginAllFields}
    }
`;

export const validateByBuyer = async (code) => {
  const resp = await AxiosGQL(queryValidateCodeByBuyer(code));
  return resp.validateCodeByBuyer;
};

export const validateSubAccountByCode = async (code) => {
  const resp = await AxiosGQL(queryValidateSubAccountByCode(code));
  return resp.validateSubAccountByCode;
};

export const validateBySeller = async (code) => {
  const resp = await AxiosGQL(queryValidateCodeBySeller(code));
  return resp.validateCodeBySeller;
};

export const sendValidationCodeByEmail = async (email) => {
  const resp = await AxiosGQL(querySendValidationCodeByEmail(email));
  return resp.sendValidationCodeByEmail;
};

export const userLoginByCode = async (code) => {
  const resp = await AxiosGQL(queryUserLoginByCode(code));
  return resp.userLoginByCode;
};
