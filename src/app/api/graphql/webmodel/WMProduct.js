import WMAAttibutes from './webmodelattributes/WMAAttibutes';
import WMBrand from './WMBrand';
import WMCategoryProduct from './WMCategoryProduct';
import WMCompany from './WMCompany';

const WMProduct = `{
    product_id
    store_id
    store${WMCompany}
    categories${WMCategoryProduct}
    product_name
    slug
    product_brand${WMBrand}
    model_product
    sku
    product_origin
    product_condition
    product_licenses_or_permits
    product_active
    product_detail{
      product_detail_id
      product_id
      featured_description
      detailed_description
      keywords
      product_content
      photographs
      main_material
      product_weight
      product_dimensions{
        long
        width
        high
      }
    }
    product_attributes${WMAAttibutes}
    stock
    offer
    offer_status
    offer_type
    offer_value
    price_unit
    offer_percentage
    offer_start_date
    offer_end_date
    wholesale {
      id
      minimum_order
      maximum_order
      price
      maximum_order_text
      preparation_time{
        value
        type
      }
    }
    variations{
      item_id
      sku
      stock
      price
      ref_attr
      attributes {
        id
        name
        value_id
        value
        hexa
      }
    }
    preparation_time
    package_information{
      package_type
      package_weight
      status
      package_dimensions{
        long
        width
        high
      }
    }
    additional_information
    type_voucher
    igv
    warranty
    warranty_period
    warranty_detail
    devolution_reasons_ids
    product_state
    type_of_load
    step
    createdAt
    updatedAt
    type_of_sale
    enable
    status
    destacado
    asesor
    stars
    custom_id
    visits
    ejecutivo {
      user_id
      first_name
      last_name
    }
    statusDate
    delivery_free
    main_category
    rejection_reasons
    thumbnail
  }`;

export default WMProduct;
