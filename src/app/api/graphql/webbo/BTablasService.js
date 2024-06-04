import AxiosGQL from '../../rest/AxiosGQL';
import {
  TABLE_CATEGORY_BY_SLUG,
  TABLE_CATEGORY_LIST,
  TABLE_CATEGORY_SAVE,
  TABLE_DELETE,
  TABLE_EDIT,
  TABLE_LIST,
  TABLE_LIST_BY_CATEGORY,
  TABLE_SAVE
} from './BTablas/BTTypes';

export const table_category_save = async ({
  slug,
  title,
  imagesize,
  limit
}) => {
  const { TableCategorySave } = await AxiosGQL(
    TABLE_CATEGORY_SAVE({ slug, title, imagesize, limit })
  );
  return TableCategorySave;
};
export const table_category_list = async () => {
  const { TableCategoryList } = await AxiosGQL(TABLE_CATEGORY_LIST());
  return TableCategoryList;
};
export const table_category_by_slug = async (slug) => {
  const { TableCategoryBySlug } = await AxiosGQL(TABLE_CATEGORY_BY_SLUG(slug));
  return TableCategoryBySlug;
};
export const table_list_by_category = async ({
  idcategory,
  page = 1,
  limit = 10,
  status = true
}) => {
  const { TableListByCategory } = await AxiosGQL(
    TABLE_LIST_BY_CATEGORY({ idcategory, page, limit, status })
  );
  return TableListByCategory;
};

export const table_list = async ({ page = 1, limit = 10, status = true }) => {
  const { TableList } = await AxiosGQL(TABLE_LIST({ page, limit, status }));
  return TableList;
};

export const table_save = async (table) => {
  const { TableSave } = await AxiosGQL(TABLE_SAVE(table));
  return TableSave;
};
export const table_edit = async ({ _id, table }) => {
  const { TableEdit } = await AxiosGQL(TABLE_EDIT({ _id, table }));
  return TableEdit;
};

export const table_delete = async ({ _id, table }) => {
  const { TableDelete } = await AxiosGQL(TABLE_DELETE({ _id, table }));
  return TableDelete;
};
