import { CentroAprendizajeAdminConfig } from './centro-de-aprendizaje/centroAprendizajeAdminConfig';
import { InicioAdminConfig } from './inicio/inicioAdminConfig';
import { MensajesAdminConfig } from './mensajes/mensajesAdminConfig';
import { NotificacionesAdminConfig } from './notificaciones/notificacionesAdminConfig';
import { RegistrarTiendaAdminConfig } from './registrar-tienda/registrarTiendaAdminConfig';
/*********************************************************************************************/
import { SellerConfiguracionConfig } from './seller/configuracion/SellerConfiguracionConfig';
import { SellerDevolucionesConfig } from './seller/devoluciones/SellerDevolucionesConfig';
import { SellerPedidosConfig } from './seller/pedidos/SellerPedidosConfig';
import { SellerSubastasConfig } from './seller/subastas/SellerSubastasConfig';
import { RedireccionesConfig } from './seller/redirecciones/RedireccionesConfig';
import { SellerCentroAyudaConfig } from './seller/CentroAyuda/SellerCentroAyudaConfig';
import { SellerProductosConfig } from './seller/productos/SellerProductosConfig';
import { SellerPlanesConfig } from './seller/planes/SellerPlanesConfig';
import { SellerInicioConfig } from './seller/inicio/SellerInicioConfig';
import { SellerCotizacionConfig } from './seller/cotizacion/SellerCotizacionConfig';
import { SellerFacturacionConfig } from './seller/facturacion/SellerFacturacionConfig';
import { SellerEstadisticasConfig } from './seller/estadisticas/SellerEstadisticasConfig';
/*********************************************************************************************/
import { BuyerConfiguracionConfig } from './buyer/configuracion/BuyerConfiguracionConfig';
import { BuyerDevolucionesConfig } from './buyer/devoluciones/BuyerDevolucionesConfig';
import { BuyerInicioConfig } from './buyer/inicio/BuyerInicioConfig';
import { BuyerListaConfig } from './buyer/lista/BuyerListaConfig';
import { BuyerPedidosConfig } from './buyer/pedidos/BuyerPedidosConfig';
import { BuyerCotizacionConfig } from './buyer/cotizacion/BuyerCotizacionConfig';
import { BuyerSubastasConfig } from './buyer/subastas/BuyerSubastasConfig';
import { BuyerCentroAyudaConfig } from './buyer/centro-de-ayuda/BuyerCentroAyudaConfig';

const allBuyerSellerRoutes = [
  ...SellerCotizacionConfig,
  ...CentroAprendizajeAdminConfig,
  ...MensajesAdminConfig,
  ...NotificacionesAdminConfig,
  ...RegistrarTiendaAdminConfig,
  ...InicioAdminConfig,
  ...SellerSubastasConfig,
  ...RedireccionesConfig,
  ...SellerCentroAyudaConfig,
  ...SellerPedidosConfig,
  ...SellerProductosConfig,
  ...SellerFacturacionConfig,
  ...SellerEstadisticasConfig,
  ...SellerDevolucionesConfig,
  ...SellerPlanesConfig,
  ...SellerConfiguracionConfig,
  ...SellerInicioConfig,

  ...BuyerConfiguracionConfig,
  ...BuyerDevolucionesConfig,
  ...BuyerListaConfig,
  ...BuyerPedidosConfig,
  ...BuyerCotizacionConfig,
  ...BuyerSubastasConfig,
  ...BuyerCentroAyudaConfig,
  ...BuyerInicioConfig
];
export { allBuyerSellerRoutes };
