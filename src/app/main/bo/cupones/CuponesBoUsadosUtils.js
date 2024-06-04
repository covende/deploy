import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';

export const CUBOHeaders = [
  { data: 'numero', label: 'N°', first: true, align: 'center' },
  { data: 'comprador', label: 'Comprador' },
  { data: 'idvendedor', label: 'ID Vendedor', align: 'center' },
  { data: 'idpedido', label: 'ID Pedido', align: 'center' },
  { data: 'cupon', label: 'Cupón', align: 'center' },
  { data: 'valor', label: 'Valor', align: 'center' },
  { data: 'monto', label: 'Monto', align: 'center' },
  { data: 'fecha', label: 'Fecha', last: true, align: 'center' }
];

export const CUBORows = (lista) => {
  let data = lista.map((item, idx) => ({
    numero: idx + 1,
    comprador: item.comprador,
    idvendedor: item.vendedor_id,
    idpedido: item.pedido_id,
    cupon: item.cupon_name,
    valor:
      (item.cupon_tipo == 'PERCENT' ? '' : 'S/ ') +
      item.cupon_valor +
      (item.cupon_tipo == 'PERCENT' ? '%' : ''),
    monto: item.monto,
    fecha: CVFormatDate({ date: item.fecha })
  }));
  return data;
};
