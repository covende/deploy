const tstate = {
  client: {}
};

function Clients(state = tstate, { type, data }) {
  switch (type) {
    case 'CLIENTS':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default Clients;
