import WMCompany from '../webmodel/WMCompany';
import WMCompanyDirection from '../webmodel/WMCompanyDirection';
import WMCustomer from '../webmodel/WMCustomer';
import WMInfo from '../webmodel/WMInfo';
import WMTable from '../webmodel/WMTable';
import WMUserFind from '../webmodel/WMUserFind';
import WMUsuario from '../webmodel/WMUsuario';
import { IWithPagination } from './BInterface';
import { gql } from 'graphql-request';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

const validateFechas = (datestart, dateend) => {
  const start = new Date(datestart || '');
  const end = new Date(dateend || '');
  if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
    return `range_date: {
    desde:"${datestart.toISOString()}"
    hasta:"${dateend.toISOString()}"
  }`;
  } else {
    return '';
  }
};

export const ALL_COMPANIES_CATEGORIES = (page = 1, limit = 10, filtros) => `
{
  allCompanies(
    page: ${page}
    limit: ${limit}
    search: "${filtros.search || ''}"
    environment: "${filtros.ambiente || ''}"
    asesor: "${filtros.ejecutivo || ''}"
    ${validateFechas(filtros?.datestart, filtros?.dateend)}
    categories: ${JSON.stringify(filtros?.categories || [])}
  ) {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    data {
      custom_id
      name
      email
      phone
      contact
      asesor
      subscription_status
      lastConnectionDate
      total_approved_products
      total_products
      customer_id
    }
    
  }
}


`;

export const ALL_CUSTOMERS = (page = 1, limit = 10, filtros) => `
{
    customers(
        page:${page}
        limit:${limit}
        environment: "${filtros.ambiente}"
        asesor: "${filtros.ejecutivo}"
        flagActive: "${filtros?.bloqueados || ''}"
        flagValidated: "${filtros?.verificados || ''}"
        ${filtros.search != '' ? `name: "${filtros.search}"` : ''}
        ${filtros.tipo != '' ? `roleID: "${filtros.tipo}"` : ''}
        ${validateFechas(filtros?.datestart, filtros?.dateend)}
       categories: ${JSON.stringify(filtros?.categories_ids || [])}
      
    ){
        ${IWithPagination(`${WMCustomer} }   
    `)}
  }
`;

export const ALL_EJECUTIVOS = () => `{
  getExecutives {
    text
    value
  }
}`;

export const USER_FIND = (user_id) => `{
    userFind(_id:"${user_id}")${WMUserFind}
}`;

export const COMPANY_BY_OWNER = (user_id) => `{
    companyByOwner(owner:"${user_id}")${WMCompany}
  }`;

export const COMPANY_DIRECTIONS_BY_COMPANY = (company_id) => `{
    companyDirectionsByID(company_id:"${company_id}")${WMCompanyDirection}
  }`;

export const ACTIVE_DELIVERY_OWN = (company_id, active) => `
    mutation {
      activeDeliveryOwn(company_id: "${company_id}", status: ${active}) {
        status
        message
      }
    }
`;

export const DELIVERY_OWN_BY_COMPANY = (company_id) => `{
  getDeliveryOwn(company_id: "${company_id}"){
    status
    message
    data {
      name
      fileRate
      statusFileRate
      company_id
      asesor
      status
      information_legal
      policies_terms
    }
  }
}`;

export const LIST_OF_STORE_SUBACCOUNTS = (store_id) => `{
  listOfStoreSubaccounts(store_id:"${store_id}"){
    ${WMInfo}
    usersList${WMUsuario}
  }
}`;

export const COMPANY_ACCOUNT_BANK = (company_id) => `{
  companyAccountBank(
    company:"${company_id}"
  ){
    _id
    owner
    company
    titular
    numeroCC
    numeroCCI
    tipocuenta
    bank${WMTable}
    status
  }
}`;

export const COMPANY_CREDITCARD = (company_id) => `{
  companyCreditCard(company: "${company_id}") {
    _id
    user_id
    type_card_id
    number_card
    name_owner
    expiration_date
    type_card${WMTable}
  }
}`;

export const COMPANY_COMPANY_DOCUMENTS = (company_id) => `{
  companyCompanyDocuments(company:"${company_id}"){
    _id
    owner
    company
    asesor
    titleRUC
    fileRUC
    statusRUC
    titleDNI
    fileDNI
    statusDNI
    titleCC
    fileCC
    statusCC
    titleCCI
    fileCCI
    statusCCI
    status
  }
}`;

export const PLANS_BY_COMPANY = (company_id) => `{
  plansByCompany(company_id:"${company_id}"
  itemsPage: 10
  relations:{ methodPayment: true} ){
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    plans {
      custom_id
      status
      fecha_inicio
      fecha_fin
      methodPayment {
        title
      }
      name
      details
      amount_final
      payment_date
      payment_status
      company {
        custom_id
      }
      productsPost
      unlimited
      subaccounts
      period {
        value
        type
      }
    }
  }
}`;

export const GET_CURRENT_COMPANY_PLAN = (company_id) => `{
  getCurrentPlanByCompany(company_id:"${company_id}", relations:{ methodPayment: true } ){
    custom_id
    status
    fecha_inicio
    fecha_fin
    methodPayment{
      code
      title
      description
      status     
    }
    name
    amount_original
    amount_final
    payment_status
    payment_method_status
    discount_percentage
    payment_date
    total_discount
    company{
        _id
      custom_id
      comercial_name
    }  
   
  }
}`;

export const NAMES_ASSESOR_COMPANY_DOCUMENTS = (assessor_id) => `{
  getAssessorCompanyDocument(assessor_id:"${assessor_id}"){
  first_name
    last_name
    role_name
  }
}`;

export const STATUS_STORE = ({ store_id, status, user_id }) => `mutation{
  statusstore(
    store_id:"${store_id}"
    status:"${status}"
    user_id:"${user_id}"
  ){
    status
    message
    data
  }
}`;

export const UPDATE_ATTRIBUTE_CUSTOMER = ({
  _id,
  attribute,
  value
}) => `mutation{
  updateattributecustomer(
    _id:"${_id}"
    attribute:"${attribute}"
    value:${value}
  ){
    status
    message
    data
  }
}`;

export const VALIDATE_URL_BY_COMPANY = gql`
  query validateUrlBycompany($company_id: String!, $url: String!) {
    validateUrlBycompany(company_id: $company_id, url: $url)
  }
`;

export const validateUrlByCompany = async (variables) => {
  const res = await AxiosGqlClient.query(VALIDATE_URL_BY_COMPANY, variables);
  return res.data;
};

export const UPDATE_STORE_DATA = (store, companyData) => {
  return `mutation{
    editCompany(
      company_id:"${companyData._id}"
      logo:"${store.logo}"
      url:"${store.url}"
      company_description:"${store.description}"
      main_banner:"${store.banner}"
      secondary_banner:"${store.secondbaneer}"
      sliders:["${store.slider || ''}"]
      category_images:["${store.categoriamage || ''}"]
    ){
    _id  
    }
  }`;
};

export const UPDATE_STORE_DATAs = gql`
  mutation editCompany(
    $company_id: String!
    $logo: String
    $url: String
    $company_description: String
    $main_banner: String
    $secondary_banner: String
    $sliders: [String]
    $category_images: [String]
    $percentage_commission: Float
    $comercial_name: String
    $social_razon: String
    $ruc: String
    $sociedad: String
    $state: String
    $province: String
    $district: String
    $direction: String
    $type_of_sale: String
    $reference: String
    $phone: String
  ) {
    editCompany(
      company_id: $company_id
      logo: $logo
      url: $url
      reference: $reference
      phone: $phone
      company_description: $company_description
      main_banner: $main_banner
      secondary_banner: $secondary_banner
      sliders: $sliders
      category_images: $category_images
      percentage_commission: $percentage_commission
      comercial_name: $comercial_name
      social_razon: $social_razon
      ruc: $ruc
      sociedad: $sociedad
      direction: $direction
      state: $state
      province: $province
      district: $district
      type_of_sale: $type_of_sale
    ) {
      _id
    }
  }
`;

export const EDIT_USER_DATA = gql`
  mutation editUser(
    $user_id: String
    $email: String
    $first_name: String
    $last_name: String
    $dni: String
    $phone: String
    $image: String
    $tipodoc: String
    $isRepresent: Boolean
  ) {
    editUser(
      user_id: $user_id
      email: $email
      first_name: $first_name
      last_name: $last_name
      dni: $dni
      phone: $phone
      image: $image
      tipodoc: $tipodoc
      isRepresent: $isRepresent
    ) {
      user_id
    }
  }
`;

export const AVAILABLE_EMAIL_USER_DATA = gql`
  query isAvailableEmailByUser($user_id: String!, $email: String!) {
    isAvailableEmailByUser(user_id: $user_id, email: $email)
  }
`;

export const updateStoreData = async (variables) => {
  const res = await AxiosGqlClient.query(UPDATE_STORE_DATAs, variables);
  return res.data;
};

export const updateUserData = async (variables) => {
  const res = await AxiosGqlClient.query(EDIT_USER_DATA, variables);
  return res.data;
};

export const isAvailableEmailByUser = async (variables) => {
  const res = await AxiosGqlClient.query(AVAILABLE_EMAIL_USER_DATA, variables);
  return res.data;
};
