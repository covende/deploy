export const LIST_FAQ_QUESTION = () => `{
   FaqQuestion{
    id
    faq_question
    answer
    cotegory_faq{
      id
      category
    }
    status
  }
}`;

export const ADD_FAQ_QUESTION = ({
  faq_question,
  answer,
  cotegory_faq
}) => `mutation{
  addFaqQuestion(
    faq_question:"${faq_question}"
    answer:"${answer}"
    cotegory_faq:${cotegory_faq}
    status:true
  ){
    id
    faq_question
    answer
    cotegory_faq
    status
  }
}`;
