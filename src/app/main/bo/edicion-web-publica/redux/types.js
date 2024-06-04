import { basicTypes } from '@/app/redux/common/types';

const TYPES_BANNERS_OFFERS = basicTypes(
  'BACKOFFICE_WEBPUBLICEDITION_BANNERS_OFFERS'
);
const TYPES_BANNERS_CATEGORY = basicTypes(
  'BACKOFFICE_WEBPUBLICEDITION_BANNERS_CATEGORY'
);
const TYPES_BANNERS_HOME = basicTypes(
  'BACKOFFICE_WEBPUBLICEDITION_BANNERS_HOME'
);
const TYPES_BANNER_LOGIN = basicTypes(
  'BACKOFFICE_WEBPUBLICEDITION_BANNER_LOGIN'
);
const TYPES_BANNER_CREA_TIENDA = basicTypes(
  'BACKOFFICE_WEBPUBLICEDITION_BANNER_CREA_TIENDA'
);

const MERGE_TYPES = {
  BANNERS_OFFERS: TYPES_BANNERS_OFFERS,
  BANNERS_CATEGORY: TYPES_BANNERS_CATEGORY,
  BANNERS_HOME: TYPES_BANNERS_HOME,
  BANNER_LOGIN: TYPES_BANNER_LOGIN,
  BANNER_CREA_TIENDA: TYPES_BANNER_CREA_TIENDA
};

export default MERGE_TYPES;