import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import {
  ACTIVATE_RATE_DELIVERY_OWN,
  ADD_DELIVERY_OWN,
  UPDATE_FILE_DELIVERY_OWN_RATE,
  UPDATE_STATUS_DELIVERY_OWN_RATE
} from './mutation';

export const addDeliveryOwn = async (input) => {
  const res = await AxiosGqlClient.query(ADD_DELIVERY_OWN, { input });
  return res?.data?.addDeliveryOwn;
};

export const updateStatusDeliveryOwnRate = async (
  company_id = '',
  status = ''
) => {
  const res = await AxiosGqlClient.query(UPDATE_STATUS_DELIVERY_OWN_RATE, {
    company_id,
    status
  });
  return res?.data?.updateStatusDeliveryOwnRate;
};

export const activateRateDeliveryOwn = async (company_id = '') => {
  const res = await AxiosGqlClient.query(ACTIVATE_RATE_DELIVERY_OWN, {
    company_id
  });
  return res?.data?.activateRateDeliveryOwn;
};

export const updateFileDeliveryOwnRate = async (company_id = '', file = '') => {
  const res = await AxiosGqlClient.query(UPDATE_FILE_DELIVERY_OWN_RATE, {
    company_id,
    file
  });
  return res?.data?.updateFileDeliveryOwnRate;
};
