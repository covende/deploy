const id_cart = window.localStorage.getItem('id_car_pay');

const tstate = {
  lista_deseos: [],
  lista_carrito: [],
  cant_carrito: 0,
  carrito_added: false,
  product_added: {
    has_attributes: false,
    variations: [],
    stock: 0
  },
  whislist_added: false,
  carrito_login: false,
  url: '',
  id_car_pay: id_cart ? id_cart : ''
};

const CardProduct = (state = tstate, { type, data }) => {
  if (type == 'CARD_PRODUCT') {
    return { ...state, ...data };
  }
  if (type === 'ADD_ONE') {
    return {
      ...state,
      cant_carrito: data?.optional
        ? state.cant_carrito
        : state.cant_carrito + 1,
      product_added: data
    };
  }
  if (type === 'LESS_ONE') {
    return { ...state, cant_carrito: state.cant_carrito - 1 };
  }
  if (type === 'SET_NUMBER') {
    return { ...state, cant_carrito: data };
  }
  if (type === 'CLEAR_CAR_ID') {
    return { ...state, id_car_pay: data };
  }
  if (type === 'SET_ID_SHOPPING_CART') {
    return { ...state, id_car_pay: data };
  }
  return state;
};

export default CardProduct;
