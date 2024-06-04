import WMTable from '../../webmodel/WMTable';
import { IWithPagination } from '../BInterface';

export const MODEL_TABLE_CATEGORY = `{
    _id
    title
    slug
    imagesize
    limit
  }`;

export const MODEL_TABLE_PAGINATE = `{${IWithPagination(WMTable)}}`;
