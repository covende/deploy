import React, { useState } from 'react';
import { Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal';
import { Grid } from '@material-ui/core';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  ADD_PRODUCT_ATTRIBUTE_DETAIL,
  EDIT_PRODUCTAT_TRIBUTE_DETAIL
} from '@/app/api/graphql/webseller/AttributeService';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

function AddAttributeDetailsBo({
  isOpen,
  onClose,
  idattr,
  typeattr,
  detail,
  setdetail,
  initData,
  process
}) {
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const createDetails = async () => {
    setLoading(true);

    let auxdetails = {
      product_attribute_id: detail.product_attribute_id || idattr,
      product_attribute_detail_id: detail?.product_attribute_detail_id,
      name: detail.name,
      description: typeattr == 'text' ? detail.description : '',
      color:
        typeattr == 'color'
          ? detail.description || detail.color || '#000000'
          : ''
    };

    if (detail.product_attribute_detail_id) {
      const { editProductAttributeDetail } = await AxiosGQL(
        EDIT_PRODUCTAT_TRIBUTE_DETAIL(auxdetails)
      );
      if (editProductAttributeDetail.status) {
        process(
          {
            ...editProductAttributeDetail.productAttributeDetail,
            description:
              editProductAttributeDetail?.productAttributeDetail?.color ||
              editProductAttributeDetail?.productAttributeDetail?.description
          },
          'EDIT'
        );
        CVAlertSuccess({
          addToast,
          message: editProductAttributeDetail.message
        });
        onClose();
      } else {
        CVAlertError({ addToast, message: editProductAttributeDetail.message });
      }
    } else {
      const { addProductAttributeDetail } = await AxiosGQL(
        ADD_PRODUCT_ATTRIBUTE_DETAIL(auxdetails)
      );
      if (addProductAttributeDetail.status) {
        process(addProductAttributeDetail.productAttributeDetail, 'ADD');
        CVAlertSuccess({
          addToast,
          message: addProductAttributeDetail.message
        });
        onClose();
      } else {
        CVAlertError({ addToast, message: addProductAttributeDetail.message });
      }
    }
    setLoading(false);
  };

  return (
    <Modal
      onClose={() => {
        onClose();
        setdetail(initData);
      }}
      size='xl'
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader style={{ color: '#004772' }}>
          <Text fontSize='1.5rem' fontWeight='bold'>
            Agregar Detalles del Atributo
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} style={{ color: '#004772' }} />
        <ModalBody>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Text>Nombre:</Text>
            </Grid>
            <Grid item xs={7}>
              <CVInput
                value={detail.name}
                onChange={(value) =>
                  setdetail({
                    ...detail,
                    name: value
                  })
                }
              />
            </Grid>
            <Grid item xs={5}>
              <Text>Descripción:</Text>
            </Grid>
            <Grid item xs={7}>
              <CVInput
                // paddingLeft='0'
                type={typeattr}
                value={
                  detail.description ? detail.description : detail.color || ''
                }
                onChange={(value) =>
                  setdetail({
                    ...detail,
                    description: value
                  })
                }
              />
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <CVButton
                onClick={() => {
                  onClose();
                  setdetail(initData);
                }}
                backgroundColor='red'>
                Cancelar
              </CVButton>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <CVButton onClick={() => createDetails()} isLoading={loading}>
                Guardar
              </CVButton>
            </Grid>
          </Grid>

          <br />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddAttributeDetailsBo;
