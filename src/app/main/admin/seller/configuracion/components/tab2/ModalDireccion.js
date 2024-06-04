import { listdepartamento } from '@/app/api/graphql/webpublic/createstore/Planservice';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Box
} from '@chakra-ui/react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import {
  listdistrito,
  listprovincia
} from '@/app/api/graphql/webpublic/createstore/Planservice';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';
import {
  ADD_COMPANY_DIRECTIONS,
  EDIT_COMPANY_DIRECTION
} from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { CVErrorTags } from '@CVTemplate/core/CVValidation';
import CVSelectDistrict from '@CVTemplate/core/CVSelectDistrict';
import { Title } from '@CVPages/core/crea-tu-tienda/CreaTuTienda.styles';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';

function ModalDireccion({
  storeID,
  isOpen,
  onClose,
  initData,
  sellerDirection,
  setSellerDirection,
  isNewDirection
}) {
  const addToast = useToast();
  const [errors, seterrors] = CVUseStateCallback(false);

  const insertDirection = async (direction) => {
    try {
      const res = await AxiosGQL(ADD_COMPANY_DIRECTIONS(direction, storeID));
      console.log(res.companyDirection);
      CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
    } catch (error) {
      console.error({ error });
    }
  };

  const saveDirs = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    await insertDirection(sellerDirection);
    await initData();
    onClose();
    seterrors(false);
  };

  const updateDirs = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }
    try {
      const res = await AxiosGQL(
        EDIT_COMPANY_DIRECTION(sellerDirection, storeID)
      );
      onClose();
      if (res) {
        CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
      } else {
        CVAlertError({ addToast, message: 'Error' });
      }
      setSellerDirection({
        id: '',
        store_id: '',
        province: '',
        type_local: '',
        supervisor: '',
        phone: '',
        street_fiscal: '',
        country: '',
        state: '',
        district: '',
        predetermined: '',
        reference: '',
        zipcode: ''
      });
      initData();
      seterrors(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      motionPreset='slideInBottom'
      size='xl'
      onClose={() => {
        onClose();
        setSellerDirection({
          type_local: '',
          supervisor: '',
          phone: '',
          street_fiscal: '',
          country: '',
          state: '',
          province: '',
          district: '',
          zipcode: '',
          reference: ''
        });
      }}
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent pb={5}>
        <ModalHeader color={COLORS['primary']}>Agregar Dirección</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <CVInput
                title='Tipo de establecimiento'
                value={sellerDirection.type_local}
                onChange={(value) =>
                  setSellerDirection({ ...sellerDirection, type_local: value })
                }
                error={errors && sellerDirection.type_local === ''}
                errorMessage='Campo requerido*'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CVInput
                title='Encargado'
                value={sellerDirection.supervisor || ''}
                onChange={(value) =>
                  setSellerDirection({ ...sellerDirection, supervisor: value })
                }
                error={errors && sellerDirection.supervisor === ''}
                errorMessage='Campo requerido*'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CVInput
                title='Dirección'
                value={sellerDirection.street_fiscal || ''}
                onChange={(value) =>
                  setSellerDirection({
                    ...sellerDirection,
                    street_fiscal: value
                  })
                }
                error={errors && sellerDirection.street_fiscal === ''}
                errorMessage='Campo requerido*'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CVInput
                title='Referencia'
                value={sellerDirection.reference || ''}
                onChange={(value) =>
                  setSellerDirection({ ...sellerDirection, reference: value })
                }
                error={errors && sellerDirection.reference == ''}
                errorMessage='Campo requerido*'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <CVSelect
                title='País'
                value={sellerDirection.country || ''}
                onChange={(value) =>
                  setSellerDirection({ ...sellerDirection, country: value })
                }
                options={[{ text: 'PERÚ', value: 'Perú' }]}
                error={errors && sellerDirection.country === ''}
                errorMessage='Campo requerido*'
              />
            </Grid>

            <Grid item xs={12}>
              <Flex>
                <Box>
                  <Title>Distrito:</Title>
                </Box>
                <Box w='100%'>
                  <CVSelectDistrict
                    district={sellerDirection.district}
                    setDistrict={(value) =>
                      setSellerDirection({
                        ...sellerDirection,
                        state: value[0]?._id || '',
                        province: value[1]?._id || '',
                        district: value[2]?._id || ''
                      })
                    }
                  />

                  {errors && sellerDirection?.district == '' && (
                    <>
                      <SizeBox height='0.7rem' />
                      <CVErrorLabel
                        errorClass={'errores'}
                        errorMessage={'Debe ingresar un distrito válido.'}
                      />
                    </>
                  )}
                </Box>
              </Flex>
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <CVInput
                title='Código Postal'
                value={sellerDirection.zipcode || ''}
                onChange={(value) =>
                  setSellerDirection({ ...sellerDirection, zipcode: value })
                }
                error={errors && sellerDirection.zipcode === ''}
                errorMessage='Campo requerido*'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <CVInput
                title='Teléfono o Celular'
                value={sellerDirection.phone || ''}
                onChange={(value) =>
                  setSellerDirection({ ...sellerDirection, phone: value })
                }
                error={errors && sellerDirection.phone === ''}
                errorMessage='Campo requerido*'
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Flex justifyContent='center'>
                <CVButton backgroundColor='gray' onClick={() => onClose()}>
                  REGRESAR
                </CVButton>
                <CVButton
                  onClick={() => {
                    if (isNewDirection) {
                      return !errors ? seterrors(true, saveDirs) : saveDirs();
                    } else {
                      return !errors
                        ? seterrors(true, updateDirs)
                        : updateDirs();
                    }
                  }}>
                  {isNewDirection ? 'GUARDAR' : 'ACTUALIZAR'}
                </CVButton>
              </Flex>
            </Grid>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalDireccion;
