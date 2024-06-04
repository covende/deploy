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
  { data: 'close_date', align: 'center', label: 'Fecha de cierre' },
  { data: 'idfactura', align: 'center', label: 'ID Factura' },
  { data: 'idvendedor', align: 'center', label: 'ID Vendedor' },
  { data: 'factura', align: 'center', label: 'Factura' },
  { data: 'total_sale', align: 'center', label: 'Venta Total(S/)' },
  { data: 'total_comision', align: 'center', label: 'Comisión Total(S/)' },
  { data: 'deposited', align: 'center', label: 'Depositado' },
  { data: 'accion', align: 'center', label: 'Acción', last: true }
];

export const CFRows = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx,
      close_date: item?.close_date,
      idfactura: item?.idfactura,
      idvendedor: item?.idvendedor,
      factura: item?.factura,
      total_sale: item?.total_sale,
      total_comision: item?.total_comision,
      deposited: item?.deposited,
      accion: item?.accion,
      params: item.idvendedor
    };
  });
  return data;
};

export const CFDemo = [
  {
    close_date: 'asdasd',
    idfactura: 'Factura',
    idvendedor: 'asasdf',
    factura: 'SALE',
    total_sale: 'SALE',
    total_comision: 'SALE',
    deposited: 'SALE',
    accion: 'SALE'
  }
];
