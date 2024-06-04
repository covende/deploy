import WMCompany from './WMCompany';
import WMAAttibutes from './webmodelattributes/WMAAttibutes';

// const WMProductItemPublic = `{
//   product_id
//   product_slug
//   product_photo
//   product_name
//   precio
//   offer
//   percentage_oferta
//   sale_type
//   precio_minimo
//   precio_maximo
//   pedido_minimo
//   store_id
//   company${WMCompany}
//   product_attributes${WMAAttibutes}
//   stars
//   stock
// }`;

const WMProductItemPublic = `{
  product_id
  product_slug
  product_photo
  product_name
  precio
  offer
  offer_type
  offer_value
  percentage_oferta
  sale_type
  precio_minimo
  precio_maximo
  pedido_minimo
  store_id
  company{
    comercial_name
  }
  variations {
    item_id
    stock
    price
    ref_attr
    attributes {
      name
      hexa
      id
      value
      value_id
    }
  }
  wholesale {
    price
    maximum_order
    minimum_order
  }
  product_attributes${WMAAttibutes}
  stars
  stock
  delivery_free
}`;

export default WMProductItemPublic;
