import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { Flex, Box, useToast, Center } from '@chakra-ui/react';
// import {
//   CVBreadcrumb,
//   CVButton,
//   CVErrorLabel,
//   CVImage,
//   CVInput,
//   CVInputImage,
//   CVLine,
//   CVPanel,
//   CVSelect,
//   CVText,
//   CVTextArea
// } from '@/common/CovendeTemplate';

import { useParams } from 'react-router';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS, IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { useDispatch } from 'react-redux';
import { CVRenderHTML, CVValidLogin } from '@/common/CovendeTemplate/CVMethods';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { FIND_COMPANY } from '@/app/api/graphql/webpublic/stores/StoresService';
import { PRODUCT_BY_ID } from '@/app/api/graphql/webpublic/products/ProductosPublicService';
import { FiPaperclip } from 'react-icons/fi';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { quotations_save } from '@/app/api/graphql/webquotation/QService';
import CVInput, { CVErrorLabel } from '@CVTemplate/core/CVInput';
import CVBreadcrumb from '@CVTemplate/core/CVBreadcrumb';
import CVButton from '@CVTemplate/core/CVButton';
import CVImage from '@CVTemplate/core/CVImage';
import CVInputImage from '@CVTemplate/core/CVInputImage';
import CVLine from '@CVTemplate/core/CVLine';
import CVPanel from '@CVTemplate/core/CVPanel';
import CVSelect from '@CVTemplate/core/CVSelect';
import CVText from '@CVTemplate/core/CVText';
import CVTextArea from '@CVTemplate/core/CVTextArea';

function PoliticaPrivacidad() {
  const us = getLoggedInUser();
  const [loading, setloading] = useState(false);
  const { id, cod } = useParams();
  const dispatch = useDispatch();
  const addToast = useToast();
  const [tienda, settienda] = useState({});
  const [product, setproduct] = useState({});
  const [success, setsuccess] = useState(false);
  const [seeerrors, setseeerrors] = CVUseStateCallback(false);
  const [isOpen, setisOpen] = useState(false);
  const [size, setsize] = useState({});
  const [quote, setquote] = useState({
    unidad: '',
    cantidad: 0,
    details: '',
    time: 0,
    other: false,
    store_id: id,
    fotos: []
  });
  const sending = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Solucione o corrija los errores en rojo'
      });
      return false;
    }
    if (!CVValidLogin(dispatch)) return false;
    setloading(true);
    const addQuotation = await quotations_save({
      user_id: us.user_id,
      product_id: cod,
      quantity: Math.trunc(quote.cantidad),
      measure_unit: quote.unidad,
      delivery_time: Math.trunc(quote.time),
      message: quote.details,
      file: quote.fotos.toString(),
      other_stores: Boolean(quote.other)
    });
    if (addQuotation && addQuotation.message.includes('Archivo')) {
      CVAlertError({
        addToast,
        message: 'El campo archivo es necesario.'
      });
    } else {
      CVAlertSuccess({
        addToast,
        message: 'Cotización enviada.'
      });
    }
    setloading(false);
    setsuccess(true);
  };

  const senddata = async () => {
    !seeerrors ? setseeerrors(true, sending) : sending();
  };

  const initdata = async () => {
    const [width, height, attr] = IMAGESIZE['STORE_REPORT'].split(',');
    setsize({ width, height, attr });

    const { company } = await AxiosGQL(`${FIND_COMPANY(id, true, true)}`);
    settienda(company);
    const { productById } = await AxiosGQL(PRODUCT_BY_ID(cod, id));
    setproduct(productById?.product);
  };

  useEffect(() => {
    initdata();
  }, [id, cod]);

  return (
    <>
      <CVBreadcrumb
        backgroundColor='white'
        data={[
          { text: 'inicio', uri: '/' },
          { text: 'Solicitar Cotización', uri: '/' }
        ]}
      />
      <SizeBox />
      <Box mx={150} px={50}>
        <CVPanel height='100%' variant='box'>
          <Box mx={10}>
            <CVText fontSize='1.7rem' fontWeight='bold' color='blue'>
              Solicitar Cotización
            </CVText>

            <CVLine lineHeight='1px' color='gray' />
            <Flex>
              <CVImage
                width='75px'
                height='75px'
                image={tienda.logo}
                variant='avatar'
              />
              <SizeBox width='1rem' />
              <Box pt={7}>
                <CVText color='green' fontWeight='bold' fontSize='1.25rem'>
                  {tienda.comercial_name || tienda.social_razon}
                </CVText>
              </Box>
            </Flex>
            <CVLine lineHeight='1px' color='gray' />
          </Box>

          <SizeBox width='1rem' />

          <Box mx={50}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
                  Producto
                </CVText>
                <SizeBox />
                <Flex width='100%'>
                  <Box>
                    <CVImage
                      width='150px'
                      height='150px'
                      borderRadius='1rem'
                      image={
                        product?.product_detail?.photographs[0] ||
                        'https://via.placeholder.com/150'
                      }
                    />
                  </Box>
                  <Box mx={10}>
                    <CVText color='blue' fontWeight='bold'>
                      {product.product_name}
                    </CVText>
                    <SizeBox />
                    <CVRenderHTML>
                      {product?.product_detail?.detailed_description}
                    </CVRenderHTML>
                  </Box>
                </Flex>
              </Grid>
            </Grid>
            <Box my={5}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6}>
                  <Flex>
                    <CVText>Cantidad</CVText>
                    <Box ml={4}>
                      <CVInput
                        value={quote.cantidad}
                        error={seeerrors && quote.cantidad == ''}
                        onChange={(value) =>
                          setquote({ ...quote, cantidad: value })
                        }
                      />
                    </Box>
                    <Box pl={2}>
                      <CVSelect
                        placeholder='Unidades'
                        onChange={(value) =>
                          setquote({ ...quote, unidad: value })
                        }
                        error={seeerrors && quote.unidad == ''}
                        options={[
                          { text: 'Unidades', value: 'Unidades' },
                          { text: 'Millares', value: 'Millares' },
                          { text: 'Cajas', value: 'Cajas' },
                          { text: 'Docenas', value: 'Docenas' },
                          { text: 'Sacos', value: 'Sacos' }
                        ]}
                        value={quote.unidad}
                      />
                    </Box>
                  </Flex>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Flex>
                    <CVText>Tiempo de entrega requerido</CVText>
                    <Box px={3} width='30%'>
                      <CVInput
                        type='number'
                        value={quote.time}
                        error={seeerrors && quote.time == ''}
                        onChange={(value) =>
                          setquote({ ...quote, time: value })
                        }
                      />
                    </Box>

                    <CVText color='gray'>días</CVText>
                  </Flex>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <SizeBox />
          <Box mx={10}>
            <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
              Mensaje
            </CVText>
            <SizeBox />
            <CVText fontSize='13'>
              Tu solicitud de cotización será más precisa mientras seas lo más
              específico posible. Ingresa otros detalles de tu solicitud como
              especificaciones del producto, dirección de entrega, detalles
              requeridos de facturación, etc.
            </CVText>
            <SizeBox />
            <CVInput
              error={seeerrors && quote.details == ''}
              multiline={true}
              height='100%'
              value={quote.details}
              onChange={(value) => setquote({ ...quote, details: value })}
            />
            {/* <CVTextArea
              content={quote.details}
              setContent={(value) => setquote({ ...quote, details: value })}
              height='100%'
            /> */}
            {seeerrors && quote.details == '' && (
              <CVErrorLabel errorMessage='Describe tu solicitud' />
            )}
            <SizeBox />
            <Flex flexWrap='wrap'>
              {quote.fotos.map((image) => (
                <Box key={v4()} marginRight='1rem' marginBottom='1rem'>
                  <CVImage height='100px' width='100px' image={image} />
                </Box>
              ))}

              {/* <Box key={v4()} marginRight='1rem' marginBottom='1rem'>
                <CVImage
                  height='100px'
                  width='100px'
                  image={
                    'https://covendefiles.s3.amazonaws.com/images/1692295060442'
                  }
                />
              </Box> */}

              <Flex
                onClick={() => setisOpen(true)}
                cursor='pointer'
                align='center'
                // align
              >
                <FiPaperclip fontSize='1.5rem' color='#00ADF6' />
                <CVText fontSize='12' color='skyblue' cursor='pointer'>
                  Adjuntar archivo
                </CVText>
              </Flex>
            </Flex>

            {/* {seeerrors && quote.fotos.length == 0 && (
              <CVText
                color='red'
                fontSize='0.85rem'
                fontWeight='bold'
                className='errores'>
                Adjunte archivo
              </CVText>
            )} */}
            <SizeBox />
            <Flex align='center'>
              <CVText
                color='blue'
                fontSize='1.5rem'
                fontWeight='bold'
                marginRight='15px'>
                Cotizar en otras tiendas
              </CVText>
              <CVRadio
                options={[
                  { value: 'true', text: 'Si' },
                  { value: 'false', text: 'No' }
                ]}
                value={quote.other}
                onChange={(value) => setquote({ ...quote, other: value })}
              />
            </Flex>
            <Center>
              <Box mt={10}>
                <CVText
                  color={COLORS['extraBoldGray']}
                  fontSize='12'
                  marginRight='15px'>
                  Al enviar, aceptas nuestros Términos y Condiciones de servicio
                </CVText>
              </Box>
            </Center>
            <Center mt='7'>
              <Box>
                <CVButton
                  fontSize='1.25rem'
                  onClick={() => senddata()}
                  disabled={loading}
                  isLoading={loading}>
                  Enviar
                </CVButton>
              </Box>
            </Center>
            <SizeBox />
            <Box>
              <Center>
                {success && (
                  <Link to='/buyer/mensajes' style={{ width: '100%' }}>
                    <CVText color='primary' textAlign='center'>
                      Ingresa a Mensajería para revisar el estado de tu
                      solicitud de cotización.
                    </CVText>
                  </Link>
                )}
                <SizeBox />
              </Center>
            </Box>
          </Box>
        </CVPanel>

        {isOpen && (
          <CVInputImage
            onChange={(image) => {
              setquote({ ...quote, fotos: [...quote.fotos, image] });
              setisOpen(false);
            }}
            isOpen={isOpen}
            onClose={() => setisOpen(false)}
            size={size}
            viewMode={0}
          />
        )}
      </Box>
    </>
  );
}

export default PoliticaPrivacidad;
