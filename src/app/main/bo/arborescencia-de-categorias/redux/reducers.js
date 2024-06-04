import Types from './types';

const INIT_STATE = {
  loading: true,
  error: undefined,
  data: undefined,
  selected: false
};
const haveParent = (cat) =>
  cat.category_product_id_parent === '' ||
  cat.category_product_id_parent === null;

const findChilds = (childs, categoryParentID) =>
  childs.filter(
    (item) => item.child.category_product_id_parent === categoryParentID
  );

const findGrandChilds = (grandchilds, childID) =>
  grandchilds.filter(
    (grandchild) => grandchild.category_product_id_parent === childID
  );

const clustering = (allCategories) => {
  // Filtrando padres e hijos
  let parents = [];
  let childs_raw = [];
  allCategories.map((category) => {
    if (haveParent(category)) {
      parents = [...parents, category];
    } else {
      childs_raw = [...childs_raw, category];
    }
  });

  // Filtrando hijos y nietos
  let childs = [];
  let grandchilds_tmp = [];
  childs_raw.map((category) => {
    grandchilds_tmp = findGrandChilds(childs_raw, category.category_product_id);
    childs = [
      ...childs,
      {
        child: category,
        grandchilds: grandchilds_tmp,
        grandchildsLength: grandchilds_tmp.length
      }
    ];
  });

  // Compactando datos genealógicamente
  let hierarchy = [];
  let childs_tmp = [];
  parents.map((category) => {
    let lengthGrandchild = 0;
    childs_tmp = findChilds(childs, category.category_product_id);
    childs_tmp.map((child) => {
      lengthGrandchild += child.grandchildsLength;
    });
    hierarchy = [
      ...hierarchy,
      {
        parent: category,
        childs: childs_tmp,
        childLength: childs_tmp.length,
        grandchildLength: lengthGrandchild
      }
    ];
  });

  return { parents, childs: childs_raw, hierarchy };
};

const Backoffice_Categories = (state = INIT_STATE, action) => {
  let allCategories = [];
  let filterData = {};
  switch (action.type) {
    case Types.FETCH:
      return { ...state, loading: true };
    case Types.FETCH_SUCCEEDED:
      allCategories = action.results;
      filterData = clustering(allCategories);
      return {
        ...state,
        loading: false,
        data: allCategories,
        parents: filterData.parents,
        childs: filterData.childs,
        hierarchy: filterData.hierarchy,
        error: undefined
      };
    case Types.FETCH_FAILED:
      return { ...state, error: action.message, loading: false };
    case Types.ADD_ITEM:
      return { ...state, loading: false };
    case Types.ADD_ITEM_SUCCEEDED:
      state.data.unshift(action.payload);
      allCategories = state.data;
      filterData = clustering(allCategories);
      return {
        ...state,
        loading: false,
        parents: filterData.parents,
        childs: filterData.childs,
        hierarchy: filterData.hierarchy,
        error: undefined
      };
    case Types.ADD_ITEM_FAILED:
      return { ...state, error: action.message, loading: false };
    case Types.EDIT_ITEM:
      return { ...state, loading: false };
    case Types.EDIT_ITEM_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: state.data.map((item) =>
          item.category_product_id === action.payload.category_product_id
            ? action.payload
            : item
        ),
        error: undefined
      };
    case Types.EDIT_ITEM_FAILED:
      return { ...state, error: action.message, loading: false };
    case Types.DELETE_ITEM:
      return { ...state, loading: false };
    case Types.DELETE_ITEM_SUCCEEDED:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.category_product_id !== action.payload.category_product_id
        ),
        loading: false,
        error: undefined
      };
    case Types.DELETE_ITEM_FAILED:
      return { ...state, error: action.message, loading: false };
    default:
      return { ...state };
  }
};

export default Backoffice_Categories;
