import { ADD_PRODUCT_STEP_FOURTH } from '@/app/api/graphql/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVImage } from '@/common/CovendeTemplate';
import { useDisclosure } from '@chakra-ui/hooks';
import { Flex } from '@chakra-ui/layout';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import AddWarning from '../modales/AddWarning';
import Comprobante from './Comprobante';
import Garantia from './Garantia';
import gentleman from '@/app/assets/products/gentleman.svg';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import AddAfter from '../modales/AddAfter';
import AddLastStep from '../modales/AddLastStep';
import Devoluciones from './Devoluciones';
import PFActions from '../PFActions';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { rolemenu } from '@/app/helpers/role';

function Otros() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const { extra, product, in_draft } = useSelector(
    (state) => state.ProductView
  );
  const addToast = useToast();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const setExtra = (data) => dispatch(A_PRODUCTVIEW({ extra: data }));
  // const setExtra = (data) => dispatch(A_PRODUCTVIEW({ extra: data }));

  const confirmar = async (method, in_draft) => {
    setLoading(true);
    const { addProductStepFourth } = await AxiosGQL(
      ADD_PRODUCT_STEP_FOURTH({
        extra,
        product,
        in_draft
      })
    );
    setLoading(false);
    addProductStepFourth.status
      ? CVAlertSuccess({ addToast, message: addProductStepFourth.message })
      : CVAlertError({ addToast, message: addProductStepFourth.message });

    if (addProductStepFourth.status) {
      let product = {
        product_id: addProductStepFourth?.product?.product_id,
        store_id: addProductStepFourth?.product?.store_id
      };

      console.log(location.pathname);
      method == 1 ? saveborrador(product) : savesiguiente(product);
    }
  };

  const ejecutar = (method) => {
    if (method == 1) confirmar(method, true);
    if (method == 2) onOpen();
  };

  const saveborrador = async (product) => {
    dispatch(A_PRODUCTVIEW({ success: true, product }));

    if (rolemenu() !== '/bo/') {
      history.push('/seller/productos');
    } else {
      let position = location.pathname.indexOf('productos');
      history.push(location.pathname.substring(0, position) + 'productos');
    }
  };

  const savesiguiente = async (product) => {
    dispatch(A_PRODUCTVIEW({ tabIndex: 3, success: true, product }));
    CVAlertSuccess({ addToast, message: 'Producto Guardado Correctamente' });

    if (rolemenu() !== '/bo/') {
      history.push('/seller/productos');
    } else {
      let position = location.pathname.indexOf('productos');
      history.push(location.pathname.substring(0, position) + 'productos');
    }
  };

  return (
    <Box>
      <Flex justifyContent='space-between'>
        <Box flex='70%' display='flex' flexDirection='column'>
          <Comprobante extra={extra} setExtra={setExtra} errors={errors} />
          <SizeBox />
          <Garantia extra={extra} setExtra={setExtra} errors={errors} />
          <SizeBox />
          <Devoluciones extra={extra} setExtra={setExtra} errors={errors} />
        </Box>
        <Box flex='30%' display='flex'>
          <CVImage image={gentleman} />
        </Box>
      </Flex>
      <SizeBox />

      {/* <AddWarning
        isLoading={loading}
        isOpen={isOpen}
        onClose={onClose}
        confirmar={confirmar}
        cancelar={() => {
          setLoading(false);
        }}
      /> */}
      <PFActions
        ejecutar={ejecutar}
        errors={errors}
        loading={loading}
        seterrors={seterrors}
        in_draft={in_draft}
      />

      {isOpen && (
        <AddLastStep
          loading={loading}
          isOpen={isOpen}
          onClose={onClose}
          gotoConfirm={() => confirmar(2, false)}
        />
      )}
    </Box>
  );
}

export default Otros;
