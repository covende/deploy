export const IEPHeader = [
  { data: 'numero', label: 'N°', align: 'center', first: true },
  { data: 'idpedido', label: 'ID Pedido', align: 'center' },
  { data: 'payment_daet', label: 'Fecha de pago', align: 'center' },
  { data: 'state', label: 'Último estado', align: 'center' },
  { data: 'state_date', label: 'Fecha de último estado', align: 'center' },
  { data: 'seller', label: 'Vendedor', align: 'center' },
  { data: 'amount', label: 'Monto (S/)', align: 'center' },
  { data: 'isdevolved', label: 'Devolución', align: 'center' },
  { data: 'isdCancelled', label: 'Cancelación', align: 'center' },
  { data: 'refound', label: 'Reembolso', align: 'center' },
  { data: 'refound_date', label: 'Fecha de Reembolso', align: 'center' },
  { data: 'process_date', label: 'Procesar', align: 'center', last: true }
];

export const IEPRow = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx + 1,
      idpedido: item?.pedido_id,
      payment_daet: item?.payment_date,
      state: item?.last_status,
      state_date: item?.status_date,
      seller: item?.seller,
      amount: item?.amount,
      isdevolved: item?.devolution,
      isdCancelled: item?.cancellation,
      refound: item?.refund,
      refound_date: item?.refund_date,
      process_date: item?.process,
      borderColor: 'primary'
    };
  });
  return data;
};
