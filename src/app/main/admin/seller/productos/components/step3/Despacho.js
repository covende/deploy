import { ADD_PRODUCT_STEP_THIRD } from '@/app/api/graphql/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput, CVText } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';
import {
  Box,
  Container,
  ThemeProvider,
  Typography,
  createTheme
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '@chakra-ui/toast';
import { ProductSubTitle } from '../../ProductsStyle';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import Informacion from './Informacion';
import Preparacion from './Preparacion';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { useDisclosure } from '@chakra-ui/react';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import PFActions from '../PFActions';
import { rolemenu } from '@/app/helpers/role';

function Despacho() {
  const addToast = useToast();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [errors, seterrors] = CVUseStateCallback(false);
  const { despacha, product, in_draft } = useSelector(
    (state) => state.ProductView
  );

  // console.log('imprimendo discpath despach ante de setenar');
  // console.log(despacha);
  const dispatch = useDispatch();
  const setDespacha = (data) => dispatch(A_PRODUCTVIEW({ despacha: data }));
  const history = useHistory();

  const senddata = async () => {
    if (CVErrorTags('Mui-error')) {
      onClose();
      return {
        status: false,
        message: 'Completa y corrige los campos en rojo'
      };
    }
    setLoading(true);

    const result = await AxiosGQL(
      ADD_PRODUCT_STEP_THIRD({
        despacha,
        product,
        in_draft
      })
    );
    setLoading(false);
    return result.addProductStepThird;
  };

  const saveborrador = async () => {
    const result = await senddata();
    if (result.status) {
      CVAlertSuccess({
        addToast,
        message: 'Producto Creado en Borrador Correctamente'
      });
      if (rolemenu() !== '/bo/') {
        history.push('/seller/productos');
      } else {
        let position = location.pathname.indexOf('productos');
        history.push(location.pathname.substring(0, position) + 'productos');
      }
      return false;
    } else {
      CVAlertError({ addToast, message: result.message });
    }
  };

  const savesiguiente = async () => {
    const result = await senddata();
    if (result.status) {
      dispatch(A_PRODUCTVIEW({ tabIndex: 3 }));
    }
    result.status
      ? CVAlertSuccess({ addToast, message: result.message })
      : CVAlertError({ addToast, message: result.message });
  };

  const ejecutar = (method) => {
    if (method == 1) saveborrador();
    if (method == 2) savesiguiente();
  };

  return (
    <Box>
      <Preparacion
        despacha={despacha}
        setDespacha={setDespacha}
        errors={errors}
      />
      <br />
      <Informacion
        despacha={despacha}
        setDespacha={setDespacha}
        errors={errors}
      />
      <br />
      <ProductSubTitle>3.3. Información adicional</ProductSubTitle>

      <Container>
        <CVText color='boldGray'>
          Ingresa detalles adicionales sobre el paquete. Por ejemplo: ¿Se
          incluirán otros artículos en el paquete como Manual de Uso,
          accesorios, repuestos,etc ?
        </CVText>

        <CVInput
          height='100%'
          value={despacha?.inf_adicional || ''}
          onChange={(value) =>
            setDespacha({
              ...despacha,
              inf_adicional: value
            })
          }
          multiline={true}
          minLength='15'
        />

        {/* despacha?.inf_adicional?.length < 15 ? (
          <CVText
            color='red'
            className='errores'
            fontWeight='bold'
            fontSize='0.85rem'>
            Detalle en al menos 15 caracteres
          </CVText>
        ) : (
          <></>
        )*/}
      </Container>
      <br />
      <PFActions
        ejecutar={ejecutar}
        errors={errors}
        loading={loading}
        seterrors={seterrors}
        in_draft={in_draft}
      />
    </Box>
  );
}

export default Despacho;
