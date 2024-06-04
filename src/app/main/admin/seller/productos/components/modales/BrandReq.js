import {
  ADD_BRAND_REQUEST,
  addBrandRequest
} from '@/app/api/graphql/webpublic/createstore/BrandService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

import noimage from '@/app/assets/img/noimage.png';

import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CVButton,
  CVImage,
  CVInput,
  CVInputFile,
  CVInputImage,
  CVSwitch
} from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { tienda } from '../../redux/ProductUpdate';
import { useToast } from '@chakra-ui/toast';

function BrandReq({ onClose, isOpen }) {
  const addToast = useToast();
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const [web, setWeb] = useState('');
  const [reqbrand, setReqbrand] = useState({
    store_id: '',
    owner_type: 'BRAND_HOLDER',
    name: '',
    description: '',
    patented_brand: true,
    registration_or_permission_pdf: '',
    logo: '',
    place: 'BODEGAS',
    place_links: ''
  });

  const validate = () => {
    if (reqbrand.name == '') {
      CVAlertError({ addToast, message: 'Nombre es obligatorio' });
      return false;
    }
    if (reqbrand.description == '') {
      CVAlertError({ addToast, message: 'Describe la marca' });
      return false;
    }
    if (
      reqbrand.patented_brand == 'si' &&
      reqbrand.registration_or_permission_pdf == ''
    ) {
      CVAlertError({
        addToast,
        message: 'Documento de registro es obligatorio'
      });
      return false;
    }
    if (reqbrand.logo == '') {
      CVAlertError({ addToast, message: 'Sube una imagen' });
      return false;
    }
    if (reqbrand.place == 'ONLINE' && reqbrand.place_links == '') {
      CVAlertError({ addToast, message: 'Si se vende Online, ponga la URL' });
      return false;
    }
    return true;
  };

  const savebrand = async () => {
    if (validate()) {
      setLoading(true);
      const store_id = await tienda(dispatch, product);
      const res = await addBrandRequest({
        ...reqbrand,
        store_id,
        place_links: reqbrand.place == 'ONLINE' ? reqbrand.place_links : ''
      });
      const { message, status } = res;
      setLoading(false);
      if (status) {
        CVAlertSuccess({ addToast, message });
        onClose();
      } else {
        CVAlertError({ addToast, message });
      }
    }
  };

  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState(false);
  const [size, setSize] = useState({ height: 240, width: 240, attr: 'image' });
  const initdata = () => {
    let [width, height, attr] = IMAGESIZE['BRANDREQUEST'].split(',');
    setSize({ height, width, attr });
  };
  const setimage = (img) => {
    setReqbrand({ ...reqbrand, logo: img });
    setCrop(!crop);
  };
  useEffect(() => {
    initdata();
  }, []);
  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent maxWidth='800px'>
        <ModalHeader style={{ backgroundColor: '#00ADF6' }}>
          <Text fontSize='1.2rem' fontWeight='bold' color='#FFFFFF'>
            Solicitud de Creación de Marca
          </Text>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody maxWidth='800px'>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Text align='right'>Soy:</Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVRadio
                value={reqbrand.owner_type}
                onChange={(value) =>
                  setReqbrand({ ...reqbrand, owner_type: value })
                }
                options={[
                  { value: 'BRAND_HOLDER', text: 'Titular de marca' },
                  { value: 'DISTRIBUTOR', text: 'Distribuidor' }
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Text align='right'>Nombre de la marca:</Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVInput
                placeholder='Ingrese el nombre de la marca'
                value={reqbrand.name}
                onChange={(value) => setReqbrand({ ...reqbrand, name: value })}
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <Text align='right'>Descripción:</Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVInput
                height='100%'
                placeholder='Ingresa la lista de productos que comercializa la marca'
                style={{ minHeight: '50px' }}
                multiline={true}
                value={reqbrand.description}
                onChange={(value) =>
                  setReqbrand({ ...reqbrand, description: value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={5}>
              <Text align='right'>¿La marca está patentada en INDECOPI?</Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVSwitch
                variant='option'
                yesColor='primary'
                value={reqbrand.patented_brand}
                onChange={(value) =>
                  setReqbrand({
                    ...reqbrand,
                    patented_brand: value
                  })
                }
              />
            </Grid>

            {/* {reqbrand.patented_brand == 'si' ? (
              <> */}
            <Grid item xs={12} sm={5}>
              <Text align='right'>
                Adjunta el Registro de Marca o permiso de comercialización:
              </Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVInputFile
                callback={(res) =>
                  setReqbrand({
                    ...reqbrand,
                    registration_or_permission_pdf: res.data
                  })
                }>
                Elegir archivo
              </CVInputFile>
              <Typography variant='caption'>
                PDF, JPG, JPEG, PNG {'<'} 10 mb{' '}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Text align='right'>Sube fotos del logo de la marca:</Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVButton
                onClick={() => setCrop(!crop)}
                variant='outlined'
                height='100px'
                width='100px'
                borderRadius='0.5rem'
                padding='0'>
                <div style={{ height: '75px', width: '75px' }}>
                  {reqbrand.logo != '' ? (
                    <CVImage image={reqbrand.logo} height='75px' width='75px' />
                  ) : (
                    <CVImage image={noimage} height='75px' width='75px' />
                  )}
                </div>
              </CVButton>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Text align='right'>
                ¿Donde se venden los productos de esta marca?
              </Text>
            </Grid>
            <Grid item xs={12} sm={7}>
              <CVRadio
                value={reqbrand.place}
                onChange={(value) => setReqbrand({ ...reqbrand, place: value })}
                options={[
                  { value: 'BODEGAS', text: 'Bodegas' },
                  { value: 'SUPERMERCADOS', text: 'Supermercados' },
                  { value: 'ONLINE', text: 'Venta Online' }
                ]}
              />

              {reqbrand.place == 'ONLINE' && (
                <Box>
                  <CVInput
                    value={reqbrand.place_links}
                    onChange={(value) =>
                      setReqbrand({ ...reqbrand, place_links: value })
                    }
                  />
                  <i>
                    <Typography variant='caption'>
                      Ingrese el link de las tiendas online donde se venden los
                      productos de esta marca, separadas por comas.
                    </Typography>
                  </i>
                </Box>
              )}
            </Grid>
          </Grid>

          <CVInputImage
            size={size}
            isOpen={crop}
            onClose={() => setCrop(!crop)}
            callback={setimage}
            viewMode={0}
          />
        </ModalBody>
        <ModalFooter>
          <CVButton isLoading={loading} onClick={savebrand}>
            Enviar
          </CVButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default BrandReq;
