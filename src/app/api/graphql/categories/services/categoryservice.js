import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import {
  ADD_CATEGORY_PRODUCT,
  CATEGORIES_BY_STORE,
  CATEGORIES_HOME,
  CATEGORY_PRODUCTS_BY_ID,
  CATEGORY_PRODUCTS_LIST,
  CATEGORY_PRODUCT_BY_SLUG,
  DELETE_CATEGORY_PRODUCT,
  EDIT_CATEGORY_PRODUCT
} from './types/categorytypes';

export const categoryProductsList = async (status) => {
  const res = await AxiosGqlClient.query(CATEGORY_PRODUCTS_LIST, { status });
  return res.data.categoryProductsList;
};

export const categoriesHome = async() => {
  const res = await AxiosGqlClient.query(CATEGORIES_HOME)
  return res.data.categoriesHome
}
export const categoriesByStore = async (store_id) => {
  const res = await AxiosGqlClient.query(CATEGORIES_BY_STORE, { store_id });
  return res.data.categoriesByStore;
};
export const categoryProductBySlug = async ({ slug }) => {
  const res = await AxiosGqlClient.query(CATEGORY_PRODUCT_BY_SLUG, { slug });
  return res.data.categoryProductBySlug;
};
export const categoryProductsByID = async ({ _id }) => {
  const res = await AxiosGqlClient.query(CATEGORY_PRODUCTS_BY_ID, { _id });
  return res.data.categoryProductsByID;
};
export const addCategoryProduct = async (category) => {
  const res = await AxiosGqlClient.query(ADD_CATEGORY_PRODUCT, { ...category });
  return res.data.addCategoryProduct;
};
export const editCategoryProduct = async (category) => {
  const res = await AxiosGqlClient.query(EDIT_CATEGORY_PRODUCT, {
    ...category
  });
  return res.data.editCategoryProduct;
};
export const deleteCategoryProduct = async ({ _id }) => {
  const res = await AxiosGqlClient.query(DELETE_CATEGORY_PRODUCT, { _id });
  return res.data.deleteCategoryProduct;
};
