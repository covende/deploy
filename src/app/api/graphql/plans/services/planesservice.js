import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import {
  FIND_ALL_BY_ROLE,
  FIND_BY_ID,
  ADD_PLAN,
  EDIT_PLAN,
  DELETE_PLAN,
  ALL_PLANS
} from './types/planestypes';

export const plans = async () => {
  const res = await AxiosGqlClient.query(ALL_PLANS);
  return res.data.plans;
};
export const planByID = async (_id) => {
  const res = await AxiosGqlClient.query(FIND_BY_ID, { _id });
  return res.data.planByID;
};
export const plansByName = async () => {};
export const plansByRole = async (role) => {
  const res = await AxiosGqlClient.query(FIND_ALL_BY_ROLE, { role });
  return res.data.plansByRole;
};
export const addPlan = async (plans) => {
  const res = await AxiosGqlClient.query(ADD_PLAN, { ...plans });
  return res.data.addPlan;
};
export const editPlan = async (plans) => {
  const res = await AxiosGqlClient.query(EDIT_PLAN, { ...plans });
  return res.data.editPlan;
};
export const deletePlan = async (_id) => {
  const res = await AxiosGqlClient.query(DELETE_PLAN, { _id });
  return res.data.deletePlan;
};
