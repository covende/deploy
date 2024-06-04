export const PRODUCT_ATTRIBUTE_DETAIL_RESULT = `{
    product_attribute_detail_id
    name
    color
    description
    type_attribute
    product_attribute_id
    creator_id
  }`;

export const ADD_PRODUCT_ATTRIBUTE_DETAIL = (details) => `
  mutation{
    addProductAttributeDetail(
      product_attribute_id:"${details.product_attribute_id}"
      name:"${details.name}"
      description:"${details.description}"
      color:"${details.color}"
      type_attribute: "${details?.type_attribute || ''}"
    ){
      status
      message
      productAttributeDetail${PRODUCT_ATTRIBUTE_DETAIL_RESULT}
    }
  }
  `;

export const EDIT_PRODUCTAT_TRIBUTE_DETAIL = (details) => `
  mutation{
    editProductAttributeDetail(
      product_attribute_detail_id:"${details.product_attribute_detail_id}"
      product_attribute_id:"${details.product_attribute_id}"
      name:"${details.name}"
      description:"${details.description}"
      color:"${details.color}"
    ){
      status
      message
      productAttributeDetail${PRODUCT_ATTRIBUTE_DETAIL_RESULT}
    }
  }
`;

export const ADD_PRODUCT_ATTRIBUTE = (name, type_attribute = '') => `
  mutation{
    addProductAttribute(
      name:"${name}"
      type_attribute: "${type_attribute}"
    ){
      status
      message
      productAttribute{
        product_attribute_id
        name
        attributes_details${PRODUCT_ATTRIBUTE_DETAIL_RESULT}
        type_attribute
        creator_id
      }
    }
  }
  `;

export const SET_ATTRIBUTE = ({
  _id,
  attribute,
  text = false,
  boolean = false,
  number = false
}) => `
  mutation{
    setAttribute(
      _id:"${_id}"
      attribute:"${attribute}"
      ${text ? `text:"${text}"` : ``}
      ${number ? `number:${number}` : ``}
      ${boolean ? `boolean:${boolean}` : ``}
    ){
      status
      message
    }
  }
  `;
