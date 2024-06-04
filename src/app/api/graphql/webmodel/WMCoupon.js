const WMCoupon = `{
    _id
    name
    discount_type
    discount
    start_date
    expiration_date
    maximum_uses
    uses
    users_uses
    aplicable
    categories_ids
    stores_ids
    products_ids
    apply_in_offers
    minimum_amount
    status
    createdAt
    updatedAt
    provenance
    users_used {
      user_id
      times
    }
  }`;

export default WMCoupon;
