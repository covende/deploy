import { gql } from 'graphql-request';

const CATEGORY_ALL_FIELDS = gql`
  fragment categoryAllFields on CategoryProduct {
    id
    category_product_id
    name
    slug
    description
    image
    category_product_id_parent
    subcategory_product_id
  }
`;

const CATEGORY_BY_NIVEL_FIELDS = gql`
  fragment categoryNivelAllFields on CategoryProductNivel {
    category_product_id
    name
    slug
    nivel
    path
  }
`;

const CATEGORY_CHILDREN_FIELDS = gql`
  fragment categoryChildrenAllFields on CategoryProductChildren {
    category_product_id
    name
    slug
  }
`;

const SUBCATEGORY_ALL_FIELDS = gql`
  fragment subcategoryAllFields on SubCategoryProduct {
    id
    subcategory_product_id
    name
    description
    image
  }
`;

export const categoryFragment = {
  CATEGORY_ALL_FIELDS,
  CATEGORY_BY_NIVEL_FIELDS,
  CATEGORY_CHILDREN_FIELDS,
  SUBCATEGORY_ALL_FIELDS
};
