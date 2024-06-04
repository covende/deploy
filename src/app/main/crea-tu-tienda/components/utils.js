import { userService } from '@/app/api/graphql';
import {
  all_banks,
  company_types,
  tipo_sociedades
} from '@/app/api/graphql/webbuy/TableAPIService';
import {
  CREATE_STORE_NEW,
  STORES_BY_RUC
} from '@/app/api/graphql/webpublic/createstore/CreateStoreService';
import {
  listdepartamento,
  listplanes
} from '@/app/api/graphql/webpublic/createstore/Planservice';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { isRUC } from '@/app/helpers';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { CVErrorTags, isEmail } from '@/common/CovendeTemplate/CVValidation';

export const labelTabs = {
  DATOS_DE_USUARIO: 'DATOS DE USUARIO',
  DATOS_DE_TU_NEGOCIO: 'DATOS DE TU NEGOCIO',
  PAGA_Y_ACTIVA: 'PAGO'
};

export const labelIndex = {
  'create-usuario': 0,
  'create-tienda': 1,
  'create-plan': 2
};
///////////////////////////////////////////////////////////////////////////////
export const _validateUserByEmail = async ({
  email,
  setIsOpen,
  setTipeuser
}) => {
  if (isEmail(email)) {
    const res = await userService.fetchByEmail({ email: email });
    // console.log(res?.exist);
    if (res?.exist) {
      setIsOpen(true);
      setTipeuser && setTipeuser(res);
      if (!setTipeuser) email = '';
    }
  }
  return email;
};

export const _validateRUC = async ({
  ruc,
  setIsOpen,
  setStore,
  store,
  user_id,
  setisRegistered
}) => {
  if (!isRUC(ruc) && ruc.length == 11) {
    let { storesByRuc } = await AxiosGQL(STORES_BY_RUC(ruc));
    if (storesByRuc && storesByRuc.length) {
      ruc = '';
      if (user_id == storesByRuc[storesByRuc.length - 1].owner) {
        localStorage.setItem(
          'store_id',
          storesByRuc[storesByRuc.length - 1]._id
        );
        setisRegistered(true);
      } else {
        setIsOpen(true);
      }
    }
  }
  setStore({
    ...store,
    ruc: ruc,
    business_name: '',
    razon_social: '',
    street_fiscal: ''
  });
};

////////////////////////////////////////////////////////////////////////////

export const _findruc = async ({
  setfinding,
  find_company_by_ruc,
  sociedades,
  setStore,
  store,
  addToast
}) => {
  setfinding(true);
  const result = await find_company_by_ruc(store.ruc);
  if (result?.status == 'ok' && result?.data?.razonSocial) {
    let entidad = result.data;
    let soc = sociedades.filter((socs) => socs.name == entidad.tipo);
    /*let dep = departamentos.filter(
        (deps) =>
          deps.name.toString().toLowerCase() ==
          entidad.departamento.toString().toLowerCase()
      );
      let pro = provincias.filter(
        (provs) =>
          provs.name.toString().toLowerCase() ==
          entidad.provincia.toString().toLowerCase()
      );
      let dis = distritos.filter(
        (dist) =>
          dist.name.toString().toLowerCase() ==
          entidad.distrito.toString().toLowerCase()
      );*/
    //console.log({ dep, pro, dis });
    setStore({
      ...store,
      ruc: entidad.ruc,
      business_name: entidad.nombreComercial,
      razon_social: entidad.razonSocial,
      street_fiscal: entidad.direccion,
      sociedad: soc.length > 0 ? soc[0].title : ''
      /*departamento: dep.length > 0 ? dep[0]._id : '',
        provincia: pro.length > 0 ? pro[0]._id : '',
        distrito: dis.length > 0 ? dis[0]._id : ''*/
    });
    CVAlertSuccess({ addToast, message: 'Ruc válido' });
  } else {
    CVAlertError({
      addToast,
      message: 'El número de RUC ingresado no existe'
    });
  }
  setfinding(false);
};
//////////////////////////////////////////////////////////////////////////
export const _SubmitFormUser = async ({
  addToast,
  setIsLoading,
  usuario,
  docs,
  tipodoc,
  person,
  setIsOpen,
  isRepresent,
  terminos,
  user_id = '',
  history
}) => {
  if (CVErrorTags()) {
    CVAlertError({
      addToast,
      message: 'Llene o corrija los campos obligatorios'
    });
    return false;
  }

  setIsLoading(true);
  let result = await userService.addItem({
    email: usuario.email,
    password: usuario.password,
    first_name: person.nombres,
    last_name: person.apellidoPaterno + ' ' + person.apellidoMaterno,
    dni: person.dni,
    phone: usuario.phone,
    tipodoc: docs[tipodoc]._id,
    isRepresent: isRepresent,
    policies_terms: terminos.termino,
    shareData_promotions: terminos.condicion,
    role: 'Seller',
    user_id: user_id
  });
  if (result.code + '' == '200') {
    if (result.next != null && result.url != null) {
      history.push(`/${result.url}`);
    } else {
      setIsOpen(true);
    }
  } else {
    CVAlertError({
      addToast,
      message: result.description || 'Ocurrieron errores' //
    });
  }
  setIsLoading(false);
};

export const _SubmitFormStore = async ({
  addToast,
  setIsOpen,
  setIsloading,
  account,
  store,
  manager,
  userFind,
  user_id,
  termino
}) => {
  if (CVErrorTags()) {
    CVAlertError({
      addToast,
      message: 'Llene o corrija los campos obligatorios'
    });
    return false;
  }
  setIsloading(true);
  let result = await AxiosGQL(
    CREATE_STORE_NEW({
      account,
      store,
      manager,
      userFind,
      user_id,
      terminos: {
        devolution_warranty: termino.condiciones,
        information_validity: termino.veridico,
        shareData_advertisings: termino.autorizacion
      }
    })
  );

  if (result.createStoreNew.status) {
    localStorage.setItem('store_id', result.createStoreNew.data);
    setIsOpen(true);
  } else {
    window.alert(
      'El usuario ya se encuentra registrado, si va a cambiar los datos cree un nuevo usuario'
    );
  }
  setIsloading(false);
};

export const _initdatastore = async ({
  setUserFind,
  setManager,
  manager,
  setDepartamentos,
  setsociedades,
  setTipos,
  setBancos,
  user_id,
  routerHistory
}) => {
  const data = await AxiosGQL(listdepartamento());
  let { userFind } = await AxiosGQL(listplanes(user_id));
  if (userFind == null) {
    routerHistory.push('/crea-tu-tienda/create-usuario');
  }
  let sociedad = await tipo_sociedades();
  let banks = await all_banks();
  let companyTypes = await company_types();

  setUserFind(userFind);
  if (userFind.isRepresent) {
    setManager({
      ...manager,
      first_name: userFind.first_name,
      last_name: userFind.last_name,
      correo: userFind.email,
      dni: userFind.dni,
      phone: userFind.phone[0]?.number || '',
      tipodoc: userFind.tipodoc || ''
    });
  }
  setDepartamentos(data?.departamentos || []);
  setsociedades(sociedad);
  setTipos(companyTypes);
  setBancos(banks);
};

export const InitialManager = {
  first_name: '',
  last_name: '',
  dni: '',
  file_dni: '',
  phone: '',
  correo: '',
  isContact: 'SI'
};
console.log('mostrar data');
console.log(localStorage.getItem('storedata'));
var dataestore = localStorage.getItem('storedata');
let store_seccion = JSON.parse(dataestore || '{}');
// let store_seccion= {}
export const InitialStore = {
  business_name: '',
  departamento: store_seccion?.departamento || '',
  provincia: store_seccion?.provincia || '',
  tipo: store_seccion?.tipo || '',
  distrito: store_seccion?.distrito || '',
  razon_social: store_seccion?.razon_social || '',
  street_fiscal: store_seccion?.street_fiscal || '',
  ruc: store_seccion?.ruc || '',
  ficha_ruc: '',
  sociedad: store_seccion?.sociedad || '',
  pais: 'Perú',
  actividad: 'RETAIL',
  zip_code: store_seccion?.zip_code || '',
  // supervisor: store_seccion?.supervisor || '',
  phone: store_seccion?.phone || '',
  reference: store_seccion?.reference || '',
  warehouse: {
    type_local: 'Dirección Principal',
    supervisor: '',
    phone: '',
    reference: '',
    street_fiscal: '',
    country: 'Perú',
    state: '',
    province: '',
    district: '',
    zipcode: ''
  }
};

var dataccount = localStorage.getItem('account');
let account_seccion = JSON.parse('{}');
// let account_seccion ={}
export const InitialAccount = {
  banco: account_seccion?.banco || '',
  titular: account_seccion?.titular || '',
  numeroCC: account_seccion?.numeroCC || '',
  numeroCCI: account_seccion?.numeroCCI || '',
  fileCCI: ''
};
