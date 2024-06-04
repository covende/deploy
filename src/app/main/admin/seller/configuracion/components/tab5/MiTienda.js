import React, { useEffect, useState } from 'react';
import {
  CVButton,
  CVImage,
  CVInput,
  CVInputImage,
  CVText
} from '@/common/CovendeTemplate';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { COLORS, IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { Flex, Text, Box } from '@chakra-ui/react';
import slugify from 'slugify';

import { Container, Grid } from '@material-ui/core';
import { useToast } from '@chakra-ui/toast';
import {
  updateStoreData,
  validateUrlByCompany
} from '@/app/api/graphql/webbo/BClientService';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ContactSupportOutlined } from '@/../node_modules/@material-ui/icons/index';
import { Link } from 'react-router-dom';
const staticfile = (
  <svg
    width='59'
    height='57'
    viewBox='0 0 59 57'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path d='M58.8565 0H0V56.8957H58.8565V0Z' fill='#EFEFEF' />
    <path
      d='M48.1089 43.2343H10.7363V19.8662H48.1089V43.2343ZM12.8273 41.1493H46.0283V21.9513H12.8273V41.1493Z'
      fill='white'
    />
    <path
      d='M29.4257 39.9974C24.6283 39.9974 20.7227 36.2078 20.7227 31.5529C20.7227 26.898 24.6283 23.1084 29.4257 23.1084C34.2231 23.1084 38.1287 26.898 38.1287 31.5529C38.1287 36.2078 34.2231 39.9974 29.4257 39.9974ZM29.4257 25.1882C25.7755 25.1882 22.8085 28.0396 22.8085 31.5477C22.8085 35.0558 25.7755 37.9071 29.4257 37.9071C33.0759 37.9071 36.0429 35.0558 36.0429 31.5477C36.0429 28.0396 33.0759 25.1882 29.4257 25.1882Z'
      fill='white'
    />
    <path
      d='M45.835 21.9509H32.9707V13.668H45.835V21.9509ZM35.0565 19.8658H43.7491V15.753H35.0565V19.8658Z'
      fill='white'
    />
  </svg>
);

function MiTienda({ companyData, permisions, storeID }) {
  const [size, setSize] = useState({});
  const [crop, setCrop] = useState(false);
  const [index, setIndex] = useState(0);
  const [urlAvailable, setUrlAvailable] = useState(null);
  const [param, setparam] = useState('image');
  const [store, setStore] = useState({
    logo: companyData.logo || '',
    url: (companyData.url != 'null' && companyData.url) || '',
    description:
      (companyData.company_description != 'null' &&
        companyData.company_description) ||
      '',
    banner: companyData.main_banner || '',
    secondbaneer: companyData.secondary_banner || '',
    categoriamage: !companyData.category_images
      ? []
      : companyData.category_images,
    slider: !companyData.sliders ? [] : companyData.sliders
  });

  const addToast = useToast();

  const setParametersStore = async () => {
    const data = {
      company_id: companyData._id,
      logo: store.logo || '',
      url: store.url || '',
      company_description: store.description,
      main_banner: !store.banner || store.banner == 'null' ? '' : store.banner,
      secondary_banner:
        !store.secondbaneer || store.secondbaneer == 'null'
          ? ''
          : store.secondbaneer,
      sliders: store.slider || [],
      category_images: store.categoriamage || []
    };
    const result = await updateStoreData(data);
    // const result = await AxiosGQL(UPDATE_STORE_DATA(store, companyData));
    // console.log(result);
    if (result.editCompany != null) {
      CVAlertSuccess({ addToast, message: 'Datos guardados' });
    }
  };

  const initdata = async () => {
    let s_logo = IMAGESIZE['STORE_LOGO'].split(',');
    let s_slider = IMAGESIZE['STORE_SLIDER'].split(',');
    let s_banner = IMAGESIZE['STORE_BANNER'].split(',');
    let s_secon_banner = IMAGESIZE['STORE_SECOND_BANNER'].split(',');
    let s_category = IMAGESIZE['STORE_CATEGORY'].split(',');

    setSize({
      logo: { width: s_logo[0], height: s_logo[1], attr: s_logo[2] },
      slider: { width: s_slider[0], height: s_slider[1], attr: s_slider[2] },
      banner: { width: s_banner[0], height: s_banner[1], attr: s_banner[2] },
      secondbaneer: {
        width: s_secon_banner[0],
        height: s_secon_banner[1],
        attr: s_secon_banner[2]
      },
      categoriamage: {
        width: s_category[0],
        height: s_category[1],
        attr: s_category[2]
      }
    });
  };

  const setimage = (img) => {
    let sto = { ...store };
    if (param == 'categoriamage' || param == 'slider') {
      param == 'categoriamage'
        ? (sto.categoriamage[index] = img)
        : (sto.slider[index] = img);
    } else {
      sto = {
        ...store,
        [param]: img
      };
    }

    setStore(sto);
    setCrop(!crop);
  };

  const loadimage = (params, i = 0) => {
    setIndex(i);
    setparam(params);
    setCrop(!crop);
  };

  const testUrlAvailable = async (url) => {
    const available = await validateUrlByCompany({
      url,
      company_id: companyData._id
    });
    setUrlAvailable(available);
  };

  useEffect(() => {
    initdata();
  }, []);

  const ImageModal = ({ param }) => (
    <Box cursor='pointer' onClick={() => loadimage(param)}>
      {store[param] && store[param] != 'null' ? (
        <CVImage height='100px' width='auto' image={store[param]} />
      ) : (
        staticfile
      )}
    </Box>
  );

  return (
    <Box>
      <CVText fontSize='2rem' fontWeight='bold' color='primary'>
        Mi tienda en covende
      </CVText>
      <CVText>personaliza los datos e imágenes de tu tienda.</CVText>
      <SizeBox />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>Logo</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={4}>
            <ImageModal param='logo' />
          </Grid>

          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>URL</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={4}>
            <Flex align='center'>
              <CVInput
                title='URL'
                value={store.url}
                onChange={(value) => {
                  setStore({ ...store, url: value });
                  if (value != '' && value.length > 3) testUrlAvailable(value);
                  else setUrlAvailable(null);
                }}
                placeholder='Mi Tienda'
              />
              <span style={{ color: COLORS.mediumGray, marginLeft: '5px' }}>
                .covende.com
              </span>
            </Flex>
            {urlAvailable !== null ? (
              urlAvailable ? (
                <Text color='#17BF93'>Nombre disponible</Text>
              ) : (
                <CVText color='red'>El nombre no está disponible</CVText>
              )
            ) : (
              ''
            )}
            <SizeBox />

            <CVButton>
              <Link
                to={'/tienda/' + storeID + '/' + companyData.comercial_name}>
                <Flex alignItems='center'>
                  <Text> Ver mi tienda </Text>
                </Flex>
              </Link>
            </CVButton>
            {/* 
          
            {/* <CVButton onclick > Ver mi tienda </CVButton> */}
          </Grid>

          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>Descripcion de la empresa</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={10}>
            <CVInput
              height='100%'
              value={store?.description || ''}
              onChange={(value) =>
                setStore({
                  ...store,
                  description: value
                })
              }
              multiline={true}
            />
            <SizeBox />
          </Grid>

          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>Sliders</CVText>
            <CVText color='gray'>sliders principales(carrusel)</CVText>
            <CVText color='gray'>1246x215px</CVText>
            <CVText color='gray'>Peso Max 1MB</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={4}>
            <Flex>
              <Box cursor='pointer' onClick={() => loadimage('slider', 0)}>
                {store.slider && store.slider[0] ? (
                  <CVImage
                    height='100px'
                    width='auto'
                    image={store.slider[0]}
                  />
                ) : (
                  staticfile
                )}
              </Box>
              <SizeBox />
              <Box cursor='pointer' onClick={() => loadimage('slider', 1)}>
                {store.slider && store.slider[1] ? (
                  <CVImage
                    height='100px'
                    width='auto'
                    image={store.slider[1]}
                  />
                ) : (
                  staticfile
                )}
              </Box>
            </Flex>
          </Grid>

          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>Banner principal</CVText>
            <CVText color='gray'>Banner superior </CVText>
            <CVText color='gray'>1200x470px</CVText>
            <CVText color='gray'>Peso Max 2MB</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={4}>
            <ImageModal param='banner' />
          </Grid>

          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>Imàgenes de categorìas</CVText>
            <CVText color='gray'>Banner inferior derecho</CVText>
            <CVText color='gray'>582x213px</CVText>
            <CVText color='gray'>Peso Max 1MB</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={4}>
            <Flex>
              <Box
                cursor='pointer'
                onClick={() => loadimage('categoriamage', 0)}>
                {store.categoriamage && store.categoriamage[0] ? (
                  <CVImage
                    height='100px'
                    width='auto'
                    image={store.categoriamage[0]}
                  />
                ) : (
                  staticfile
                )}
              </Box>
              <SizeBox />
              <Box
                cursor='pointer'
                onClick={() => loadimage('categoriamage', 1)}>
                {store.categoriamage && store.categoriamage[1] ? (
                  <CVImage
                    height='100px'
                    width='auto'
                    image={store.categoriamage[1]}
                  />
                ) : (
                  staticfile
                )}
              </Box>
            </Flex>
          </Grid>
          <Grid item xs={5} sm={4} md={2}>
            <CVText color='blue'>Banner secundario</CVText>
            <CVText color='gray'> Banner inferior izquierdo</CVText>
            <CVText color='gray'>640x436px</CVText>
            <CVText color='gray'>Peso Max 1MB</CVText>
          </Grid>
          <Grid item xs={7} sm={8} md={4}>
            <ImageModal param='secondbaneer' />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Flex justifyContent='center'>
              <Box>
                {permisions.editar && (
                  <CVButton
                    tabIndex='1'
                    variant='outlined'
                    onClick={() =>
                      urlAvailable !== null
                        ? urlAvailable
                          ? setParametersStore()
                          : CVAlertError({
                              addToast,
                              message: 'corrija la url o no ponga nada'
                            })
                        : setParametersStore()
                    }>
                    Guardar
                  </CVButton>
                )}
              </Box>
            </Flex>
          </Grid>
        </Grid>
        {crop && (
          <CVInputImage
            size={size[param]}
            isOpen={crop}
            onClose={() => setCrop(!crop)}
            callback={setimage}
          />
        )}
      </Container>
    </Box>
  );
}

export default MiTienda;
