import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CONVENDE_CONSULT } from '@/common/utils';
import { runInContext } from 'lodash';

export const CREATE_STORE_NEW = ({
  account,
  store,
  manager,
  user_id,
  userFind,
  terminos
}) => {
  return `
    mutation{
        createStoreNew(
          company:{
            comercial_name:${JSON.stringify(store.business_name)}
            social_razon: ${JSON.stringify(store.razon_social)}
            ${store.tipo != '' ? `company_type:"${store.tipo}"` : ``}
            ruc:"${store.ruc}"
            activity:"${store.actividad}"
            direction: ${JSON.stringify(store.street_fiscal)}
            country:"${store.pais}"
            state:"${store.departamento}"
            province:"${store.provincia}"
            district:"${store.distrito}"
            zip_code:"${store.zip_code}"
            web_page:""
            owner:"${user_id}"
            status:"PENDING"
            actividad:"${store.actividad}"
            type_of_sale:"${store.actividad}"
            manager:""
            sociedad:"${store.sociedad}"
            devolution_warranty: ${terminos.devolution_warranty}
            information_validity: ${terminos.information_validity}
            shareData_advertisings: ${terminos.shareData_advertisings}
            provenance:"${store.provenance}"
          }
          account:{
            owner:"${user_id}"
            company:""
            titular:"${account.titular}"
            numeroCC:"${account.numeroCC}"
            numeroCCI:"${account.numeroCCI}"
            tipocuenta:""
            bank:"${account.banco}"
            status:true
          }
          direction:{
            type_local:"Dirección Principal"
            supervisor:${JSON.stringify(store?.warehouse?.supervisor || '')}
            phone:${JSON.stringify(store?.warehouse?.phone || '')}
            reference:${JSON.stringify(store?.warehouse?.reference || '')}
            street_fiscal:${JSON.stringify(
              store?.warehouse?.street_fiscal || ''
            )}
            country:"${store?.pais || ''}"
            state:"${store?.warehouse?.state || ''}"
            province:"${store?.warehouse?.province || ''}"
            district:"${store?.warehouse?.district || ''}"
            zipcode:"${store?.warehouse?.zip_code || ''}"
            company:""
          }
          document:{
            owner:"${user_id}"
            company:""
            titleRUC:"Ficha Ruc de la empresa"
            fileRUC:"${store.ficha_ruc}"
            statusRUC:"PENDIENTE"
            titleDNI:"DNI del representante legal"
            fileDNI:"${manager.file_dni}"
            statusDNI:"PENDIENTE"
            titleCC:"Estado de cuenta Bancaria"
            fileCC:"PENDIENTE"
            statusCC:"PENDIENTE"
            titleCCI:"Estado de cuenta"
            fileCCI:"${account.fileCCI}"
            statusCCI:"PENDIENTE"
            status:"PENDIENTE"
          }
          manager:{
            owner:"${user_id}"
            company:""
            name:"${
              userFind?.isRepresent ? userFind?.first_name : manager.first_name
            }"
            last_name:"${
              userFind?.isRepresent ? userFind?.last_name : manager.last_name
            }"
            dni:"${userFind?.isRepresent ? userFind?.dni : manager.dni}"
            file_dni:"${manager.file_dni}"
            email:"${manager.correo}"
            phone:"${manager.phone}"
            contact:${
              userFind?.isRepresent
                ? userFind?.isRepresent || true
                : manager.isContact == 'SI'
                ? true
                : false
            }      
          }
        ){
          status
          message
          data
        }
      }`;
};

export const PLAN_STORE_PAY = (plan) => `
  mutation{
    ${plan.into_aplication ? 'addPlanStorePay' : 'addPlanStorePayPublic'}(     
      plan:{
        documents:[]
        method_payment:"${plan.method}"
        user:"${plan.user_id}"
        company:"${plan.store_id}"
        details:"${plan.details}"
        ${plan?.coupon == '' ? `` : `coupon_id:"${plan.coupon}"`}
        payment_method_status:"${plan.payment_method_status}"
        plan_id:"${plan.plan_id}"
        ${
          plan?.code_CIP != null
            ? `code_CIP:{
          cip:"${plan.code_CIP.cip}"
          cipUrl:"${plan.code_CIP.cipUrl}"
          expiryDate:"${plan.code_CIP.expiryDate}"
           }`
            : ``
        }
      }
    ){
      status
      message
      data
      code
    }
  }
`;

export const STORES_BY_RUC = (ruc) => `
{
  storesByRuc(ruc:"${ruc}"){
    _id
    owner
  }
}`;

export const STORES_BY_OWNER = (owner) => `
{
  companyByOwner(owner:"${owner}"){
    _id
    comercial_name
    status
    type_of_sale
    delivery_own
    delivery_own_status
  }
}
`;

export const DOCUMENT_TYPE_LIST = `
{
  DocumentTypeList{
    _id
    tipodoc
    descripcion_larga
    descripcion_corta
    caracteres
    status
  }
}
`;

export const VALID_DNI_UNIQUE = (dni) => `{
  customerByDNI(dni:"${dni}"){
    company_name
  }
}`;

export const VALID_DNI_BY_COMPANY = (dni) => `{
  validateDNIByCompany(dni:"${dni}") {
    status
    message
  }
}
`;

export const valid_dni_unique = async (dni) => {
  const { customerByDNI } = await AxiosGQL(VALID_DNI_UNIQUE(dni));
  return !(customerByDNI != null);
};

export const valid_dni_by_company = async (dni) => {
  const { validateDNIByCompany } = await AxiosGQL(VALID_DNI_BY_COMPANY(dni));
  return validateDNIByCompany;
};

export const find_person_by_dni = async (dni) => {
  const result = await fetch(`${CONVENDE_CONSULT}/dni.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dni: dni })
  })
    .then((res) => res.json())
    .catch((res) => console.log(res));

  return result;
};

export const chyo_customer_by_document = async (ruc) => {
  const result = await fetch(
    `https://marketplace.cajahuancayo.com.pe/WSCOOPERA/api/consulta/cliente/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Clave: 'tjbtwDal8DVfsGfW/QibcvPAPv2xtYN8HuvVNsLhrhpCOKUAKgatLw==',
        Usuario: 'l/OVPh1vSyBYunVLH6yVgo4LpfrUe34+/oN3NmnY00BMtgmLF68I0g==',
        ModoConsulta: '2',
        ValorConsulta: ruc
      })
    }
  )
    .then((res) => res.json())
    .catch((res) => console.log(res));

  return result;
};

export const find_company_by_ruc = async (ruc) => {
  const result = await fetch(`${CONVENDE_CONSULT}/ruc.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ruc: ruc })
  })
    .then((res) => res.json())
    .catch((res) => console.log(res));

  return result;
};
