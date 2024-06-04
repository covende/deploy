import WMBrand from '../webmodel/WMBrand';
import WMInfo from '../webmodel/WMInfo';

const WMBrandRequest = `{
  id
  store_id
  store {
    comercial_name
  }
  owner_type
  name
  description
  patented_brand
  registration_or_permission_pdf
  logo
  place
  place_links
  status
  createdAt
}`;

export const ALL_BRANDS_PAGINATIONS = ({
  page,
  itemsPage,
  active,
  type_brand,
  search = '',
  asesor = ''

}) => `{
  brandsPagination(
    page:${page}
    itemsPage:${itemsPage}
    type_brand:"${type_brand || ''}"
    active:"${active || ''}"
    search:"${search}"
    asesor:"${asesor}"
   
    ) {
    ${WMInfo}
    brands${WMBrand}
  }
}`;


export const ACTIVE_BRAND = ({ brand_id, flag_active }) => `
mutation {
  activeBrand(
    brand_id:"${brand_id}"
    flag_active:${flag_active}
  ) {
    status
    message
    brand${WMBrand}
  }
}
`;

export const BRANDS_REQUEST = ({ page, itemsPage, status }) => `
{
  listBrandsRequest(
    page:${page}
    itemsPage:${itemsPage}
    status: "${status || ''}"
    ) {
     ${WMInfo}
    brandsRequest${WMBrandRequest}
  }
}
`;

export const ACTIVE_BRAND_REQUEST = ({ id, active }) => `
mutation {
  activeBrandRequest(
    id:"${id}"
    active:${active}
  ) {
    status
    message
    brandRequest${WMBrandRequest}
  }
}
`;

export const DELETE_BRAND_REQUEST = ({ id }) => `
mutation {
  deleteBrandRequest(
    id:"${id}"
  ) {
    status
    message
    brandRequest${WMBrandRequest}
  }
}
`;

export const ADD_BRAND = ({ name, image, flag_active }) => `
mutation {
  addBrand(
    name: "${name}"
    image: "${image}"
    flag_active: ${flag_active}
  ) {
    status
    message
     brand${WMBrand}
  }
}
`;

export const UPDATE_BRAND = ({ id, name, image, flag_active }) => `
mutation {
  editBrand(
    brand_id: "${id}"
    name: "${name}"
    image: "${image}"
    flag_active: ${flag_active}
  ) {
    status
    message
    brand${WMBrand}
  }
}
`;

export const DELETE_BRAND = ({ id }) => `
mutation {
  deleteBrand(
    brand_id: "${id}"
  ) {
    status
    message
    brand${WMBrand}
  }
}
`;
