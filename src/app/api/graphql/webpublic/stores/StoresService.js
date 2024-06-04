import { IWithPagination } from '../../webbo/BInterface';
import WMCompany from '../../webmodel/WMCompany';

export const ALL_COMPANYS = ({ page = 1, limit = 10 }) => `{
    companys(page:${page}, limit:${limit}){
      ${IWithPagination(WMCompany)}
    }
  }`;

export const SALES_COMPLETED = (store) => `
{
  salesCompleted(company_id: "${store}")
}
`;

export const FIND_COMPANY = (_id, ibracket = true, fbracket = true) => `${
  ibracket ? '{' : ''
}
    company(_id:"${_id}")${WMCompany}
  ${fbracket ? '}' : ''}`;
