export const MessageModel = `{
    _id
    adjunts{
      type
      location
    }
    visto_por
    participantes
    message
    remitente
    creado_por
    created_by
    status
    createdAt
    updatedAt
    type
    sala
  }`;


  export const MessageCustomerModel = `{
    created_by {
      id
      type
    }
    message

    adjunts {
      type
      location
    }
    type
    createdAt
    updatedAt
  }`;
