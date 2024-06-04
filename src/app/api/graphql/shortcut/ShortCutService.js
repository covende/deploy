import AxiosGQL from '../../rest/AxiosGQL';
import {
  SHORT_CUT_ADD,
  SHORT_CUT_DELETE,
  SHORT_CUT_FIND_BY_URI
} from './ShortCutFragment';

export const shortcutadd = async ({ redirect = '', uri = '', params = '' }) => {
  const { ShortCutAdd } = await AxiosGQL(
    SHORT_CUT_ADD({
      redirect,
      uri,
      params
    })
  );

  return ShortCutAdd || null;
};

export const shortcutfindbyuri = async (uri = '') => {
  const { ShortCutFindByUri } = await AxiosGQL(SHORT_CUT_FIND_BY_URI(uri));
  return ShortCutFindByUri || null;
};

export const shortcutdelete = async (uri = '') => {
  const { ShortCutDelete } = await AxiosGQL(SHORT_CUT_DELETE(uri));
  return ShortCutDelete || null;
};
