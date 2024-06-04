export const A_CARD_PRODUCT = (data) => ({
  data: data,
  type: 'CARD_PRODUCT'
});

export const add_item = (product) => ({
  type: 'ADD_ONE',
  data: product
});
export const less_item = () => ({
  type: 'LESS_ONE'
});

export const set_number = (data) => ({
  type: 'SET_NUMBER',
  data
});

export const set_id_shopping_cart = (data = '') => ({
  type: 'SET_ID_SHOPPING_CART',
  data
});
