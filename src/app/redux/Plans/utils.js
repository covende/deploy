const fetchToPlans = (state, items) => ({
  ...state,
  loading: false,
  data: items,
  error: undefined
});

const fetchByRolesToPlans = (state, items) => ({
  ...state,
  loading: false,
  data: items.data,
  error: undefined
});

const addItemToPlans = (state, added) => {
  state.data.push(added);
  return {
    ...state,
    loading: false,
    data: state.data,
    error: undefined
  };
};

const editItemToPlans = (state, edited) => ({
  ...state,
  loading: false,
  data: state.data.map((item) =>
    item.planID === edited.planID ? edited : item
  ),
  error: undefined
});

const deleteItemToPlans = (state, deleted) => ({
  ...state,
  data: state.data.filter((item) => item.planID !== deleted.planID),
  loading: false,
  error: undefined
});

export default {
  fetchToPlans,
  fetchByRolesToPlans,
  addItemToPlans,
  editItemToPlans,
  deleteItemToPlans
};
