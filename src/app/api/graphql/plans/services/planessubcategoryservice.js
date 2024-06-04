import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import {
  PLAN_SUBCATEGORY_FIND,
  PLAN_SUBCATEGORY_EDIT,
  PLAN_SUBCATEGORY_ADD,
  PLAN_SUBCATEGORY_REMOVE
} from './types/planessubcategorytypes';

export const PlansubcategoryFind = async (_id) => {
  const res = await AxiosGqlClient.query(PLAN_SUBCATEGORY_FIND, { _id });
  return res.data.PlansubcategoryFind;
};
export const PlansubcategoryEdit = async (subcategory) => {
  const res = await AxiosGqlClient.query(PLAN_SUBCATEGORY_EDIT, {
    ...subcategory
  });
  return res.data.PlansubcategoryEdit;
};
export const PlansubcategoryAdd = async (subcategory) => {
  const res = await AxiosGqlClient.query(PLAN_SUBCATEGORY_ADD, {
    ...subcategory
  });
  return res.data.PlansubcategoryAdd;
};
export const PlansubcategoryRemove = async (_id) => {
  const res = await AxiosGqlClient.query(PLAN_SUBCATEGORY_REMOVE, { _id });
  return res.data.PlansubcategoryRemove;
};
