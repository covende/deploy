import { InfraGQL } from '@/app/infrastructure/graphql/index';
import { gql } from 'graphql-request';

const ADD_BRAND_REQ = gql`
  fragment resultBrandRequest on ResultBrandRequest {
    message
    status
    brandRequest {
      id
      store_id
      owner_type
      name
      description
    }
  }

  mutation addBrandRequest(
    $store_id: ID!
    $owner_type: String!
    $name: String!
    $description: String!
    $patented_brand: Boolean!
    $registration_or_permission_pdf: String!
    $logo: String!
    $place: String!
    $place_links: String
  ) {
    addBrandRequest(
      store_id: $store_id
      owner_type: $owner_type
      name: $name
      description: $description
      patented_brand: $patented_brand
      registration_or_permission_pdf: $registration_or_permission_pdf
      logo: $logo
      place: $place
      place_links: $place_links
    ) {
      ...resultBrandRequest
    }
  }
`;

export const addBrandRequest = async (variables) => {
  const res = await InfraGQL.mutation(ADD_BRAND_REQ, variables);
  return res.addBrandRequest;
};

export const ADD_BRAND_REQUEST = (brand) => `mutation{
    addBrandRequest(
      store_id:"${brand.store_id}"
      owner_type:"${brand.owner_type}"
      name:"${brand.name}"
      description:"${brand.description}"
      patented_brand:${brand.patented_brand == 'si' ? true : false}
      registration_or_permission_pdf:"${brand.registration_or_permission_pdf}"
      logo:"${brand.logo}"
      place:"${brand.place}"
    ){
      message
      status
      brandRequest{
        id
        store_id
        owner_type
        name
        description
      }
    }
  }`;
