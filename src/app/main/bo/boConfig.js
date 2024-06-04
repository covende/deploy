import { ArborescenciaCategoriasBoConfig } from './arborescencia-de-categorias/ArborescenciaCategoriasBoConfig';
import { CarteraClientesBoConfig } from './cartera-de-clientes/carteraClientesBoConfig';
import { CentroFacturacionBoConfig } from './centro-de-facturacion/centroFacturacionBoConfig';
import { CentroMensajeriaBoConfig } from './centro-de-mensajeria/centroMensajeriaBoConfig';
import { ClientesBoConfig } from './clientes/clientesBoConfig';
import { DashboardBoConfig } from './dashboard/dashboardBoConfig';
import { DatosCovendeBoConfig } from './datos-de-covende/datosCovendeBoConfig';
import { DevolucionesBoConfig } from './devoluciones/devolucionesBoConfig';
import { EdicionWebPublicaBoConfig } from './edicion-web-publica/edicionWebPublicaBoConfig';
import { EstadisticasBoConfig } from './estadisticas/estadisticasBoConfig';
import { FaqBoConfig } from './faq/faqBoConfig';
import { IniciarSesionBoConfig } from './iniciar-sesion/iniciarSesionBoConfig';
import { LogsBoConfig } from './logs/logsBoConfig';
import { PedidosBoConfig } from './pedidos/pedidosBoConfig';
import { ProductosBoConfig } from './productos/productosBoConfig';
import { RolesBoConfig } from './roles/rolesBoConfig';
import { ReembolsoBoConfig } from './reembolso/ReembolsoBoConfig';
import { ServiciosAdicionalesBoConfig } from './servicios-adicionales/serviciosAdicionalesBoConfig';
import { SubastasBoConfig } from './subastas/subastasBoConfig';
import { TablasBoConfig } from './tablas/TablasBoConfig';
import { CuponesBoConfig } from './cupones/CuponesBoConfig';
import { TarifasComisionesBoConfig } from './tarifas-y-comisiones/tarifasComisionesBoConfig';
import { UsuariosBoConfig } from './usuarios/usuariosBoConfig';
import { IngresosBoConfig } from './ingresos-y-egresos/IngresosBoConfig';
import { MenusCategoriConfig } from './menus/MenusCategoriConfig';
import { MarcasBoConfig } from './marcas/marcasBoConfig';
import { AttributesBoConfig } from './atributos/AtributosConfig';
import { NotificationsBoConfig } from './notifications/notificationsBoConfig';

const allBackofficeRoutes = [
  ...IniciarSesionBoConfig,
  ...DashboardBoConfig,
  ...ArborescenciaCategoriasBoConfig,
  ...CarteraClientesBoConfig,
  ...CentroFacturacionBoConfig,
  ...CentroMensajeriaBoConfig,
  ...ClientesBoConfig,
  ...DatosCovendeBoConfig,
  ...DevolucionesBoConfig,
  ...EdicionWebPublicaBoConfig,
  ...EstadisticasBoConfig,
  ...MenusCategoriConfig,
  ...FaqBoConfig,
  ...LogsBoConfig,
  ...PedidosBoConfig,
  ...ProductosBoConfig,
  ...RolesBoConfig,
  ...ReembolsoBoConfig,
  ...ServiciosAdicionalesBoConfig,
  ...SubastasBoConfig,
  ...TablasBoConfig,
  ...CuponesBoConfig,
  ...TarifasComisionesBoConfig,
  ...UsuariosBoConfig,
  ...IngresosBoConfig,
  ...MarcasBoConfig,
  ...AttributesBoConfig,
  ...NotificationsBoConfig
];

export { allBackofficeRoutes };
