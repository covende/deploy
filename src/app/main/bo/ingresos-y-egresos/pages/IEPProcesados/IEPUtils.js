export const IEPHeader = [
  { data: 'numero', label: 'N°', align: 'center', first: true },
  { data: 'idpedido', label: 'ID Pedido', align: 'center' },
  { data: 'payment_daet', label: 'Fecha de pago', align: 'center' },
  { data: 'state', label: 'Último estado', align: 'center' },
  { data: 'state_date', label: 'Fecha de último estado', align: 'center' },
  { data: 'seller', label: 'Vendedor', align: 'center' },
  { data: 'amount', label: 'Monto (S/)', align: 'center' },
  { data: 'isdevolved', label: 'Devolución', align: 'center' },
  { data: 'refound', label: 'Reembolso', align: 'center' },
  { data: 'refound_date', label: 'Fecha de Reembolso', align: 'center' },
  { data: 'process_date', label: 'Procesar', align: 'center', last: true }
];

export const IEPRow = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx + 1,
      idpedido: item?.idpedido,
      payment_daet: item?.payment_daet,
      state: item?.state,
      state_date: item?.state_date,
      seller: item?.seller,
      amount: item?.amount,
      isdevolved: item?.isdevolved,
      refound: item?.refound,
      refound_date: item?.refound_date,
      process_date: item?.process_date,
      borderColor: 'primary'
    };
  });
  return data;
};

export const IEPData = [
  {
    idpedido: 'P001',
    payment_daet: '25-12-21',
    state: 'Entregado',
    state_date: '01-01-22',
    seller: 'Mi tienda SAC',
    amount: '70.00',
    isdevolved: 'Si',
    refound: '-',
    refound_date: '-',
    process_date: '-'
  }
];
