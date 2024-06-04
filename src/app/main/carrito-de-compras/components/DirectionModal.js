import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useToast
} from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  listdistrito,
  listprovincia
} from '@/app/api/graphql/webpublic/createstore/Planservice';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { USER_BY_ID } from '@/app/api/graphql/webpublic/userData/UserService';
import {
  USER_DIRECTION_SAVE,
  USER_DIRECTION_UPDATE
} from '@/app/api/graphql/webpublic/userData/UserDirectionService';
import {
  CVButton,
  CVInput,
  CVSelect,
  CVSwitch,
  CVText
} from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaPlusCircle } from 'react-icons/fa';
import {
  CVErrorTags,
  isOnlyText,
  isPhone
} from '@/common/CovendeTemplate/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVInputDNI from '@/common/CovendeTemplate/CVInputDNI';
import CVSelectDistrict from '@CVTemplate/core/CVSelectDistrict';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';
import { Title } from '@CVPages/core/crea-tu-tienda/CreaTuTienda.styles';

function DirectionModal({
  isOpen,
  onClose,
  direccion = {},
  edit,
  // setdirecciones,
  // direciones,
  add,
  userDirection,
  setUserDirection,
  init,
  onCloseEdit
}) {
  const basic = {
    _id: '',
    code: '',
    name: ''
  };
  const [loading, setloading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [provincias, setProvincias] = useState([basic]);
  const [distritos, setDistritos] = useState([basic]);
  const [departamentos, setDepartamentos] = useState([]);
  const [errors, seterrors] = useState(false);
  const [errorDNI, setErrorDNI] = useState(false);
  const [for_me, setfor_me] = useState(true);
  const [usuario, setusuario] = useState({});
  const [isHover, setisHover] = useState(false);
  const addToast = useToast();
  const [person, setperson] = useState({
    dni: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    codVerifica: '',
    telefono: ''
  });

  const [direction, setdirection] = useState({
    _id: '',
    predeterminado: false,
    user_id: '',
    customer_id: '',
    nombre: '',
    apellidos: '',
    direccion: '',
    referencia: '',
    departamento_id: '',
    provincia_id: '',
    distrito_id: '',
    zip: '',
    telefono: '',
    dni: '',
    ubigeo_district: ''
  });

  const savedata = async (validate = true) => {
    try {
      if (CVErrorTags('modaldir') || !validate) {
        CVAlertError({
          addToast,
          message: 'llene todos los datos'
        });
        return false;
      } else seterrors(false);

      setloading(true);
      const { userDirectionSave } = await AxiosGQL(
        USER_DIRECTION_SAVE({
          ...direction,
          predeterminado: true,
          apellidos: !for_me
            ? person?.apellidoPaterno + ' ' + person.apellidoMaterno
            : usuario.last_name,
          nombre: !for_me ? person?.nombres : usuario.first_name,
          user_id: usuario.user_id,
          customer_id: usuario.customer_id,
          telefono: !for_me ? person?.telefono : usuario?.phone[0].number || '',
          dni: !for_me ? person?.dni : usuario.dni
        })
      );

      userDirectionSave && add(userDirectionSave);
      onClose();
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const validateFields = () => {
    let size = 0;
    for (const key in direction) {
      if (direction[key] !== '') size++;
    }

    if (!for_me) {
      person.dni !== '' && size++;
      person.telefono !== '' && size++;
    }

    return for_me ? size == 8 : size == 10;
  };

  const validateFieldsEdit = () => {
    let size = 0;
    for (const key in userDirection)
      if (String(userDirection[key]).trim() == '') size++;

    if (!for_me) {
      person.dni == '' && size++;
      person.telefono == '' && size++;
      person.nombres == '' && size++;
      person.apellidoPaterno == '' && size++;
    }

    return size == 0;
  };

  const onSubmit = async () => {
    let validate = validateFields();

    if (!errors && !validate) {
      seterrors(true);
      return;
    }

    await savedata(validate);
  };

  let us = getLoggedInUser();

  const loaduser = async () => {
    console.log('cargando usuario...');
    let { userFind } = await AxiosGQL(USER_BY_ID(us.user_id));
    setusuario(userFind);

    // if (userFind?.dni != userDirection?.dni) {
    if (edit && userFind?.dni != userDirection?.dni) {
      setfor_me(false);
      setperson({
        dni: userDirection.dni,
        nombres: userDirection.nombre,
        apellidoPaterno: userDirection?.apellidos,
        apellidoMaterno: '',
        codVerifica: '',
        telefono: userDirection.telefono
      });
      // }
    }
  };

  const updateDirs = async () => {
    try {
      let validate = validateFieldsEdit();
      if (!errors && !validate) return seterrors(true);

      if (CVErrorTags('modaldir') || !validate) {
        CVAlertError({
          addToast,
          message: 'llene todos los datos'
        });
        return false;
      } else seterrors(false);

      setLoadingEdit(true);
      // await setUserDirection({ ...userDirection });
      const res = await AxiosGQL(
        USER_DIRECTION_UPDATE({
          ...userDirection,
          ...{
            dni: !for_me ? person?.dni : usuario.dni,
            nombre: !for_me ? person?.nombres : usuario.first_name,
            apellidos: !for_me
              ? person?.apellidoPaterno +
                (person.apellidoMaterno != ''
                  ? ' ' + person?.apellidoMaterno
                  : '')
              : usuario.last_name,
            telefono: !for_me
              ? person?.telefono
              : usuario?.phone[0].number || ''
          }
        })
      );

      setUserDirection({
        _id: res.userDirectionUpdate._id,
        dni: res?.userDirectionUpdate?.dni,
        ubigeo_district: res.userDirectionUpdate?.ubigeo_district || '',
        predeterminado: res.userDirectionUpdate.predeterminado,
        user_id: res.userDirectionUpdate.user_id,
        customer_id: res.userDirectionUpdate.customer_id,
        direccion: res.userDirectionUpdate.direccion,
        referencia: res.userDirectionUpdate.referencia,
        departamento_id: res.userDirectionUpdate.departamento?._id,
        provincia_id: res.userDirectionUpdate.provincia?._id,
        distrito_id: res.userDirectionUpdate.distrito?._id,
        zip: res.userDirectionUpdate.zip,
        nombre: res.userDirectionUpdate.nombre,
        apellidos: res.userDirectionUpdate.apellidos,
        telefono: res.userDirectionUpdate.telefono
      });
      onCloseEdit &&
        onCloseEdit({ direction_id: res?.userDirectionUpdate?._id });
      setLoadingEdit(false);
      onClose();
      if (res) {
        //add(userDirection);
        CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
      } else {
        CVAlertError({ addToast, message: 'Error' });
      }

      setUserDirection({
        _id: null,
        predeterminado: false,
        user_id: null,
        customer_id: null,
        nombre: null,
        apellidos: null,
        direccion: null,
        referencia: null,
        departamento_id: null,
        provincia_id: null,
        distrito_id: null,
        zip: null,
        telefono: null,
        dni: null,
        ubigeo_district: null
      });
      init();

      setLoadingEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (edit) {
      setdirection({
        ...direccion,
        departamento_id: direccion.departamento?._id || '',
        provincia_id: direccion.provincia?._id || '',
        distrito_id: direccion.distrito?._id || ''
      });
    } else {
      setdirection({
        _id: '',
        predeterminado: false,
        user_id: '',
        customer_id: '',
        nombre: '',
        apellidos: '',
        direccion: '',
        referencia: '',
        departamento_id: '',
        provincia_id: '',
        distrito_id: '',
        zip: '',
        telefono: '',
        dni: '',
        ubigeo_district: ''
      });
    }

    loaduser();
  }, [edit, direccion]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='4xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <CVText fontWeight='bold' color='blue' fontSize='1.15rem'>
            Añadir dirección de envío
          </CVText>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={2}>
              <CVText>Dirección</CVText>
            </Grid>
            <Grid item xs={12} sm={7} md={9}>
              <CVInput
                placeholder='Dirección a enviarte'
                value={edit ? userDirection.direccion : direction.direccion}
                onChange={(value) =>
                  edit
                    ? setUserDirection({ ...userDirection, direccion: value })
                    : setdirection({ ...direction, direccion: value })
                }
                errorClass='modaldir'
                error={
                  errors &&
                  (edit
                    ? userDirection.direccion == ''
                    : direction.direccion == '')
                }
              />
            </Grid>
            <Grid item xs={12} sm={5} md={2}>
              <CVText>Referencia</CVText>
            </Grid>
            <Grid item xs={12} sm={7} md={9}>
              <CVInput
                placeholder='Danos una referencia'
                value={edit ? userDirection.referencia : direction.referencia}
                onChange={(value) =>
                  edit
                    ? setUserDirection({ ...userDirection, referencia: value })
                    : setdirection({ ...direction, referencia: value })
                }
                errorClass='modaldir'
                error={
                  errors &&
                  (edit
                    ? userDirection.referencia == ''
                    : direction.referencia == '')
                }
              />
            </Grid>

            <Grid item xs={12} sm={5} md={2}>
              <CVText>Distrito:</CVText>
            </Grid>
            <Grid item xs={12} sm={7} md={9}>
              <CVSelectDistrict
                district={
                  edit ? userDirection.distrito_id : direction.distrito_id
                }
                setDistrict={(value) =>
                  edit
                    ? setUserDirection({
                        ...userDirection,
                        departamento_id: value[0]?._id || '',
                        provincia_id: value[1]?._id || '',
                        distrito_id: value[2]?._id || '',
                        ubigeo_district: value[2]?.code || ''
                      })
                    : setdirection({
                        ...direction,
                        departamento_id: value[0]?._id || '',
                        provincia_id: value[1]?._id || '',
                        distrito_id: value[2]?._id || '',
                        ubigeo_district: value[2]?.code || ''
                      })
                }
              />

              {errors &&
                (edit
                  ? userDirection.distrito_id == ''
                  : direction.distrito_id == '') && (
                  <>
                    <SizeBox height='0.7rem' />
                    <CVErrorLabel
                      errorClass={'errores'}
                      errorMessage={'Debe ingresar un distrito válido.'}
                    />
                  </>
                )}
            </Grid>

            <Grid item xs={12}></Grid>

            <Grid item xs={12} sm={5} md={2}>
              <CVText>Código postal</CVText>
            </Grid>
            <Grid item xs={12} sm={7} md={4}>
              <CVInput
                placeholder='Código ZIP: 05003'
                value={edit ? userDirection.zip : direction.zip}
                onChange={(value) =>
                  edit
                    ? setUserDirection({ ...userDirection, zip: value })
                    : setdirection({ ...direction, zip: value })
                }
                error={
                  errors &&
                  (edit ? userDirection.zip == '' : direction.zip == '')
                }
                errorClass='modaldir'
              />
            </Grid>

            {/* {!edit && (
              <>
                <Grid item xs={12} sm={5} md={4}>
                  <CVText>Yo recibo en esta direccion </CVText>
                </Grid>
                <Grid item xs={12} sm={7} md={2}>
                  <CVSwitch
                    value={for_me}
                    onChange={(value) => setfor_me(value)}
                    variant='withtext'
                  />
                </Grid>
              </>
            )} */}

            <Grid item xs={12} sm={5} md={4}>
              <CVText>Yo recibo en esta direccion </CVText>
            </Grid>
            <Grid item xs={12} sm={7} md={2}>
              <CVSwitch
                value={for_me}
                onChange={(value) => setfor_me(value)}
                variant='withtext'
              />
            </Grid>

            {!for_me ? (
              <>
                <Box py='1rem' w='100%'>
                  <CVText>
                    Ingrese los siguientes datos de la persona que recibirá tu
                    pedido
                  </CVText>
                </Box>
                <Grid item xs={12} sm={5} md={2}>
                  <CVText>Documento:</CVText>
                </Grid>
                <Grid item xs={12} sm={7} md={9}>
                  <CVInputDNI
                    errorClass='modaldir'
                    error={errors}
                    unique={false}
                    caracteres={8}
                    person={person}
                    setperson={(value) => {
                      setErrorDNI(
                        String(value?.nombres || '') == '' ? true : false
                      );

                      setperson(value);
                    }}
                    valid_dni={(value) => {
                      if (value == person?.dni) return null;

                      setperson({
                        ...person,
                        dni: value,
                        nombres: '',
                        apellidoPaterno: '',
                        apellidoMaterno: ''
                      });
                    }}
                  />
                </Grid>

                {errorDNI ? (
                  <>
                    <Grid item xs={12} sm={5} md={2}>
                      <CVText>Nombres</CVText>
                    </Grid>

                    <Grid item xs={12} sm={7} md={9}>
                      <CVInput
                        placeholder='Nombres: Ej. Juan'
                        value={person.nombres}
                        onChange={(value) =>
                          setperson({ ...person, nombres: value })
                        }
                        error={
                          errors &&
                          (!isOnlyText(person.nombres) || person.nombres == '')
                        }
                        errorMessage={'Solo se permite texto'}
                      />
                    </Grid>

                    <Grid item xs={12} sm={5} md={2}>
                      <CVText>Apellidos</CVText>
                    </Grid>

                    <Grid item xs={12} sm={7} md={9}>
                      <CVInput
                        placeholder='Ingrese los apellidos'
                        value={person.apellidoPaterno}
                        onChange={(value) =>
                          setperson({ ...person, apellidoPaterno: value })
                        }
                        error={
                          errors &&
                          (!isOnlyText(person.apellidoPaterno) ||
                            person.apellidoPaterno == '')
                        }
                        errorMessage={'Solo se permite texto'}
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sm={5} md={2}>
                      <CVText>Nombres</CVText>
                    </Grid>
                    <Grid item xs={12} sm={7} md={9}>
                      <CVInput
                        placeholder='Este campo se llena automaticamente al buscar DNI'
                        value={
                          person.nombres +
                          ' ' +
                          person.apellidoPaterno +
                          ' ' +
                          person?.apellidoMaterno
                        }
                        disabled={true}
                        error={
                          errors &&
                          (person.nombres == '' || person.apellidoPaterno == '')
                        }
                        errorClass='modaldir'
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={5} md={2}>
                  <CVText>Teléfono/Cel.:</CVText>
                </Grid>
                <Grid item xs={12} sm={7} md={9}>
                  <CVInput
                    maxLength='9'
                    placeholder='Numero de contacto'
                    value={person.telefono}
                    onChange={(value) =>
                      setperson({ ...person, telefono: value })
                    }
                    errorClass='modaldir'
                    error={
                      errors &&
                      (person.telefono == '' || !isPhone(person.telefono))
                    }
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </ModalBody>

        <ModalFooter>
          <SizeBox />

          {edit ? (
            <CVButton
              backgroundColor='red'
              isLoading={loadingEdit}
              onClick={() => updateDirs()}>
              ACTUALIZAR
            </CVButton>
          ) : (
            <CVButton
              fontWeight='bold'
              onHover={(hover) => setisHover(hover)}
              boxShadow='none'
              variant={isHover ? 'contained' : 'outlined'}
              color={isHover ? 'white' : 'green'}
              backgroundColor={isHover ? 'green' : 'white'}
              onClick={async () => onSubmit()}
              isLoading={loading}>
              <FaPlusCircle />
              <SizeBox />
              GUARDAR COMO PREDETERMINADO
            </CVButton>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DirectionModal;
