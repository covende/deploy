import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  ADD_PRODUCT_ATTRIBUTE_DETAIL,
  EDIT_PRODUCTAT_TRIBUTE_DETAIL
} from '@/app/api/graphql/webseller/AttributeService';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

function AddAttributeDetails({
  isOpen,
  onClose,
  idattr,
  typeattr,
  detail,
  setdetail,
  initData
}) {
  const addToast = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    status: false,
    productAttributeDetail: {},
    message: ''
  });
  const { client } = useSelector((state) => state.Clients);
  const { attributes, allattributes } = useSelector(
    (state) => state.ProductView
  );

  const setattr = (da) => {
    let attributes_details =
      detail.creator_id != ''
        ? da.attributes_details.map((item) => {
            if (
              item.product_attribute_detail_id ==
              detail.product_attribute_detail_id
            )
              item = result.productAttributeDetail;
            return item;
          })
        : [...da.attributes_details, result.productAttributeDetail];

    if (da.product_attribute_id === idattr) {
      da = {
        ...da,
        attributes_details
      };
    }
    return da;
  };

  const createDetails = async () => {
    setLoading(true);
    let auxdetails = {
      product_attribute_id: detail.product_attribute_id || idattr,
      product_attribute_detail_id: detail?.product_attribute_detail_id,
      name: detail.name,
      description: typeattr == 'text' ? detail.description : '',
      color: typeattr == 'color' ? detail.description || '#000000' : ''
    };

    if (detail?.product_attribute_detail_id) {
      const { editProductAttributeDetail } = await AxiosGQL(
        EDIT_PRODUCTAT_TRIBUTE_DETAIL({
          ...auxdetails,
          product_attribute_id: detail.product_attribute_id,
          product_attribute_detail_id: detail.product_attribute_detail_id
        })
      );
      if (editProductAttributeDetail) {
        setResult({
          status: editProductAttributeDetail?.status,
          productAttributeDetail:
            editProductAttributeDetail?.productAttributeDetail,
          message: editProductAttributeDetail.message
        });
      }
    } else {
      const { addProductAttributeDetail } = await AxiosGQL(
        ADD_PRODUCT_ATTRIBUTE_DETAIL({
          ...auxdetails,
          type_attribute: 'CUSTOM'
        })
      );
      if (addProductAttributeDetail)
        setResult({
          status: addProductAttributeDetail?.status,
          productAttributeDetail:
            addProductAttributeDetail?.productAttributeDetail,
          message: addProductAttributeDetail.message
        });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (result.status) {
      let attr = [...attributes];
      attr = attr.map((da) => setattr(da));
      // let allattr = [...allattributes];
      // allattr = allattr.map((da) => setattr(da));

      dispatch(
        A_PRODUCTVIEW({
          attributes: attr
          // allattributes: allattr
        })
      );
      onClose();
      setdetail(initData);
      CVAlertSuccess({ addToast, message: result.message });
    } else {
      if (result.message) CVAlertError({ addToast, message: result.message });
    }
  }, [result]);

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
                value={detail.description ? detail.description : detail.color}
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

export default AddAttributeDetails;
