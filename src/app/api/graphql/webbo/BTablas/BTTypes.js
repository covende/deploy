import slugify from 'slugify';
import WMTable from '../../webmodel/WMTable';
import { MODEL_TABLE_CATEGORY, MODEL_TABLE_PAGINATE } from './BTModels';

export const TABLE_CATEGORY_SAVE = ({
  title,
  slug,
  imagesize,
  limit
}) => `mutation{
    TableCategorySave(tablecategory:{title:"${title}", slug:"${slugify(
  slug
)}", imagesize:"${imagesize}", limit:${limit}})${MODEL_TABLE_CATEGORY}
  }`;

export const TABLE_CATEGORY_LIST = () => `{
    TableCategoryList${MODEL_TABLE_CATEGORY}
  }`;

export const TABLE_CATEGORY_BY_SLUG = (slug) => `{
    TableCategoryBySlug(slug:"${slug}")${MODEL_TABLE_CATEGORY}
  }`;

export const TABLE_LIST_BY_CATEGORY = ({
  idcategory,
  page = 1,
  limit = 10,
  status = true
}) => `{
    TableListByCategory(idcategory:"${idcategory}", page:${page}, limit:${limit}, status:${status})${MODEL_TABLE_PAGINATE}
  }`;

export const TABLE_LIST = ({ page = 1, limit = 10, status = true }) => `{
    TableList(page:${page}, limit:${limit}, status:${status})${MODEL_TABLE_PAGINATE}
  }`;

export const TABLE_SAVE = (table) => `mutation{
    TableSave(table:{
      code:"${table.code}"
      title:"${table.title}"
      description:"""${table.description}"""
      status:${table.status}
      idtablecategory:"${table.idtablecategory}"
      image:"${table.image}"
      imagelink:"${table.imagelink}"
      typeFile:"${table.typeFile}"
    })${WMTable}
  }`;

export const TABLE_EDIT = ({ _id, table }) => `mutation{
    TableEdit(_id: "${_id}",table:{
      code:"${table.code}"
      title:"""${table.title}"""
      description:"""${table.description}"""
      status:${table.status}
      idtablecategory:"${table.idtablecategory}"
      image:"${table.image}"
      imagelink:"${table.imagelink}"
      typeFile:"${table.typeFile}"
    })${WMTable}
  }`;

export const TABLE_DELETE = ({ _id, table }) => `mutation{
    TableDelete(_id: "${_id}",table:{
      code:"${table.code}"
      title:"${table.title}"
      description:"""${table.description}"""
      status:${table.status}
      idtablecategory:"${table.idtablecategory}"
      image:"${table.image}"
      imagelink:"${table.imagelink}"
    })${WMTable}
  }`;
