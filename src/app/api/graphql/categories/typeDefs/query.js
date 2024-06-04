import { gql } from 'graphql-request';
import { categoryFragment } from './fragments';

const CATEGORIES = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  query categoryProducts {
    categoryProducts {
      ...categoryAllFields
    }
  }
`;

const CATEGORIES_BY_LIMIT = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  query categoryProductsLimit($limit: Int) {
    categoryProducts(limit: $limit) {
      ...categoryAllFields
    }
  }
`;

const CATEGORY_BY_ID = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  query categoryProductByID($category_id: String!) {
    categoryProductByID(category_product_id: $category_id) {
      ...categoryAllFields
    }
  }
`;

const CATEGORIES_BY_NAME = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  query categoryProductsByName($name: String!) {
    categoryProductsByName(name: $name) {
      ...categoryAllFields
    }
  }
`;

const CATEGORIES_BY_NIVEL = gql`
  ${categoryFragment.CATEGORY_BY_NIVEL_FIELDS}
  query categoryProductByNivel($nivel: Int!) {
    categoryProductByNivel(nivel: $nivel) {
      ...categoryNivelAllFields
    }
  }
`;

const CATEGORIES_CHILDRENS_BY_CATEGORY_ID = gql`
  ${categoryFragment.CATEGORY_CHILDREN_FIELDS}
  query categoryProductByChildrens($category_product_id: String!) {
    categoryProductByChildrens(category_product_id: $category_product_id) {
      ...categoryChildrenAllFields
    }
  }
`;

const SUBCATEGORIES = gql`
  ${categoryFragment.SUBCATEGORY_ALL_FIELDS}
  query subcategoryProducts {
    subcategoryProducts {
      ...subcategoryAllFields
    }
  }
`;

const SUBCATEGORY_BY_ID = gql`
  ${categoryFragment.SUBCATEGORY_ALL_FIELDS}
  query subcategoryProductByID($subcategory_product_id: String!) {
    subcategoryProductByID(subcategory_product_id: $subcategory_product_id) {
      ...subcategoryAllFields
    }
  }
`;

const SUBCATEGORY_BY_NAME = gql`
  ${categoryFragment.SUBCATEGORY_ALL_FIELDS}
  query subcategoryProductsByName($name: String!) {
    subcategoryProductsByName(name: $name) {
      ...subcategoryAllFields
    }
  }
`;

export default {
  CATEGORIES,
  CATEGORY_BY_ID,
  CATEGORIES_BY_LIMIT,
  CATEGORIES_BY_NAME,
  CATEGORIES_BY_NIVEL,
  CATEGORIES_CHILDRENS_BY_CATEGORY_ID,
  SUBCATEGORIES,
  SUBCATEGORY_BY_ID,
  SUBCATEGORY_BY_NAME
};
