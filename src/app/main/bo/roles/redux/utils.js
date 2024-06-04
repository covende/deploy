const fetchToBackoffice_Roles = (state, items) => ({
  ...state,
  loading: false,
  data: items,
  error: undefined
});

const addItemToBackoffice_Roles = (state, itemAdded) => {
  state.data.push(itemAdded);
  return {
    ...state,
    loading: false,
    data: state.data,
    error: undefined
  };
};

const editItemToBackoffice_Roles = (state, itemEdited) => ({
  ...state,
  loading: false,
  data: state.data.map((item) =>
    item.role_id === itemEdited.role_id ? itemEdited : item
  ),
  error: undefined
});

const deleteItemToBackoffice_Roles = (state, itemDeleted) => ({
  ...state,
  data: state.data.filter((item) => item.role_id !== itemDeleted.role_id),
  loading: false,
  error: undefined
});

export default {
  fetchToBackoffice_Roles,
  addItemToBackoffice_Roles,
  editItemToBackoffice_Roles,
  deleteItemToBackoffice_Roles
};
