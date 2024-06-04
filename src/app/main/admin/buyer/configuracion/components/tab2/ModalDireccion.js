import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVButton, CVInput, CVSelect, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { USER_BY_ID } from '@/app/api/graphql/webpublic/userData/UserService';

import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React, { useState } from 'react';

import {
  USER_DIRECTION_SAVE,
  USER_DIRECTION_UPDATE
} from '@/app/api/graphql/webpublic/userData/UserDirectionService';
import {
  CVErrorTags,
  isOnlyNumber,
  onlyNumber
} from '@CVTemplate/core/CVValidation';
import CVSelectDistrict from '@CVTemplate/core/CVSelectDistrict';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';

function ModalDireccion({
  isOpen,
  onClose,
  userDirection,
  setUserDirection,
  isNewDirection,
  initData
}) {
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState(false);
  const [loadingDefault, setLoadingDefault] = useState(false);
  const [direcciones, setdirecciones] = useState([]);
  const addToast = useToast();
  let us = getLoggedInUser();

  /**
   *
   * @param {Boolean} validate
   * @param {Boolean} dir_default
   * @returns
   */
  const saveDirs = async (validate, dir_default) => {
    try {
      if (CVErrorTags('modaldir') || !validate) {
        CVAlertError({
          addToast,
          message: 'llene todos los datos'
        });
        return false;
      } else seterrors(false);

      if (dir_default) setLoadingDefault(true);
      else setloading(true);

      let { userFind } = await AxiosGQL(USER_BY_ID(us.user_id));
      const { userDirectionSave } = await AxiosGQL(
        USER_DIRECTION_SAVE({
          ...userDirection,
          predeterminado: dir_default || false,
          apellidos: userFind.last_name,
          nombre: userFind.first_name,
          user_id: userFind.user_id,
          customer_id: userFind.customer_id,
          telefono: userFind.phone[0].number || '',
          dni: userFind.dni
        })
      );
      if (userDirectionSave) {
        CVAlertSuccess({
          addToast,
          message: '¡Dirección de envío creada con éxito!'
        });
      } else {
        CVAlertError({
          addToast,
          message:
            'Error al guardar la dirección de envío. Por favor, inténtelo de nuevo más tarde.'
        });
      }
      setdirecciones([...direcciones, userDirectionSave]);
      onClose();
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
      if (dir_default) setLoadingDefault(false);
      else setloading(false);
      initData();
    } catch (err) {
      console.log({ err });
      err &&
        CVAlertError({
          addToast,
          message:
            'Tenemos complicaciones con el servidor, por favor inténtelo mas tarde.'
        });
    }
  };

  const validateFields = () => {
    if (
      !!!userDirection.direccion ||
      !!!userDirection.referencia ||
      !!!userDirection.departamento_id ||
      !!!userDirection.provincia_id ||
      !!!userDirection.distrito_id ||
      !!!userDirection.ubigeo_district ||
      !!!userDirection.zip
    ) {
      return false;
    }

    return true;
  };

  /**
   *
   * @param {Boolean} dir_default
   */
  const onSubmit = async (dir_default) => {
    let validate = validateFields();

    if (!errors && !validate) {
      seterrors(true);
      return;
    }

    if (isNewDirection) {
      await saveDirs(validate, dir_default || false);
    } else {
      await updateDirs(validate);
    }
  };

  /**
   *
   * @param {Boolean} validate
   * @returns
   */
  const updateDirs = async (validate) => {
    try {
      if (CVErrorTags('modaldir') || !validate) {
        CVAlertError({
          addToast,
          message: 'llene todos los datos'
        });
        return false;
      } else seterrors(false);

      setloading(true);

      const res = await AxiosGQL(
        USER_DIRECTION_UPDATE({
          ...userDirection,
          dni: us.dni
        })
      );

      setUserDirection({
        _id: res.userDirectionUpdate._id,
        predeterminado: res.userDirectionUpdate.predeterminado,
        user_id: res.userDirectionUpdate.user_id,
        customer_id: res.userDirectionUpdate.customer_id,
        nombre: res.userDirectionUpdate.nombre,
        apellidos: res.userDirectionUpdate.apellidos,
        direccion: res.userDirectionUpdate.direccion,
        referencia: res.userDirectionUpdate.referencia,
        departamento_id: res.userDirectionUpdate.departamento?._id,
        provincia_id: res.userDirectionUpdate.provincia?._id,
        distrito_id: res.userDirectionUpdate.distrito?._id,
        zip: res.userDirectionUpdate.zip,
        telefono: res.userDirectionUpdate.telefono,
        ubigeo_district: res?.userDirectionUpdate?.ubigeo_district,
        position: res?.userDirectionUpdate?.position || 1
      });
      onClose();
      if (res) {
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
      initData();
      setloading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      motionPreset='slideInBottom'
      size='3xl'
      onClose={() => {
        onClose();
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
          telefono: null
        });
        seterrors(false);
      }}
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader color='#FF5454'>Agregar Dirección</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography style={{ color: COLORS.blue }}>Dirección</Typography>
              <Typography style={{ color: COLORS.blue }} variant='caption'>
                Agregué la dirección exacta incluyendo Mz. Lt. y otros si
                nesecita.
              </Typography>
              <CVInput
                value={userDirection.direccion}
                onChange={(value) =>
                  setUserDirection({
                    ...userDirection,
                    direccion: String(value).trim()
                  })
                }
                errorClass='modaldir'
                error={errors && !!!userDirection?.direccion}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography style={{ color: COLORS.blue }}>Referencia</Typography>
              <CVInput
                placeholder='Calle referencial, lugares conocidos u otros detalles'
                value={userDirection.referencia}
                onChange={(value) =>
                  setUserDirection({
                    ...userDirection,
                    referencia: String(value).trim()
                  })
                }
                errorClass='modaldir'
                error={errors && !!!userDirection.referencia}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography style={{ color: COLORS.blue }}>Distrito</Typography>
              <CVSelectDistrict
                district={userDirection.distrito_id || ''}
                setDistrict={(value) =>
                  setUserDirection({
                    ...userDirection,
                    departamento_id: value[0]?._id || '',
                    provincia_id: value[1]?._id || '',
                    distrito_id: value[2]?._id || '',
                    ubigeo_district: value[2]?.code || ''
                  })
                }
              />

              {errors && !!!userDirection.distrito_id && (
                <>
                  <SizeBox height='0.7rem' />
                  <CVErrorLabel
                    errorClass={'errores'}
                    errorMessage={'Debe ingresar un distrito válido.'}
                  />
                </>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <Typography style={{ color: COLORS.blue }}>
                Código Postal
              </Typography>
              <CVInput
                value={userDirection.zip}
                onChange={(value) =>
                  setUserDirection({ ...userDirection, zip: onlyNumber(value) })
                }
                errorClass='modaldir'
                error={
                  errors &&
                  (!!!userDirection.zip || !isOnlyNumber(userDirection.zip))
                }
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Flex justifyContent='center'>
                <CVButton
                  backgroundColor='red'
                  isLoading={loading}
                  onClick={() => onSubmit()}>
                  {isNewDirection ? 'GUARDAR' : 'ACTUALIZAR'}
                </CVButton>

                {isNewDirection && (
                  <>
                    <SizeBox />
                    <CVButton
                      backgroundColor='green'
                      isLoading={loadingDefault}
                      onClick={() => onSubmit(true)}>
                      Guardar como predeterminado
                    </CVButton>
                  </>
                )}
              </Flex>
            </Grid>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalDireccion;
