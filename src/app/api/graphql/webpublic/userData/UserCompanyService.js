import WMCompany from '../../webmodel/WMCompany';
import WMCompanyDirection, {
  WMCompanyDirectionForUpdate
} from '../../webmodel/WMCompanyDirection';
import WMTable from '../../webmodel/WMTable';
import { gql } from 'graphql-request';
export const COMPANY_BY_ID = (id) => `{
    company(_id:  "${id}")${WMCompany}
  }`;

export const BANK_COMPANY_BY_ID = (id) => `
  {
     companyAccountBank(company: "${id}"){
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
    } `;

export const GET_DEFAULT_DIRECTION_COMPANY = (company_id) => `{
	getDefaultDirectionCompany(company_id:"${company_id}")${WMCompanyDirection}
}`;

export const EDIT_COMPANY_DIRECTION = (directions, storeID) => `
  mutation {
	  editCompanyDirection(
      type_local:"${directions.type_local}"
      supervisor:"${directions.supervisor}"
      phone:"${directions.phone}"
      street_fiscal:"${directions.street_fiscal}"
      country:"${directions.country}"
      state:"${directions.state}"
      province:"${directions.province}"
      district:"${directions.district}"
      zipcode:"${directions.zipcode}"
      company:"${storeID}"
      company_direction_id: "${directions.id}"
      reference:"${directions.reference}"
    )${WMCompanyDirection}
  }`;

export const ADD_COMPANY_DIRECTIONS = (directions, storeID) => {
  return gql`
  mutation {
    companyDirection(
      type_local:"${directions.type_local}"
      supervisor:"${directions.supervisor}"
      phone:"${directions.phone}"
      street_fiscal:"${directions.street_fiscal}"
      country:"${directions.country}"
      state:"${directions.state}"
      province:"${directions.province}"
      district:"${directions.district}"
      zipcode:"${directions.zipcode}"
      company:"${storeID}"
      reference:"${directions.reference}"
    )${WMCompanyDirection}
  }
`;
};

export const SET_DEFAULT_DIRECTION = (storeID, direction_id) => {
  return gql`
    mutation {
      setAsDefaultDirection
        (company_id:"${storeID}"  company_direction_id :"${direction_id}" ) ${WMCompanyDirection}
    }
  `;
};

export const GET_COMPANY_DIRECTIONS_BY_ID = (storeID) => {
  return gql`
    query {
      companyDirectionsByID(company_id:"${storeID}" ) ${WMCompanyDirection}
    }
  `;
};

export const DELETE_COMPANY_DIRECTIONS = (storeID, direction_id) => {
  return gql`
    mutation {
      deleteCompanyDirection
        (company:"${storeID}"  company_direction_id :"${direction_id}" ) 
    }
  `;
};

export const COMPANY_MANAGER_BY_OWNER = (id) => gql`
{
  CompanyManagerByOwner(owner: "${id}") {
    owner
    name
    last_name
    dni
    file_dni
    email
    phone
    contact
  }
}
`;

export const GET_SALES_CUT_BY_COMPANY = (store_id) => `{
 getSalesCutByCompany(company_id: "${store_id}") {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    salesCut {
      _id
      code
      deposit
      income
      excess_send
      dev_can
      commissions_cancellation
      previous_balance
      status
      store_id
      invoice_url
      confirmedAt
      createdAt
      payment_status
      comission_cv
      igv_comission_cv
      own_shipping
    }
  }
}`;

export const GET_SELLER_BALANCES = (store_id) => `
{
  getSellerBalances(company_id: "${store_id}") {
    status
    message
    sellerBalances {
      balanceBySettle
      availableBalance
    }
  }
}

`;

export const GET_TRANSACTIONS_BY_SELLER = ({
  store_id,
  code,
  itemsPage,
  page
}) => `
{
  getTransactionsBySeller(
    company_id: "${store_id}"
    code: "${code}"
    itemsPage: ${itemsPage}
    page: ${page}
  ) {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    transactions {
      date
      order
      price
      commission
      own_shipping
      comission_own_shipping
      excess_send
      deposit
      discounts
      discount_detail {
        description
        amount
        extra_send
        others
      }
    }
  }
}
`;

export const SELLER_INCOME = (store_id) => `{
  sellerIncome(company_id: "${store_id}") {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    sellerIncome {
      _id
      code
      deposit
      income
      dev_can
      excess_send
      previous_balance
      invoice_url
	    confirmedAt
      status
      store_id
      transactions {
        date
        order
        price
        commission
        excess_send
        discounts
        deposit
        discount_detail {
          description
          amount
          extra_send
          others
        }
      }
    }
  }
}`;

export const CONFIRM_SALE_CUT_BY_COMPANY = (code, store_id) => `
mutation {
  confirmSaleCutByCompany(code: "${code}", company_id: "${store_id}") {
    status
    message
    invoice_url
    confirmedAt
  }
}
`;
