import { gql } from 'graphql-request';
import WMCustomer from '../../webmodel/WMCustomer';

const CUSTOMER_ALL_FIELDS = gql`
  fragment customerAllFields on customer ${WMCustomer}
`;

export const customerFragment = {
  CUSTOMER_ALL_FIELDS
};
