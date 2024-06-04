/**
 *
 * @param {Boolean} isViewStoreName
 * @returns
 */
export const IEDTHeader = (isViewStoreName) => {
  let headers = [
    { data: 'amount', label: 'Monto', align: 'center' },
    { data: 'send', label: 'Envío', align: 'center' },
    { data: 'excess_send', label: 'Exceso Env.', align: 'center' },
    { data: 'price_product', label: 'Precio producto', align: 'center' },
    { data: 'comissions_CV', label: 'Comisión CV', align: 'center' },
    { data: 'deposit', label: 'Depositar', align: 'center' },
    { data: 'discount', label: 'Descuentos', align: 'center' },
    {
      data: 'send_reverse',
      label: 'Envío inverso',
      align: 'center'
    },
    { data: 'other_discount', label: 'Otros dscto', align: 'center' },
    { data: 'total_discount', label: 'Total dscto', align: 'center' },
    { data: 'refund', label: 'Reembolsos', align: 'center', last: true }
  ];

  if (isViewStoreName) {
    headers.unshift(
      ...[
        { data: 'numero', label: 'N°', align: 'center', first: true },
        { data: 'order', label: 'Pedido', align: 'center' },
        { data: 'seller', label: 'Vendedor', align: 'center' }
      ]
    );
  } else {
    headers.unshift(
      ...[
        { data: 'numero', label: 'N°', align: 'center', first: true },
        { data: 'order', label: 'Pedido', align: 'center' }
      ]
    );
  }

  return headers;
};
export const IEDTRow = (lista, isViewStoreName) => {
  const data = lista.map((item, idx) => {
    return {
      numero: item.number || idx + 1,
      order: item.order,
      ...(isViewStoreName ? { seller: item.seller } : {}),
      amount: item.amount,
      send: item.send,
      excess_send: item.excess_send,
      price_product: item.price_product,
      comissions_CV: item.comissions_CV,
      deposit: item.deposit,
      discount: item.discount,
      send_reverse: item.send_reverse,
      other_discount: item.other_discount,
      total_discount: item.total_discount,
      refund: item.refund,
      borderColor: 'primary'
    };
  });

  return data;
};
export const IEDTData = [
  {
    order: 'P006',
    seller: 'Mi tienda SAC',
    amount: '70.00',
    send: '10.00',
    price_product: '60.00',
    comissions_CV: '6.00',
    deposit: '54.00',
    discount: '-',
    send_reverse: '0',
    other_discount: '0',
    total_discount: '0',
    refund: '0'
  }
];
