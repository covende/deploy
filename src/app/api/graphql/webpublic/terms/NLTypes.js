import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';

const modelo =`_id
              contents
              createdAt
              updatedAt
             `;

export const LIST_TERM = () => {
  return gql`
  query {
       Terms
       {${modelo}}
    }
  `;
};

export const DELETE_TERM = ({ itemDeleted }) => {
  console.log({ itemDeleted });
  return gql`
    mutation {
      deleteTerms( 
         _id:"${itemDeleted}"
      ){${modelo}}
    }
  `;
};

export const ADD_TERM = ({ terms,contents }) => {
  return gql`
    mutation {
      addTerms(
        contents:"${contents[0].contents }"
        status:${terms[0].status}
    
      ){${modelo}}
    }
  `;
};

export const EDIT_TERM = ({terms}) =>{
  return gql`
  mutation {
    editTerms(
      _id:"${terms._id}"
      contents:"${terms.contents}"
      status:"${terms.status || true}
      ){${modelo}}
    }
  `;
}