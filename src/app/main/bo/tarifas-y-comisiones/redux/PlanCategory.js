const tstate = {
  plancategorys: [],
  plancategory: {
    _id: '',
    name: '',
    role: '',
    description: '',
    subcategories: [],
    status: true
  },
  plansubcategory: {
    _id: '',
    name: '',
    role: '',
    description: '',
    idcategory: '',
    mimimun: '',
    percent: '',
    status: true,
    datestart: new Date(),
    dateends: new Date()
  }
};

function Plancategory(state = tstate, { type, data }) {
  switch (type) {
    case 'PLANCATEGORY':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default Plancategory;
