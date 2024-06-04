const tstate = {
  modalview: '',
  Faqs: [],
  qwestion: {
    id: '',
    category: '',
    question: '',
    answer: '',
    status: false
  },
  faq: {
    _id: '',
    type_faq: '',
    category: '',
    position: 0,
    quantity: 0,
    status: false
  }
};

function Faq(state = tstate, { type, data }) {
  switch (type) {
    case 'FAQ':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default Faq;
