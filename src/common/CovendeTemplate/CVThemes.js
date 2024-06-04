export const FONTSIZE = '0.75rem'; //13px
export const FONTSIZE_DEFAULT = '16px';

export const COLORS = {
  primary: '#00ADF6',
  skyblue: '#00ADF6',
  blue: '#004574',
  red: '#FF5454',
  yellow: '#F7B844',
  green: '#17BF93',
  gray: '#C4C4C4',
  lightGray: '#F2F2F2',
  mediumGray: '#D8D8D8',
  boldGray: '#9D9D9D',
  extraBoldGray: '#3E3E3E',
  white: '#FFFFFF',
  black: '#000000',
  purple: '#5164C4',
  shadowRed: '#9B3434',
  orange: '#FF8A36',
  inherit: 'inherit',
  none: 'transparent',
  transparent: 'transparent',
  currentColor: 'currentColor',
  textDescription: '#4E4E4E',
  grayTransparent: '#EEEEEE'
};

export const SCREEN = {
  xxs: { min: 250, max: 450 },
  xs: { min: 367, max: 667 },
  sm: { min: 765, max: 950 },
  md: { min: 950, max: 1440 }
};

/**
 * Lista de dimensiones de imagen para Cropper
 */
export const IMAGESIZE = {
  CATEGORYPRODUCT_ICONO: '240,170,image',
  CATEGORYPRODUCT_SLIDER: '680,680,slider',
  CATEGORYPRODUCT_BANNER: '930,300,banner',
  CATEGORYPRODUCT_LOGO: '299,299,logo',
  GALLERYPRODUCT: '700,700,image',
  PHOTOPROFILE: '400,400,image',
  BRANDREQUEST: '400,400,image',
  OFERTAIMAGE: '600,380,image',
  BANNER_HOME_IMAGE: '1497,750,image',
  BANNER_CATEGORIA_IMAGE: '930,300,image',
  BANNER_CREA_TIENDA_IMAGE: '930,300,image',
  BANNER_LOGIN_IMAGE: '1366,720,image',
  STORE_LOGO: '400,400,image',
  STORE_SLIDER: '1246,215,slider',
  STORE_BANNER: '410,167,banner',
  STORE_SECOND_BANNER: '640,436,banner',
  STORE_CATEGORY: '582,213,image',
  STORE_REPORT: '582,213,image',
  PRODUCT_RETURN: '700,700,image',
  LOGO_GALLERY: '930,700,image'
};

export const DTSTATUS = [
  { value: 'Todos', text: 'Todos' },
  { value: 'Por pagar', text: 'Pedientes' },
  { value: 'Pendiente', text: 'Pedientes' },
  { value: 'Procesado', text: 'Procesados' },
  { value: 'Enviado', text: 'Enviados' },
  { value: 'Completado', text: 'Completados' },
  { value: 'Devuelto', text: 'Devueltos' }
];

export const TIPOCOMPRA = [
  { text: 'Todos', value: '' },
  { text: 'Compra', value: 'compra' },
  { text: 'Subasta', value: 'subasta' }
];

export const TIPOCLIENT = [
  { text: 'Todos', value: '' },
  { text: 'Vendedor', value: '62190d8310fe9a0e80751cfa' },
  { text: 'Comprador', value: '60ae7f67a11ae12348b308e2' }
];

export const TIPOAMBIENTE = [
  { text: 'Todos', value: 'ALL' },
  { text: 'Desarrollo', value: 'DEVELOPMENT' },
  { text: 'Producción', value: 'PRODUCTION' }
];

export const TIPOMARCA = [
  { text: 'Genérica', value: 'GENERIC' },
  { text: 'Marca Registrada', value: 'REGISTERED' },
  { text: 'Marca Propia', value: 'OWN' }
];

export const ORIGINPROD = [
  { text: 'Seleccionar', value: '', disabled: true },
  { text: 'Fabricación', value: 'MANUFACTURING' },
  { text: 'Importación', value: 'IMPORT' },
  { text: 'Distribución', value: 'DISTRIBUTION' },
  { text: 'Re-venta', value: 'RESALE' }
];
export const _ORIGINPROD = (origin) =>
  ORIGINPROD.find((item) => item.value == origin);

export const CONDICIONPROD = [
  // { text: 'Seleccionar', value: '', disabled: true },
  { text: 'Nuevo', value: 'NEW' },
  { text: 'Usado', value: 'USED' },
  { text: 'Repotenciado', value: 'REPOWERED' }
];
export const _CONDICIONPROD = (condicion) =>
  CONDICIONPROD.find((item) => item.value == condicion);

export const TIPODATE = [
  {
    text: 'Todos',
    value: 'all',
    time: () => {
      var dt = new Date();
      return {
        start_date: dt,
        end_date: dt
      };
    }
  },
  {
    text: 'Ayer',
    value: 'ayer',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setDate(dt.getDate() - 1);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  },
  {
    text: 'Últimos 7 días',
    value: 'ultimos7dias',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setDate(dt.getDate() - 7);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  },
  {
    text: 'Hace 1 mes',
    value: 'hace1mes',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setMonth(dt.getMonth() - 1);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  },
  {
    text: 'Hace 3 meses',
    value: 'hace3meses',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setMonth(dt.getMonth() - 3);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  },
  {
    text: 'Hace 6 meses',
    value: 'hace6meses',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setMonth(dt.getMonth() - 6);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  },
  {
    text: 'Hace 1 año',
    value: 'hace1ano',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setFullYear(dt.getFullYear() - 1);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  },
  {
    text: 'Hace 2 años',
    value: 'hace2anos',
    time: () => {
      var dt = new Date();
      const today = new Date();
      dt.setFullYear(dt.getFullYear() - 2);
      const last = dt;
      return {
        start_date: last,
        end_date: today
      };
    }
  }
];

export const TIPOROLE = [
  { text: 'Todos', value: '' },
  { text: 'Gestor de Productos', value: 'productos' },
  { text: 'Gestor de pedidos', value: 'pedidos' },
  { text: 'Gestor de facturas', value: 'facturas' }
];

export const TIPOSTORE = [
  { text: 'Venta por Menor', value: 'RETAIL' },
  { text: 'Venta por Mayor', value: 'WHOLESALE' },
  { text: 'Ambos', value: 'BOTH' }
];

export const TIPOVOUCHER = [
  { text: 'Boleta', value: 'TICKET' },
  { text: 'Factura', value: 'INVOICE' },
  { text: 'Boleta y Factura', value: 'BOTH' }
];

export const ORDERTYPE = [
  { text: 'Todo', value: '' },
  { text: 'Mayor a menor precio', value: 'higher_price' },
  { text: 'Menor a mayor precio', value: 'lower_price' },
  { text: 'Novedades', value: 'novelties' },
  { text: 'Más vendidos', value: 'best_sellers' },
  { text: 'Mejor calificados', value: 'best_rated' },
  { text: 'Más visitados', value: 'most_visited' },
  { text: 'Por estrellitas', value: 'star' }
];
