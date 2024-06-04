const tstate = {
  loading: false,
  error: false,
};

function Globales(state = tstate, { type, data }) {
  switch (type) {
    case 'GLOBALES':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default Globales;
