import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Box } from '@material-ui/core';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Atributos from './Atributos';
import Categorias from './S1Categorias';
import Detalle from './Detalle';
import Informacion from './Informacion';
import {
  ADD_PRODUCT_STEP_ONE,
  PRODUCT_ATTRIBUTES_DETAILS
} from '@/app/api/graphql/webseller/ProductService';
import { useToast } from '@chakra-ui/toast';
import { useHistory, useLocation } from 'react-router-dom';
import { ProductUpdate, tienda } from '../../redux/ProductUpdate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { A_PRODUCTVIEW } from '../../redux/ProductViewAction';
import { A_CATEGORYPRODUCTS } from '@/app/main/bo/arborescencia-de-categorias/redux/Action';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import PFActions from '../PFActions';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';
import useLocalStorage from '@/common/hooks/useLocalStorage';
import AttrProducts from '../../AttrProducts';
import { useDisclosure } from '@chakra-ui/hooks';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { rolemenu } from '@/app/helpers/role';

function Product() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addToast = useToast();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [openAtributos, setOpenAtributos] = useState(false);
  const [hideButton, setHideButton] = useState(true);
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );

  const {
    allattributes,
    attributes,
    information,
    description,
    brand,
    brands,
    categorias,
    product,
    step,
    in_draft,
    reset_attrs
  } = useSelector((state) => state.ProductView);

  let array_producto = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const history = useHistory();
  const [step1, setStep1] = useLocalStorage('stepOne', '');
  const setProducto = (data) => dispatch(A_PRODUCTVIEW({ ...data }));
  const setCategory = (data) => dispatch(A_CATEGORYPRODUCTS({ ...data }));

  const senddata = async ({ in_draft }) => {
    setLoading(true);
    let store_id = await tienda(dispatch, product);
    const result = await AxiosGQL(
      ADD_PRODUCT_STEP_ONE({
        attributes,
        information,
        description,
        brand,
        categorias,
        product: { ...product, store_id },
        in_draft
      })
    );
    setLoading(false);
    return result.addProductStepOne;
  };

  const saveborrador = async () => {
    const result = await senddata({ in_draft: true });
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
    }
    CVAlertError({ addToast, message: result.message });
  };

  const savesiguiente = async () => {
    const result = await senddata({ in_draft });

    if (result.status) {
      ProductUpdate({ dispatch, step: 1, result: result.product });
    }
    result.status
      ? CVAlertSuccess({ addToast, message: result.message })
      : CVAlertError({ addToast, message: result.message });
  };

  const ejecutar = (method) => {
    if (method == 1) saveborrador();
    if (method == 2) savesiguiente();
  };

  useEffect(() => {
    return () => setProducto({ reset_attrs: false });
  }, []);

  return (
    <Box>
      <Categorias
        setProducto={setProducto}
        categorias={categorias}
        categorys={categorys}
        treecategorys={treecategorys}
        setCategory={setCategory}
        product_id={product.product_id}
      />

      {errors && categorias.length == 0 && (
        <CVErrorLabel errorMessage='Seleccione al menos una categoria' />
      )}
      <SizeBox />

      <Informacion
        setProducto={setProducto}
        information={information}
        brands={brands}
        brand={brand}
        errors={errors}
      />
      <SizeBox />
      <Detalle
        description={description}
        setProducto={setProducto}
        errors={errors}
      />
      <SizeBox />
      <Atributos
        allattributes={allattributes}
        attributes={attributes}
        setProducto={setProducto}
        setOpenAtributos={setOpenAtributos}
        resetAttrs={reset_attrs}
      />
      <SizeBox />

      <PFActions
        ejecutar={ejecutar}
        errors={errors}
        loading={loading}
        seterrors={seterrors}
        in_draft={in_draft}
      />

      <Modal
        isOpen={openAtributos}
        size='3xl'
        onClose={() => setOpenAtributos(!openAtributos)}>
        <ModalOverlay />

        {/* p={{ base: 4, md: 14 }} */}
        {/* <ModalContent borderRadius='12px' maxW='40%'> */}
        <ModalContent
          borderRadius='12px'
          maxW={{ base: '80%', md: '70%', xl: '48%', '2xl': '40%' }}>
          <ModalHeader
            borderTopRadius={10}
            style={{
              backgroundColor: COLORS['blue'],
              color: '#ffffff',
              fontWeight: '700'
            }}>
            <Center>
              <span style={{ fontWeight: '400', marginRight: '5px' }}>
                {/* Categorias */}
                Atributos
              </span>
            </Center>
          </ModalHeader>
          <ModalCloseButton style={{ color: '#FFFFFF' }} />
          {/* <ModalBody padding='21px 57px'>
            <AttrProducts hideButton={hideButton} />
          </ModalBody> */}

          <ModalBody
            px={{ base: '10px', xl: '16px' }}
            py={{ base: '5px', xl: '9px' }}>
            <AttrProducts hideButton={hideButton} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Product;
