import { gql } from 'graphql-request';
import { customerFragment } from './fragments';

const CUSTOMERS = gql`
  ${customerFragment.CUSTOMER_ALL_FIELDS}
  query customers {
    customers {
      ...customerAllFields
    }
  }
`;

const CUSTOMER_BY_ID = gql`
  ${customerFragment.CUSTOMER_ALL_FIELDS}
  query customerByID($customer_id: String!) {
    customerByID(customer_id: $customer_id) {
      ...customerAllFields
    }
  }
`;

const CUSTOMER_BY_DNI = gql`
  ${customerFragment.CUSTOMER_ALL_FIELDS}
  query customerByDNI($dni: String!) {
    customerByDNI(dni: $dni) {
      ...customerAllFields
    }
  }
`;

export default {
  CUSTOMERS,
  CUSTOMER_BY_ID,
  CUSTOMER_BY_DNI
};
