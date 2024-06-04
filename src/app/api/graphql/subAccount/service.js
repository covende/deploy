import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import {
  ACTIVE_SUBACCOUNT,
  ADD_SUBACCOUNT,
  DELETE_SUBACCOUNT,
  GET_SUBACCOUNTS
} from './mutation';

export const addSubAccount = async (input) => {
  const res = await AxiosGqlClient.query(ADD_SUBACCOUNT, { input });
  return res.data.addSubAccount;
};

export const activeSubAccount = async (user_id, status) => {
  const res = await AxiosGqlClient.query(ACTIVE_SUBACCOUNT, {
    user_id,
    status
  });
  return res.data.activeSubAccount;
};

export const deleteSubAccount = async (user_id) => {
  const res = await AxiosGqlClient.query(DELETE_SUBACCOUNT, {
    user_id
  });
  return res.data?.deleteSubAccount;
};

export const getSubAccounts = async ({
  page = 1,
  itemsPage = 20,
  search = ''
}) => {
  const res = await AxiosGqlClient.query(GET_SUBACCOUNTS, {
    page,
    itemsPage,
    search
  });
  return res.data.getSubAccounts;
};
