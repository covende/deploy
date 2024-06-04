import WMDDepartamento from '../../webmodel/webmodeldirection/WMDDepartamento';
import WMDDistrito from '../../webmodel/webmodeldirection/WMDDistrito';
import WMDProvincia from '../../webmodel/webmodeldirection/WMDProvincia';

const userDirection = `{
    _id
    predeterminado
    user_id
    customer_id
    nombre
    apellidos
    direccion
    referencia
    departamento${WMDDepartamento}
    provincia${WMDProvincia}
    distrito${WMDDistrito}
    zip
    telefono
    dni
    ubigeo_district
    position
  }`;

export const TOTAL_COMPANY_DIRECTIONS = (store_id) => `
{
  totalCompanyDirections(
    company_id: "${store_id}"
    )
  }`;

export const USER_DIRECTION_SAVE = (userDir) => `mutation{
    userDirectionSave(
      userDirection:{
        predeterminado:${userDir.predeterminado}
        user_id:"${userDir.user_id}"
        customer_id:"${userDir.customer_id}"
        nombre:"${userDir.nombre}"
        apellidos:"${userDir.apellidos}"
        direccion:"${userDir.direccion}"
        referencia:"${userDir.referencia}"
        departamento_id:"${userDir.departamento_id}"
        provincia_id:"${userDir.provincia_id}"
        distrito_id:"${userDir.distrito_id}"
        zip:"${userDir.zip}"
        telefono:"${userDir.telefono}"
        dni:"${userDir.dni}"
        ubigeo_district:"${userDir.ubigeo_district}"
      }
    )${userDirection}
  }`;

export const USER_DIRECTION_BY_USER = (user_id) => `{
    userDirectionByUser(user_id:"${user_id}")${userDirection}
  }`;

export const USER_DIRECTION_BY_ID = (_id) => `{
  userDirectionById(_id:"${_id}")${userDirection}
}`;

export const USER_DIRECTION_UPDATE = (userDirectionUpdate) => `mutation{
    userDirectionUpdate(_id:"${userDirectionUpdate._id}", userDirection:{
      predeterminado:${userDirectionUpdate.predeterminado}
      user_id:"${userDirectionUpdate.user_id}"
      customer_id:"${userDirectionUpdate.customer_id}"
      direccion:"${userDirectionUpdate.direccion}"
      departamento_id:"${userDirectionUpdate.departamento_id}"
      provincia_id:"${userDirectionUpdate.provincia_id}"
      distrito_id:"${userDirectionUpdate.distrito_id}"
      zip:"${userDirectionUpdate.zip}"
      referencia:"${userDirectionUpdate.referencia}"
      ubigeo_district: "${userDirectionUpdate.ubigeo_district}"
      dni: "${userDirectionUpdate.dni}"
      nombre:"${userDirectionUpdate.nombre}"
      apellidos:"${userDirectionUpdate.apellidos}"
      telefono:"${userDirectionUpdate.telefono}"
    })${userDirection}
  }`;

export const SET_CUSTOMER_DEFAULT_DIRECTION = (
  customer_id,
  user_direction_id
) => `mutation{
    setCustomerDefaultDirection(customer_id:"${customer_id}"  user_direction_id:"${user_direction_id}")
  }`;

export const USER_DIRECTION_DELETE = (id) => `mutation{
    userDirectionDelete(_id:"${id}")${userDirection}
  }`;
