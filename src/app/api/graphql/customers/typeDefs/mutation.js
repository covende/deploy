import { gql } from 'graphql-request';
import { customerFragment } from './fragments';

const ADD_CUSTOMER = gql`
  ${customerFragment.CUSTOMER_ALL_FIELDS}
  mutation addCustomer(
    $first_name: String
    $last_name: String
    $dni: String
    $company_name: String
    $phone: [phoneInput]
    $fax: String
    $address: [addressInput]
  ) {
    addCustomer(
      first_name: $first_name
      last_name: $last_name
      dni: $dni
      company_name: $company_name
      phone: $phone
      fax: $fax
      address: $address
    ) {
      ...customerAllFields
    }
  }
`;

const EDIT_CUSTOMER = gql`
  ${customerFragment.CUSTOMER_ALL_FIELDS}
  mutation editCustomer(
    $customer_id: String!
    $first_name: String
    $last_name: String
    $dni: String
    $company_name: String
    $phone: [phoneInput]
    $fax: String
    $address: [addressInput]
  ) {
    editCustomer(
      customer_id: $customer_id
      first_name: $first_name
      last_name: $last_name
      dni: $dni
      company_name: $company_name
      phone: $phone
      fax: $fax
      address: $address
    ) {
      ...customerAllFields
    }
  }
`;

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($customer_id: String!) {
    deleteCustomer(customer_id: $customer_id) {
      customer_id
    }
  }
`;

export default {
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER
};
