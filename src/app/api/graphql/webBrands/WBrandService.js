import AxiosGQL from '../../rest/AxiosGQL';
import {
  ACTIVE_BRAND,
  ACTIVE_BRAND_REQUEST,
  ADD_BRAND,
  ALL_BRANDS_PAGINATIONS,
  BRANDS_REQUEST,
  DELETE_BRAND,
  DELETE_BRAND_REQUEST,
  UPDATE_BRAND
} from './WBrandTypes';

export const all_brands_paginations = async ({
  page,
  itemsPage,
  active,
  type_brand,
  search,
 asesor
}) => {
  const { brandsPagination } = await AxiosGQL(
    ALL_BRANDS_PAGINATIONS({ page, itemsPage, type_brand, active, search, asesor })
  );
  return brandsPagination;
};

export const active_brand = async ({ brand_id, flag_active }) => {
  const { activeBrand } = await AxiosGQL(
    ACTIVE_BRAND({ brand_id, flag_active })
  );
  return activeBrand;
};

export const brands_request = async ({ page, itemsPage, status }) => {
  const { listBrandsRequest } = await AxiosGQL(
    BRANDS_REQUEST({ page, itemsPage, status })
  );
  return listBrandsRequest;
};

export const active_brand_request = async ({ id, active }) => {
  const { activeBrandRequest } = await AxiosGQL(
    ACTIVE_BRAND_REQUEST({ id, active })
  );
  return activeBrandRequest;
};

export const delete_brand_request = async ({ id }) => {
  const { deleteBrandRequest } = await AxiosGQL(DELETE_BRAND_REQUEST({ id }));
  return deleteBrandRequest;
};

export const add_brand = async ({ name, image, flag_active }) => {
  const { addBrand } = await AxiosGQL(ADD_BRAND({ name, image, flag_active }));
  return addBrand;
};

export const update_brand = async ({ id, name, image, flag_active }) => {
  const { editBrand } = await AxiosGQL(
    UPDATE_BRAND({ id, name, image, flag_active })
  );
  return editBrand;
};

export const delete_brand = async ({ id }) => {
  const { deleteBrand } = await AxiosGQL(DELETE_BRAND({ id }));
  return deleteBrand;
};
