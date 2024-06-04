import { gql } from 'graphql-request';
import { categoryFragment } from './fragments';

const ADD_CATEGORY = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  mutation addCategoryProduct(
    $name: String!
    $slug: String
    $description: String
    $image: String
    $category_product_id_parent: String
    $subcategory_product_id: String
  ) {
    addCategoryProduct(
      name: $name
      slug: $slug
      description: $description
      image: $image
      category_product_id_parent: $category_product_id_parent
      subcategory_product_id: $subcategory_product_id
    ) {
      ...categoryAllFields
    }
  }
`;
const EDIT_CATEGORY = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  mutation editCategoryProduct(
    $name: String!
    $slug: String
    $description: String
    $image: String
    $category_product_id_parent: String
    $subcategory_product_id: String
  ) {
    editCategoryProduct(
      category_product_id: $category_product_id
      name: $name
      description: $description
      image: $image
    ) {
      ...categoryAllFields
    }
  }
`;
const DELETE_CATEGORY = gql`
  ${categoryFragment.CATEGORY_ALL_FIELDS}
  mutation deleteCategoryProduct($category_product_id: String!) {
    deleteCategoryProduct(category_product_id: $category_product_id) {
      ...categoryAllFields
    }
  }
`;
const ADD_SUBCATEGORY = gql`
  ${categoryFragment.SUBCATEGORY_ALL_FIELDS}
  mutation addSubCategoryProduct(
    $name: String!
    $description: String
    $image: String
  ) {
    addSubCategoryProduct(
      name: $name
      description: $description
      image: $image
    ) {
      ...subcategoryAllFields
    }
  }
`;
const EDIT_SUBCATEGORY = gql`
  ${categoryFragment.SUBCATEGORY_ALL_FIELDS}
  mutation editSubCategoryProduct(
    $subcategory_product_id: String!
    $name: String
    $description: String
    $image: String
  ) {
    editSubCategoryProduct(
      subcategory_product_id: $subcategory_product_id
      name: $name
      description: $description
      image: $image
    ) {
      ...subcategoryAllFields
    }
  }
`;
const DELETE_SUBCATEGORY = gql`
  ${categoryFragment.SUBCATEGORY_ALL_FIELDS}
  mutation deleteSubCategoryProduct($subcategory_product_id: String!) {
    deleteSubCategoryProduct(subcategory_product_id: $subcategory_product_id) {
      ...subcategoryAllFields
    }
  }
`;

export default {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  ADD_SUBCATEGORY,
  EDIT_SUBCATEGORY,
  DELETE_SUBCATEGORY
};
