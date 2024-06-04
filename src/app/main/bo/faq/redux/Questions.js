const tstate = {
  modalview: '',
  roles: [],
  roleSelected: '',
  Preguntas: [],
  Dato: '',
  pregunta: {
    _id: '',
    faq_question: '',
    answer: '',
    status: true
  },
  cotegory_faq: {
    id: '',
    category: ''
  }
};

function Questions(state = tstate, { type, data }) {
  switch (type) {
    case 'QUESTIONS':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default Questions;
