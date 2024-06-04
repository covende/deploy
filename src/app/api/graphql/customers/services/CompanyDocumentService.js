import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

const modelo = `_id
owner
company
asesor{
  customer_id
}
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
status`;

export const findCompanyDocuments = async (_id) => {
  const query = `query findCompanyDocuments($id: String!){
        findCompanyDocuments(_id:$id){
            ${modelo}
        }
    }`;
  const res = await AxiosGqlClient.query(query, { id: _id });
  return res.data.findCompanyDocuments;
};

export const reviceCompanyDocuments = async (_id, attribute, status) => {
  const query = `mutation reviceCompanyDocuments(
        $id: String!
        $attribute: String!    
        $status: String!
        ){
        reviceCompanyDocuments(
            _id:$id
            attribute:$attribute   
            status:$status
        )
    }`;
  const res = await AxiosGqlClient.mutation(query, {
    id: _id,
    attribute: attribute,
    status: status
  });
  return res.data.reviceCompanyDocuments;
};

export const companyUpStatus = async (_id, status) => {
  return 'update';
};
