const tstate = {
  modalview: '',
  roles: [],
  roleSelected: '',
  planes: [],
  plan: {
    _id: '',
    name: '',
    role: '',
    description: '',
    specifications: '',
    price: '',
    periodo: '',
    subaccounts: 0,
    unlimited: false,
    productsPost: 0,
    datestart: new Date(),
    dateends: new Date(),
    status: true
  }
};

function Planes(state = tstate, { type, data }) {
  switch (type) {
    case 'PLANES':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default Planes;
