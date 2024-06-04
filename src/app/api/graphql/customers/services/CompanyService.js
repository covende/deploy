import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import WMCompany from '../../webmodel/WMCompany';
import WMCompanyDirection from '../../webmodel/WMCompanyDirection';

export const companyByID = async (_id) => {
  const query = `query company($id: String!){
        company(_id:$id)${WMCompany}
    }`;

  const query2 = `query companyDirectionsByID($company_id: String!){
        companyDirectionsByID(company_id:$company_id)${WMCompanyDirection}
    }`;

  const res = await AxiosGqlClient.query(query, { id: _id });
  const res2 = await AxiosGqlClient.query(query2, { company_id: _id });

  return { ...res.data.company, directions: res2.data.companyDirectionsByID };
};
