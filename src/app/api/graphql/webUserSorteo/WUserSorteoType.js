// WMUserSorteo.js

const REGISTER_USER_SORTEO = ({ first_name, last_name, email, dni, phone, pedido_id, social_media, validInformation, termsAndConditions }) => `
mutation {
  registerUserForSorteo(input: {
    first_name: "${first_name}"
    last_name: "${last_name}"
    email: "${email}"
    dni: "${dni}"
    phone: "${phone}"
    pedido_id: "${pedido_id}"
    social_media: {
      facebook: "${social_media.facebook}"
      instagram: "${social_media.instagram}"
      tiktok: "${social_media.tiktok}"
    }
    validInformation: ${validInformation}
    termsAndConditions: ${termsAndConditions}
  }) {
    _id
    first_name
    last_name
    email
    dni
    phone
    pedido_id
    social_media {
      facebook
      instagram
      tiktok
    }
    validInformation
    termsAndConditions
  }
}`;

export default REGISTER_USER_SORTEO;
