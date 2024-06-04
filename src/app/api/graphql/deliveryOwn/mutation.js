import { gql } from 'graphql-request';
import WMDeliveryOwn from '../webmodel/WMDeliveryOwn';

export const ADD_DELIVERY_OWN = gql`
  mutation addDeliveryOwn($input: IDeliveryOwn!) {
    addDeliveryOwn(input: $input) {
      message
      status
      data ${WMDeliveryOwn}
    }
  }
`;

export const UPDATE_STATUS_DELIVERY_OWN_RATE = gql`
  mutation updateStatusDeliveryOwnRate($company_id: String!, $status: String!) {
    updateStatusDeliveryOwnRate(company_id: $company_id, status: $status) {
      message
      status
    }
  }
`;

export const ACTIVATE_RATE_DELIVERY_OWN = gql`
  mutation activateRateDeliveryOwn($company_id: String!) {
    activateRateDeliveryOwn(company_id: $company_id) {
      message
      status
    }
  }
`;

export const UPDATE_FILE_DELIVERY_OWN_RATE = gql`
  mutation updateFileDeliveryOwnRate($company_id: String!, $file: String!) {
    updateFileDeliveryOwnRate(company_id: $company_id, file: $file) {
      message
      status
    }
  }
`;
