import { CVDateFormat } from '@CVPages/core/admin/seller/estadisticas/components/MVendidosUtils';

export const IEEHeaders = [
  { data: 'number', label: 'Nº', align: 'center', first: true },
  { data: 'order', label: 'Pedido', align: 'center' },
  { data: 'remito', label: 'Remito', align: 'center' },
  { data: 'recorded_weight', label: 'Peso ingresado (kg)', align: 'center' },
  { data: 'real_weight', label: 'Peso real (kg)', align: 'center' },
  { data: 'diff_weight', label: 'Diferencia (kg)', align: 'center' },
  { data: 'product', label: 'ID Producto', align: 'center', last: true }
];

export const IEERow = (lista = []) => {
  return (
    lista &&
    lista.map((item, index) => {
      return {
        number: index + 1,
        order: item.order || '',
        remito: item.remito || '',
        recorded_weight: item.recorded_weight || 0,
        real_weight: item.real_weight || 0,
        diff_weight: item.diff_weight || 0,
        product: item.product || ''
      };
    })
  );
};

export const IEEWSHeaders = [
  { data: 'number', label: 'Nº', align: 'center', first: true },
  { data: 'date_comparison', label: 'Fecha de comparación', align: 'center' },
  { data: 'order', label: 'Pedido', align: 'center' },
  { data: 'remito', label: 'Remito', align: 'center' },
  { data: 'recorded_weight', label: 'Peso ingresado (kg)', align: 'center' },
  { data: 'real_weight', label: 'Peso real (kg)', align: 'center' },
  { data: 'diff_weight', label: 'Diferencia (kg)', align: 'center' },
  { data: 'product', label: 'ID Producto ', align: 'center' },
  { data: 'recorded_send', label: 'Envío declarado (S/)', align: 'center' },
  { data: 'real_send', label: 'Envío real (S/)', align: 'center' },
  {
    data: 'excess_send',
    label: 'Exceso de envío (S/)',
    align: 'center',
    last: true
  }
];

export const IEEWSRow = (lista = []) => {
  return lista.map((item, index) => {
    return {
      number: index + 1,
      date_comparison:
        item.date_comparison &&
        CVDateFormat(new Date(item.date_comparison), '/'),
      order: item.order || '',
      remito: item.remito || '',
      recorded_weight: item.recorded_weight || 0,
      real_weight: item.real_weight || 0,
      diff_weight: item.diff_weight || 0,
      product: item.product || '',
      recorded_send: item.recorded_send || 0,
      real_send: item.real_send || 0,
      excess_send: item.excess_send || 0
    };
  });
};
