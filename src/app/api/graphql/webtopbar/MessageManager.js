import { ADMIN_USER_ID } from '@/app/helpers';
import { json_format } from '@/common/utils/methods';
import { CVJsonFormat } from '@CVTemplate/core/CVMethods';
import AxiosGQL from '../../rest/AxiosGQL';
import { ICustomerBasic, IWithPagination } from '../webbo/BInterface';
import { gql } from 'graphql-request';
import WMCompanyDenunce from '../webmodel/WMCompanyDenunce';
import { MessageCustomerModel, MessageModel } from './types/Message';
import {
  EntityChat,
  MessagesModel,
  SalaMessageModel
} from './types/MessageSalaManager';
import { categoryFragment } from '../categories/typeDefs/fragments';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

export const MESSAGE_NEWER = () => `{
    MessageNewer
    NotificacionNewer
  }`;

export const NOTIFICATIONS_BY_USER = ({ page = 1, limit = 10 }) => `
{
    notificationsByUser(page:${page}, limit:${limit}){
      ${IWithPagination(`{
        remitente{
          id
          name
          photo
          type
        }
        message
        title
        details
        link_to
        status
        createdAt
        updatedAt
      }`)}
    }
  }
`;

export const NOTIFICACION_LIST_BY_CUSTOMER_ID = ({
  user_id,
  page = 1,
  limit = 10
}) => `{
    NotificacionListByCustomerID(user_id:"${user_id}",page:${page}, limit:${limit}){
      ${IWithPagination(`{
        remitente{
          user_id
          customer_id
          first_name
          last_name
          type
          image
        }
        recividor${ICustomerBasic}
        remitente1${ICustomerBasic}
        recividor1${ICustomerBasic}
        message
        title
        details
        link_to
        status
        createdAt
        updatedAt
      }`)}
    }
  }`;

export const READ_NOTIFICATION = () => `
  mutation {
    readNotifications
  }
`;

export const MESSAGE_SAVE = ({
  caso,
  title,
  adjunts,
  viewed,
  participants,
  message,
  sender,
  created_by,
  status,
  sala,
  type
}) => `mutation{
  MessageSave(
    case:"${caso}",
    title:"${title}",
    adjunts:${json_format(adjunts)},
    viewed:${json_format(viewed)},
    participants:${json_format(participants)}
    message:"""${message}"""
    sender:"${sender}"
    created_by:"${created_by}"
    status:${status}
    sala:"${sala}"
    type:"${type}"
  )${MessageModel}
}`;

export const ADD_PEDIDO_CHAT = (pedido_id) => `
mutation {
  addPedidoChat(pedido_id: "${pedido_id}") {
    status
    message
    sala
  }
}
`;

export const CLOSE_SALA = (sala_id) => `
mutation {
  closeSala(sala: "${sala_id}")
}
`;

export const SAVE_CHAT_MESSAGE = gql`
  mutation saveChatMessage(
    $sala: String!
    $message: String
    $adjunts: [Adjunt]
  ) {
    saveChatMessage(sala: $sala, message: $message, adjunts: $adjunts) {
      created_by {
        id
        name
        photo
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
    }
  }
`;

export const saveChatMessage = async (newMessage) => {
  const res = await AxiosGqlClient.mutation(SAVE_CHAT_MESSAGE, newMessage);
  return res.data.saveChatMessage;
};

export const SALA_MESSAGE_BY_USER_ID = (user_id) => `{
  SalaMessageByUserID(user_id:"${user_id}")${MessagesModel}
}`;

export const READ_ROOM_MESSAGE = (sala) => gql`mutation {
  readRoomMessages(sala: "${sala}")
}`;

export const DELETE_SALA_MESSAGES = (sala) => gql`mutation {
  deleteSalaMessages(sala: "${sala}") {
    status
    message
  }
}`;

export const MESSAGES_UNREAD = () => `{
  messagesUnread
}`;

export const SALA_MESSAGE_BY_SALA = (sala) => `{
  SalaMessageBySala(sala:"${sala}")${SalaMessageModel}
}`;

export const MESSAGE_BY_SALA = (sala, page = 1, limit = 10) => `{
  MessageBySala(sala:"${sala}",page:${page}, limit:${limit}){
    totalDocs
    offset
    limit
    totalPages
    page
    pagingCounter
    hasPrevPage
    hasNextPage
    prevPage
    nextPage
    docs {
      created_by {
        id
        name
        photo
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
    }
  }
}`;

export const MESSAGE_LIST = ({ page = 1, limit = 10 }) => `{
  MessageList(page:${page}, limit:${limit}){
    ${IWithPagination(MessageModel)}
  }
}`;

export const GET_SALA_BY_ID = (sala) => `{
  getSalaByID(id: "${sala}"){
    custom_id
    case
    from ${EntityChat}
    to ${EntityChat}
    motive
    sala
    origin
    start_date
    participants ${EntityChat}
    msg_last
  }
}`;

export const GET_SALA_BY_USER = (page, motive) => `
{
  getSalasByUser(page: ${page || 1}, itemsPage: 10, motive: "${motive || ''}"){
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
      case
      type
      read
      sala
      status
      origin
      created_by {
        id
        name
        photo
        type
      }
      to {
        id
        name
        photo
        type
      }
      auth {
        id
        name
        photo
        type
      }
      user_last {
        id
        name
        photo
        type
      }
      createdAt
      updatedAt
      messages_no_read_bo
    }
  }
}
`;

export const COMPANY_DENUNCE_SAVES = gql`
  mutation CompanyDenunceSave(
      $custom_id: String
      $reported_by: String
      $motives_ids: [String]
      $detail: String
      $photos: [String]
      $admin_user_id: String
      $company_id: String
  ){
    CompanyDenunceSave(
      companydenunce: {
        custom_id:$custom_id
        reported_by:$reported_by
        motives_ids:$motives_ids
        detail:$detail
        photos:$photos
        status: "PENDING"
        admin_user_id:$admin_user_id
        company_id:$company_id
      }
    )${WMCompanyDenunce}
  }
`;

export const companyDenunce = async (denunce) => {
  const res = await AxiosGqlClient.query(COMPANY_DENUNCE_SAVES, denunce);
  return res.data;
};

export const replyquotation = async ({ quotation_id, message, adjunts }) => {
  const { replyQuotation } = await AxiosGQL(`mutation{
    replyQuotation(quotation_id:"${quotation_id}", msg:"${message}", adjunts: ${CVJsonFormat(
    { data: adjunts, variant: 'withoutKeys' }
  )}){
      status
      message
      room_id
    }
  }`);

  return replyQuotation;
};
