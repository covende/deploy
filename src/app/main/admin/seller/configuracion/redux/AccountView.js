const tstate = {
  tabIndex: 0,
  usersData: []
};

function AccountView(state = tstate, { type, data }) {
  switch (type) {
    case 'ACCOUNTVIEW':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default AccountView;
