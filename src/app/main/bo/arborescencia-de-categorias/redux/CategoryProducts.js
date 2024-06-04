const tstate = {
  loading: true,
  categorys: [],
  treecategorys: [],
  parent_id: '',
  _id: ''
};

function CategoryProducts(state = tstate, { type, data }) {
  switch (type) {
    case 'CATEGORYPRODUCTS':
      return { ...state, ...data };
    default:
      return state;
  }
}

export default CategoryProducts;
