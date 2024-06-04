import { table_list_by_category } from '@/app/api/graphql/webbo/BTablasService';

/**
 * Metodos de Pago
 * @returns
 */
export const method_payments = async () => {
  const mpays = await table_list_by_category({
    idcategory: '61a6fc4f42aee843fcd94e7a'
  });
  return mpays.docs || [];
};
/**
 * Tipo de Sociedades
 * @returns
 */
export const tipo_sociedades = async () => {
  const mpays = await table_list_by_category({
    idcategory: '617ac7030d0c5c0045a56189'
  });
  return mpays.docs || [];
};

/**
 * Lista de Bancos
 * @returns
 */
export const all_banks = async () => {
  const mpays = await table_list_by_category({
    idcategory: '6179b92dbda63a0036cabdc4'
  });
  return mpays.docs || [];
};

/**
 * Tipos de Empresas
 * @returns
 */
export const company_types = async () => {
  const mpays = await table_list_by_category({
    idcategory: '617acbe50d0c5c0045a5618d'
  });
  return mpays.docs || [];
};

/**
 * Todas las etiquetas de recomendación
 * @returns
 */
export const all_tags = async () => {
  const mpays = await table_list_by_category({
    idcategory: '619e97b62afbca37308997d2'
  });
  return mpays.docs || [];
};

//////////////////////////////////////////////////
/**
 * Motivos de Devolución
 * @returns
 */
export const devolucion_motives = async () => {
  const mpays = await table_list_by_category({
    idcategory: '617b0a539f10e2003c53e3d7'
  });
  return mpays.docs || [];
};

/**
 * Motivos para reportar una Tienda
 * @returns
 */
export const report_store_motives = async () => {
  const mpays = await table_list_by_category({
    idcategory: '61aeaa680dbedd00474d245c'
  });
  return mpays.docs || [];
};

/**
 * Metodos de Devolución
 * @returns
 */
export const devolution_methods = async () => {
  const mpays = await table_list_by_category({
    idcategory: '61af525d02f1a1393ce6249e'
  });
  return mpays.docs || [];
};

/**
 * Lista de Opciones de Envio
 * @returns
 */
export const all_couriers = async () => {
  const result = await table_list_by_category({
    idcategory: '61a6fc1f42aee843fcd94e79'
  });
  return result.docs;
};
///////////////////////////////////////////////////////////////
/**
 * Lista de Mas Vendidos
 * @returns
 */
export const mas_vendidos = async () => {
  const result = await table_list_by_category({
    idcategory: '61a6ebef42aee843fcd94e72'
  });
  return result.docs;
};

/**
 * Lista de mas vendidos banner
 * @returns
 */
export const mas_vendidos_banner = async () => {
  const result = await table_list_by_category({
    idcategory: '61a6ec4342aee843fcd94e73'
  });
  return result.docs;
};

/**
 * Lista de mas visitados
 * @returns
 */
export const mas_visitados = async () => {
  const result = await table_list_by_category({
    idcategory: '61a6ebb042aee843fcd94e71'
  });
  return result.docs;
};

/**
 * Lista de mejor valorados
 * @returns
 */
export const mejor_valorados = async () => {
  const result = await table_list_by_category({
    idcategory: '61a6eb4042aee843fcd94e70'
  });
  return result.docs;
};

/**
 * Lista de publicidades
 * @returns
 */
export const lista_publicidades = async () => {
  const result = await table_list_by_category({
    idcategory: '61a6dac242aee843fcd94e6d'
  });
  return result.docs;
};

/**
 * Lista de imagenes fondo SELLER
 * @returns
 */
export const lista_fondo_seller = async () => {
  const result = await table_list_by_category({
    idcategory: '63cedcca03031207904db337'
  });
  return result.docs;
};

////////////////////////////////////////////////////////////

/**
 * Lista de motivos para cancelar compra
 * @returns
 */
export const motives_cancel = async (idcategory) => {
  const result = await table_list_by_category({
    idcategory: idcategory
  });
  return result.docs;
};
