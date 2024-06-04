import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import {
  PLAN_CATEGORY_FIND,
  PLAN_CATEGORY_LIST,
  PLAN_CATEGORY_ROLE,
  PLAN_CATEGORY_ADD,
  PLAN_CATEGORY_EDIT
} from './types/planescategorytypes';

export const PlanCategoryFind = async (_id) => {
  const res = await AxiosGqlClient.query(PLAN_CATEGORY_FIND, { _id });
  return res.data.PlanCategoryFind;
};
export const PlanCategoryList = async () => {
  const res = await AxiosGqlClient.query(PLAN_CATEGORY_LIST);
  return res.data.PlanCategoryList;
};
export const PlanCategoryRole = async (role) => {
  const res = await AxiosGqlClient.query(PLAN_CATEGORY_ROLE, { role });
  return res.data.PlanCategoryRole;
};
export const PlanCategoryAdd = async (categorys) => {
  const res = await AxiosGqlClient.mutation(PLAN_CATEGORY_ADD, {
    ...categorys
  });
  return res.data.PlanCategoryAdd;
};
export const PlanCategoryEdit = async (categorys) => {
  const res = await AxiosGqlClient.mutation(PLAN_CATEGORY_EDIT, {
    ...categorys
  });
  return res.data.PlanCategoryEdit;
};
