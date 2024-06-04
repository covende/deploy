const WMShoppingCart = `{
      id
      user_id
      cart_type
      coupon_id
      coupon_code
      status
      coupon_total
      delivery_error
      delivery_address {
        _id
        direccion
      }
      subtotal
      delivery_total
      saving_total
      discount_total
      total
      products {
        _id
        product_id
        variation_id
        type
        quantity
        price
        discount
        offer_percentage
        stock
        subtotal
        delivery_price
        saving
        total
        delivery_time
        attributes
        deliveries {
          price
          delivery_time
          courier
          delivery_type
        }
        delivery_code
        product {
          product_name
          stars
          store_id
          main_photograph
          sku
          slug
          enable
          offer_percentage
          product_condition
          product_detail {
            featured_description
          }
          offer
          product_name
          stock
          offer_type
          offer_value
          thumbnail
          delivery_free
          product_attributes {
            name
            id_attribute
          }
          main_photograph
        }
        store {
          comercial_name
        }
      }
}`;

export default WMShoppingCart;
