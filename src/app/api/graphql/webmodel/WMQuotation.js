import WMCompany from './WMCompany';
import WMProductQ from './WMProductQ';

const WMQuotation = `{
  _id
  product {
    name
    photo
    precio_minimo
    precio_maximo
    pedido_minimo
  }
  product_photo
  product_name
  quantity
  measure_unit
  user {
  first_name
  last_name
  }
  seller {
    first_name
    last_name
    photo
    store {
      comercial_name
      logo
      stars
    }
  }
  request_date
  delivery_time {
  value
  type
  }
  message
  file
  permit_reply
}`;

export default WMQuotation;
