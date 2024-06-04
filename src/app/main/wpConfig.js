import { AyudaConfig } from './ayuda/ayudaConfig';
import { CarritoComprasConfig } from './carrito-de-compras/carritoComprasConfig';
import { CategoriaConfig } from './categoria/categoriaConfig';
import { CreaTuTiendaConfig } from './crea-tu-tienda/creaTuTiendaConfig';
import { HomeConfig } from './home/homeConfig';
import { IniciarSesionConfig } from './iniciar-sesion/iniciarSesionConfig';
import { LinkedinConfig } from './linkedin/linkedinConfig';
import { WishListConfig } from './lista-deseos/WishListConfig';
import { NosotrosConfig } from './nosotros/nosotrosConfig';
import { OfertasConfig } from './ofertas/OfertasConfig';
import { PoliticaPrivacidadConfig } from './politica-de-privacidad/politicaPrivacidadConfig';
import { DocumentosCovendeConfig } from './documentosCovende/DocumentosCovendeConfig.js';
import { PreguntasFrecuentesConfig } from './preguntas-frecuentes/preguntasFrecuentesConfig';
import { ProductoConfig } from './producto/productoConfig';
import { RegistrarCuentaConfig } from './registrar-cuenta/registrarCuentaConfig';
import { TerminosCondicionesConfig } from './terminos-y-condiciones/terminosCondicionesConfig';
import { TermsCondicionesSorteoConfig } from './terminos-condiciones-sorteo/TermsCondicionesSorteoConfig';
import { TiendaConfig } from './tienda/tiendaConfig';
import { MetodoPagoConfig } from './metodo-de-pago/MetodoPagoConfig';
import { CotizacionConfig } from './cotizacion/CotizacionConfig';
import { LibroReclamacionesConfig } from './libro-de-reclamaciones/LibroReclamacionesConfig';
import { VerificarCuentaConfig } from './verificar-cuenta/verificarCuentaConfig';
import { BuscarConfig } from './buscar/buscarConfig';
import { DocsConfig } from './docs/DocsConfig';
import { RecuperarCuentaConfig } from './recuperar-cuenta/RecuperarCuentaConfig';
import { RegistrarUsuarioSorteoConfig } from './registrar-usuario-sorteo/RegistrarUsuarioSorteoConfig';

const allWebPublicRoutes = [
  ...AyudaConfig,
  ...CarritoComprasConfig,
  ...CategoriaConfig,
  ...CreaTuTiendaConfig,
  ...HomeConfig,
  ...IniciarSesionConfig,
  ...LinkedinConfig,
  ...NosotrosConfig,
  ...OfertasConfig,
  ...PoliticaPrivacidadConfig,
  ...DocumentosCovendeConfig,
  ...PreguntasFrecuentesConfig,
  ...ProductoConfig,
  ...RegistrarCuentaConfig,
  ...TerminosCondicionesConfig,
  ...TermsCondicionesSorteoConfig,
  ...RegistrarUsuarioSorteoConfig,
  ...TiendaConfig,
  ...CotizacionConfig,
  ...VerificarCuentaConfig,
  ...MetodoPagoConfig,
  ...LibroReclamacionesConfig,
  ...WishListConfig,
  ...BuscarConfig,
  ...DocsConfig,
  ...RecuperarCuentaConfig
];
export { allWebPublicRoutes };
