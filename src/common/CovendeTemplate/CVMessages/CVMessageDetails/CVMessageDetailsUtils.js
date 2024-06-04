import { WMDevolucionParcial } from '@/app/api/graphql/webmodel/WMDevolucion';
import { quotation_by_id } from '@/app/api/graphql/webquotation/QService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

export const fetchapi = {
  pedido: async () => {},
  producto: async () => {},
  tienda: async () => {},
  user: async () => {},
  devolucion: async (id) => {
    const { DevolucionById } = await AxiosGQL(`{
      DevolucionById(devolucion_id:"${id}",relations:{
        order:false
        method:false
        reason:false
        company:true
        product:true
        buyer:false
        statuses:false
      })${WMDevolucionParcial({
        company: true,
        product: true
      })}
    }
    `);
    return DevolucionById;
  },
  company_denuncia: async () => {},
  product_cotizacion: async (id) => quotation_by_id(id)
};
