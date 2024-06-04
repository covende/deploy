const fetchToUsers = (state, items) => ({
  ...state,
  loading: false,
  data: items,
  error: undefined
});

const addItemToUsers = (state, itemAdded) => {
  state.data.push(itemAdded);
  return {
    ...state,
    loading: false,
    data: state.data,
    error: undefined
  };
};

const editItemToUsers = (state, itemEdited) => ({
  ...state,
  loading: false,
  data: state.data.map((item) =>
    item.user_id === itemEdited.user_id ? itemEdited : item
  ),
  error: undefined
});

const deleteItemToUsers = (state, itemDeleted) => ({
  ...state,
  data: state.data.filter((item) => item.user_id !== itemDeleted.user_id),
  loading: false,
  error: undefined
});

export default {
  fetchToUsers,
  addItemToUsers,
  editItemToUsers,
  deleteItemToUsers
};
