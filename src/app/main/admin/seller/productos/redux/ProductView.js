import { DELETE } from './ProductViewAction';

const tstate = {
  store_status: 'IN_DRAFT',
  product: {
    product_id: '',
    store_id: ''
  },
  tabIndex: 0,
  categorias: [],
  attributes: [],
  allattributes: [],
  brands: [],
  brand: null,
  information: {
    name: '',
    typeMarca: 'GENERIC',
    modelo: '',
    sku: '',
    procedencia: '',
    condicion: '',
    licencia: null,
    slug: ''
  },
  description: {
    destacada: '',
    detallada: '',
    keywords: [],
    contenido: '',
    fotografias: [],
    material: '',
    peso: '',
    dimensiones: {
      largo: '',
      ancho: '',
      alto: ''
    }
  },
  type_of_sale: '',
  precios: {
    type_of_sale: '',
    stock: 0,
    offer_type: '',
    offer_value: 0,
    offer_percentage: 34,
    offer_start_date: '',
    offer_end_date: '',
    offer: false,
    price_unit: 0,
    wholesales: [],
    sale_with_custom_attributes: [],
    check_custom: false,
    stock_alert: true
  },

  despacha: {
    dias: 0,
    pormayor: 'no',
    tipo_paquete: 'Caja',
    peso_paquete: '',
    dimensiones: {
      largo: '',
      ancho: '',
      alto: ''
    },
    wholesales: [],
    inf_adicional: ''
  },
  extra: {
    comprobante: 'TICKET',
    igv: '18',
    periodo: 0 + '',
    garantia: 'si',
    detalle: '',
    devolution_reasons_ids: []
  },
  product_state: 'IN_DRAFT',
  status: 'IN_DRAFT',
  in_draft: true,
  success: false,
  createdAt: '-',
  updatedAt: '-',
  custom_id: '',
  isDelete: false,
  reset_attrs: false,
  rejection_reasons: []
};

function ProductView(state = tstate, { type, data }) {
  switch (type) {
    case 'PRODUCTVIEW':
      return { ...state, ...data };
    case DELETE:
      return { ...state, isDelete: data };
    default:
      return state;
  }
}

export default ProductView;
