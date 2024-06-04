import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box,
  Text
} from '@chakra-ui/react';
import { CVButton } from '@/common/CovendeTemplate';
import { puntuacion } from '../../BuyerPedidoIcons';
import FBCProduct from './FBComponents/FBCProduct';
import FBCTienda from './FBComponents/FBCTienda';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import {
  add_product_review,
  add_store_review
} from '@/app/api/graphql/webbuyer/WBReviewService';
// import { getLoggedInUser } from '@/app/helpers/authUtils';
import { all_tags } from '@/app/api/graphql/webbuy/TableAPIService';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';

function BPDFeedBack({
  isOpen,
  onClose,
  pedido,
  producto,
  to,
  setreload,
  reload,
  setorden
}) {
  const [loading, setloading] = useState(false);
  const [storepoint, setstorepoint] = useState(0);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [productpoint, setproductpoint] = useState(0);
  const [tags, settags] = useState([]);
  const addToast = useToast();
  const initdata = async () => {
    const result = await all_tags();
    let tages = result.map((item) => ({
      ...item,
      selected: false
    }));
    settags(tages);
  };

  const [storecomment, setstorecomment] = useState('');
  const [productcomment, setproductcomment] = useState('');

  const sendfeeedback = async () => {
    if (CVErrorTags('errores')) {
      CVAlertError({
        addToast,
        message: 'Llene o corrija los campos obligatorios'
      });
      return false;
    }

    setloading(true);
    if (to == 'seller') {
      let store_review = await add_store_review({
        tags: tags.filter((item) => item.selected).map((item) => item._id),
        comment: storecomment,
        rating: storepoint,
        store_id: pedido.company_id,
        user_id: pedido.buyer_id
      });
      if (store_review.status) {
        CVAlertSuccess({
          addToast,
          message: store_review.message
        });
        setorden({
          ...pedido,
          company: {
            ...pedido.company,
            stars: store_review.total
          }
        });
        onClose();
      } else {
        CVAlertError({ addToast, message: 'Error' });
      }
    }
    if (to == 'product') {
      let addProductReview = await add_product_review({
        comment: productcomment,
        user_id: pedido.buyer_id,
        product_id: pedido.product_id,
        rating: productpoint
      });

      if (addProductReview.status) {
        CVAlertSuccess({
          addToast,
          message: addProductReview.message
        });
        setorden({
          ...pedido,
          product: {
            ...pedido.product,
            stars: addProductReview.total
          }
        });
        onClose();
      } else {
        CVAlertError({ addToast, message: 'Error' });
      }
    }
    setloading(false);
    seterrors(false);

    setreload(!reload);
  };

  const senddata = () =>
    errors ? sendfeeedback() : seterrors(true, sendfeeedback);

  useEffect(() => {
    initdata();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        seterrors(false);
        onClose();
      }}
      isCentered
      size='4xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {to == 'seller' ? (
            <FBCTienda
              pedido={pedido.company}
              errors={errors}
              storepoint={storepoint}
              setstorepoint={(tvalue) => setstorepoint(tvalue)}
              storecomment={storecomment}
              setstorecomment={setstorecomment}
              tags={tags}
              settags={settags}
            />
          ) : (
            ''
          )}

          {to == 'product' ? (
            <FBCProduct
              producto={producto}
              errors={errors}
              productpoint={productpoint}
              setproductpoint={(pvalue) => setproductpoint(pvalue)}
              productcomment={productcomment}
              setproductcomment={setproductcomment}
            />
          ) : (
            ''
          )}
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent='space-between' alignItems='end' width='100%'>
            <Box>
              {puntuacion}
              <Text color='#4D4D4D' fontSize='14px'>
                Gracias por ayudarnos a calificar a los proveedores.
              </Text>
            </Box>
            <CVButton
              loading={loading}
              disabled={loading}
              backgroundColor='red'
              onClick={() => senddata()}
              width='100px'>
              ENVIAR
            </CVButton>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BPDFeedBack;
