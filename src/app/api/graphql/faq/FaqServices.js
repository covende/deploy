import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';

const modelo = ` _id       
             category
              position
              quantity
              type_faq
              status
              icon
              `;

const modelo_question = ` 
  id
  faq_question
  answer
  status
          `;

export const LIST_FAQ = (type) => {
  return gql`
  query {
       Faq( 
         faqType:"${type}"
      ){${modelo}}
    }
  `;
};

export const DELETE_FAQ = ({ itemDeleted }) => {
  console.log({ itemDeleted });
  return gql`
    mutation {
      deleteFaq( 
         _id:"${itemDeleted}"
      ){${modelo}}
    }
  `;
};

export const ADD_FAQ = ({ faqt }) => {
  return gql`
    mutation {
      addFaq(
        category:"${faqt[0].category}"
        position:${faqt[0].position}
        type_faq:"${faqt[0].type_faq}"
        status:${faqt[0].status}
        icon: "${faqt[0].icon}" 
      ){${modelo}}
    }
  `;
};

export const ADD_QUESTION = gql`
    mutation addFaqQuestion(
      $faq_question: String!
      $answer: String!
      $cotegory_faq: String!
      $status: Boolean!
    ){
      addFaqQuestion(
        faq_question: $faq_question
        answer: $answer
        cotegory_faq: $cotegory_faq
        status: $status 
      ){${modelo_question}}
    }
  `;

export const addQuestions = async (newQuestion) => {
  const res = await AxiosGqlClient.query(ADD_QUESTION, {
    ...newQuestion,
    status: !!newQuestion.status
  });
  return res.data.addFaqQuestion;
};

export const UPDATE_FAQ = ({ faq }) => {
  return gql`
    mutation {
      editFaq(
        _id:"${faq._id}"
        category:"${faq.category}"
        position:${faq.position}
        type_faq:"${faq.type_faq}"
        status:${faq.status || true}
        icon:"${faq.icon}"
      ){${modelo}}
    }
  `;
};
