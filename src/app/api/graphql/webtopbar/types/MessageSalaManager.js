export const SalaMessageModel = `{
    title
    participantes
    status
    sala
    case
    createdAt
    type
    custom_id
    newMessages
  }`;

export const EntityChat = `{
  entity_id
	first_name
	second_name
	first_image
	second_image
	model
  }`;

export const MessagesModel = `{
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    salas {
      custom_id
      read
      case
      type
      sala
      status
      origin
      created_by {
        id
        type
      }
      auth {
        id
        type
      }
      user_last {
        id
        name
        photo
        type
      }
      to_user {
        id
        type
      }
      createdAt
      updatedAt
    }
  }`;
