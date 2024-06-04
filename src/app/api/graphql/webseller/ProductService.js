import { formatFecha } from '@/common/utils/methods';
import { gql } from 'graphql-request';
import { json_format } from '@/common/utils/methods';
import { CVJsonFormat } from '@/common/CovendeTemplate/CVMethods';
import WMProduct from '../webmodel/WMProduct';
import WMInfo from '../webmodel/WMInfo';
import WMBrand from '../webmodel/WMBrand';
import WMAAttibutesDetails from '../webmodel/webmodelattributes/WMAAttibutesDetails';
import { PRODUCT_ATTRIBUTE_DETAIL_RESULT } from './AttributeService';

const resultados = `
{
  status
  message
  product${WMProduct}
}
`;

export const ALL_BRANDS = `
{
    brands{
      brands${WMBrand}
    }
  }
`;

export const PRODUCT_ATTRIBUTES_DEFAULT = `
{
  productAttributesDefault{
    product_attribute_id
    name
    type_attribute
    creator_id
    attributes_details${WMAAttibutesDetails}
  }
}
`;

export const BRANDS_BY_CATEGORY = (category_id) => `{
  publicBrandsByCategory(category_id: "${category_id}") ${WMBrand}
}`;

export const PUBLIC_BRANDS = ({
  company_id,
  category_id,
  search,
  delivery_free
}) => `{
  publicBrands(company_id: "${company_id || ''}", category_id: "${
  category_id || ''
}", search: "${search || ''}" delivery_free: ${
  delivery_free || false
}) ${WMBrand}, 

}`;

export const PRODUCT_ATTRIBUTES_DETAILS = (id) => `
{
  productAttributes(creator_id:"${id}"){
    product_attribute_id
    name
    type_attribute
    creator_id
    attributes_details${WMAAttibutesDetails}
  }
}
`;

export const DELETE_PRODUCT_ATTRIBUTE = (attribute) => `
mutation {
  deleteProductAttribute(
    product_attribute_id: "${attribute}"
  ) {
    status
    message
    productAttribute {
      product_attribute_id
      name
      attributes_details {
        name
      }
      type_attribute
      creator_id
    }
  }
}
`;

export const BULK_LOAD_PRODUTCS = (company_id, file) => `
mutation {
   addBulkLoadProductsByCompany(company_id: "${company_id}", file: "${file}"){
    status
    message
   }
}
`;

export const BULK_LOAD_OFFERS = (company_id, file) => `
mutation {
  addBulkLoadProductsOfferByCompany(company_id: "${company_id}", file: "${file}"){
   status
   message
  }
}
`;

export const BULK_LOAD_STOCK = (company_id, file) => `
mutation {
  addBulkLoadProductsStockByCompany(company_id: "${company_id}", file: "${file}"){
   status
   message
  }
}
`;

export const BULK_LOAD_PREPARATION_TIME = (company_id, file) => `
mutation {
  addBulkLoadProductsPreparationTimeByCompany(company_id: "${company_id}", file: "${file}"){
   status
   message
  }
}
`;

export const BULK_LOAD_UPDATE_PRODUCTS = (company_id, file) => `
mutation {
  updateBulkLoadProductsByCompany(company_id: "${company_id}", file: "${file}"){
   status
   message
  }
}
`;

export const DELETE_PRODUCT_ATTRIBUTE_DETAIL = (attributeId, detailId) => `
mutation {
  deleteProductAttributeDetail(
    product_attribute_id: "${attributeId}"
    product_attribute_detail_id: "${detailId}"
  ) {
    status
    message
    productAttributeDetail${PRODUCT_ATTRIBUTE_DETAIL_RESULT}
  }
}`;

export const ADD_PRODUCT_STEP_ONE = ({
  attributes,
  information,
  description,
  brand,
  categorias,
  product,
  in_draft
}) => {
  let product_id =
    product.product_id != '' ? `product_id: "${product.product_id}"` : ``;
  let product_attributes = attributes.map((it) => {
    let attributes_details = it.attributes_details.filter(
      (itd) => itd.selected
    );
    let items = attributes_details.map(
      (itd) => itd.product_attribute_detail_id
    );
    return {
      id_attribute: it.product_attribute_id || '',
      name: it.name,
      attribute_details: items
    };
  });

  product_attributes = CVJsonFormat({
    data: product_attributes,
    method: 'tostring',
    variant: 'withoutKeys'
  });

  let category_ids = categorias.map((it) => it._id);

  return gql`
    mutation{
      addProductStepOne(
        in_draft:${in_draft}
        ${product_id}
        store_id:"${product.store_id}"
        category_ids:${JSON.stringify(category_ids)}
        product_information:{
          product_name:${JSON.stringify(information.name)}
          marca:"${brand?.brand_id || 'GENERIC'}"
          model_product:"${information.modelo}"
          sku:"${information.sku}"
          product_origin:"${information.procedencia}"
          product_condition:"${information.condicion}"
          product_licenses_or_permits:"${information?.licencia?.data || ''}"
        }
        product_detail:{
          featured_description:"""${description.destacada}"""
          detailed_description:"""${description.detallada}"""
          keywords:"${description.keywords.join(',')}"
          product_content:"${description.contenido}"
          photographs:${JSON.stringify(description.fotografias)}
          main_material:"${description.material}"
          product_weight:"${description.peso} kg"
          product_dimensions:{
            long:"${description.dimensiones.largo} cm"
            width:"${description.dimensiones.ancho} cm"
            high:"${description.dimensiones.alto} cm"
          }
        }
        product_attributes:${product_attributes}
      ) ${resultados}      
    }
  `;
};

export const ADD_PRODUCT_STEP_SECOND = ({
  precios,
  product,
  in_draft,
  sales,
  attributes
}) => {
  let offer = '';
  if (eval(precios.offer) && eval(precios.offer_value) > 0) {
    offer += ` offer_value: ${precios.offer_value} offer_type: "${precios.offer_type}"`;

    if (precios?.offer_start_date !== '')
      offer += ` offer_start_date: "${new Date(
        precios.offer_start_date
      ).toISOString()}"`;

    if (precios?.offer_end_date !== '')
      offer += ` offer_end_date: "${new Date(
        precios.offer_end_date
      ).toISOString()}"`;
  }

  let price =
    precios.price_unit != 0 ? precios.price_unit.replace(/,/g, '') : 0;
  const whole_sales = precios.type_of_sale == 'RETAIL' ? [] : sales;
  return gql`
    mutation {
      addProductStepSecond(    
        type_of_sale:"${precios.type_of_sale}"
        product_id:"${product.product_id}"
        store_id:"${product.store_id}"
        stock: ${precios.stock}    
        stock_alert:${precios.stock_alert} 
        wholesales:${json_format(whole_sales)}
        variations :${json_format(precios?.check_custom ? attributes : [])}
        ${offer} 
        price_unit :${price}
        in_draft:${in_draft}   
      )${resultados}
    }
  `;
};

export const ADD_PRODUCT_STEP_THIRD = ({ despacha, product, in_draft }) => {
  /*
  {
    id:""
    minimum_order:0
    maximum_order:0
    price:0
    stock:0
    offer_percentage:0
    offer_start_date:""
    offer_end_date:""
    preparation_time:""

      minimum_order:1
      maximum_order:2
      price:1
      preparation_time:""

  }
  */

  let wholesales = CVJsonFormat({
    data: despacha.wholesales || [],
    method: 'tostring',
    variant: 'withoutKeys'
  });
  return gql`
    mutation {
      addProductStepThird(
        in_draft:${in_draft}
        product_id:"${product.product_id}"
        store_id:"${product.store_id}"
        preparation_time:"${despacha.dias}"
        wholesales:${wholesales}
        package_information:{
          package_type:"${despacha.tipo_paquete}"
          package_weight:"${despacha.peso_paquete} kg"
          package_dimensions:{
            long:"${despacha.dimensiones.largo} cm"
            width:"${despacha.dimensiones.ancho} cm"
            high:"${despacha.dimensiones.alto} cm"
          }
        }
        additional_information:"""${
          despacha.inf_adicional != '' ? despacha.inf_adicional : `-`
        }"""
      ) ${resultados}
    }
  `;
};

export const ADD_PRODUCT_STEP_FOURTH = ({ extra, product, in_draft }) => {
  return gql`
    mutation {
      addProductStepFourth(
        in_draft:${in_draft}
        product_id:"${product.product_id}"
        store_id:"${product.store_id}"
        type_voucher:"${extra.comprobante}"
        igv:${extra.igv}
        devolution_reasons_ids: ${JSON.stringify(extra.devolution_reasons_ids)}
        ${
          extra.garantia == 'si'
            ? `warranty_status:${extra.garantia == 'si' ? true : false}`
            : ``
        }
        ${
          extra.garantia == 'si' ? `warranty_period:${extra?.periodo || 0}` : ``
        }
        ${
          extra.garantia == 'si' && extra.detalle != ''
            ? `warranty_detail:"""${extra.detalle}"""`
            : ``
        }
      ) ${resultados}
    }
  `;
};

export const FIND_PRODUCT_INIT = ({ product_id, store_id }) => `
{
  productById(
    product_id:"${product_id}"
    store_id:"${store_id}"
  )${resultados}
}
`;

export const PRODUCT_LIST = ({
  store_id,
  page,
  itemsPage,
  keywords,
  category_id,
  product_state,
  sort_star = false
}) => `
{
  productListByStore(
    store_id:"${store_id}"
    page:${page}
    itemsPage:${itemsPage}
    product_state:"${product_state}"
    keywords:"${keywords}"
    category_id:"${category_id}"
    sort_star: ${sort_star}
  ){
    ${WMInfo}
    products{
      product_id
      store_id
      product_name
      product_detail{
        photographs
      }
      product_brand{
        name
      }
      slug
      price_unit
      wholesale{
        minimum_order
        maximum_order
        price
      }
      offer_percentage
      product_active
      stock
      sku
      step
      status
      enable
      destacado
      createdAt
      stockUpdatedStatus
    }
  }
}
`;

export const PRODUCT_STATUS_COUNTER = (store_id) => `{
  productStatusCounter(store_id:"${store_id}"){
    original_name
    name
    background_color
    total
  }
}`;

export const PRODUCT_DEVOLUTION_REASONS = () => `{
  productDevolutionReasons {
    _id
    title
  }
}`;

export const DELETE_PRODUCTS = (store_id, product_id) => {
  return gql`
  mutation {
    deleteProducts(store_id: ${store_id}, product_ids: ${product_id}) {
      status
      message
    }
  }
  `;
};
