export const CFTYPE = [
  { text: 'Clientes', value: 'CUSTOMER' },
  { text: 'CoVende', value: 'COVENDE' },
  { text: 'Suscriptores', value: 'SUSCRIPTOR' }
];
export const CFSTATUS = [
  { text: 'Todos', value: 'ALL', total: 2, color: '' },
  { text: 'Pendientes', value: 'PENDING', total: 2, color: 'orange' },
  { text: 'En Revisión', value: 'REVISION', total: 1, color: 'yellow' },
  { text: 'Aprobados', value: 'APROVED', total: 3, color: 'green' },
  { text: 'Rechazados', value: 'REJECTED', total: 2, color: 'red' }
];

export const CFTYPESALE = [
  { text: 'Todos', value: 'ALL' },
  { text: 'Subasta', value: 'AUCTION' },
  { text: 'Compra/venta', value: 'SALE' }
];

export const CFHeader = [
  { data: 'numero', align: 'center', label: 'N°', first: true },
  { data: 'idcomprobante', align: 'center', label: 'ID Comprobante' },
  { data: 'type', align: 'center', label: 'Tipo' },
  { data: 'idpedido', align: 'center', label: 'ID Pedido' },
  { data: 'type_sale', align: 'center', label: 'Tipo de Venta' },
  { data: 'idseller', align: 'center', label: 'ID Vendedor' },
  { data: 'sell_date', align: 'center', label: 'Fecha de Pedido' },
  { data: 'guide', align: 'center', label: 'Nota de Pedido (guia de Emision)' },
  { data: 'document', align: 'center', label: 'DOC' },
  { data: 'status', align: 'center', label: 'Estado' },
  { data: 'accion', align: 'center', label: 'Acción', last: true }
];

export const CFRows = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx,
      idcomprobante: item?.idcomprobante,
      type: item?.type,
      idpedido: item?.idpedido,
      type_sale: item?.type_sale,
      idseller: item?.idseller,
      sell_date: item?.sell_date,
      guide: item?.guide,
      document: item?.document,
      status: item?.status,
      accion: item?.accion,
      params: item.idcomprobante
    };
  });
  return data;
};

export const CFDemo = [
  {
    idcomprobante: 'asdasd',
    type: 'Factura',
    idpedido: 'asasdf',
    type_sale: 'SALE',
    idseller: 'SALE',
    sell_date: 'SALE',
    guide: 'SALE',
    document: 'SALE',
    status: 'PENDING',
    accion: 'SALE'
  }
];
