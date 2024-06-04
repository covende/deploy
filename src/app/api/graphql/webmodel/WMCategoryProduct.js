const WMCategoryProduct = `{
    _id
    custom_id
    name
    parent_id
    slug
    description
    image
    status
    logo
    percent
    mimimun
    slider
    banner
    store_ids
    datestart
    dateends
    allow_return
    parents {
      custom_id
      slug
      name
      }
  }`;

export default WMCategoryProduct;
