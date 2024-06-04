import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  Flex,
  Center
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Container } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import imgOfferProtectoresBanner from '@/app/assets/images/offers/offer-protectores-banner.png';
import CVCarrusel from '@/common/CovendeTemplate/CVCarrusel';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { FULL_QUERY_PRODUCTS_STORE } from '@/app/api/graphql/webpublic/products/ProductosPublicService';
import fondostore from '@/app/assets/img/fondostore2.jpg';
import { MyLoader } from '@/common/components/Loaders/MyLoader';
import Ofertas from './Ofertas';
import Productos from './Productos';
import Informacion from './Informacion';
import {
  CVCardProduct,
  CVImage,
  CVRating,
  CVButton
} from '@/common/CovendeTemplate';

import { FIND_COMPANY } from '@/app/api/graphql/webpublic/stores/StoresService';
export const TiendaContent = styled.div`
  margin: auto;
  margin-bottom: 16px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  background-image: linear-gradient(
    135deg,
    #c0ebfb,
    #c0ebfc,
    #c0ebfc 50%,
    #c0ebfb,
    #37a5f4
  );
  box-sizing: border-box;
`;

const mockOfferProduct = [
  {
    banner: {
      background: '#FF5454',
      src: imgOfferProtectoresBanner,
      name: 'Protectores y seguridad'
    }
  }
];

const Store = () => {
  const { id, tab, slug } = useParams();
  const [loading, setloading] = useState();
  const [isHover, setisHover] = useState(false);
  const [products, setproducts] = useState([]);
  const [tabIndex, setTabIndex] = useState();
  const [tienda, settienda] = useState({
    store_name: 'Walkman Import',
    store_lema: 'Tu tienda de compras mayores'
  });
  const tabs = {
    inicio: 0,
    producto: 1,
    oferta: 2,
    informacion: 3
  };

  const initdata = async () => {
    localStorage.setItem(
      'dominio',
      JSON.stringify(window?.location?.hostname || '')
    );

    setloading(true);
    const datatienda = await AxiosGQL(FULL_QUERY_PRODUCTS_STORE(id));
    setproducts(datatienda.productsPublic.productsItemPublic);

    const { company, storeWithCategories } = await AxiosGQL(
      `
      ${FIND_COMPANY(id, true, true)}
      `
    );

    settienda({
      ...company,
      store_lema: 'Tu tienda de compras mayores'
    });
    setloading(false);
  };
  useEffect(() => {
    initdata();
  }, []);

  return (
    <Box>
      {/* <LinksHelp /> */}
      {/* <Box backgroundColor='#FFFFFF' width='100%' padding='10px'>
        <Container>
          <Text color='#004772'>
            <Link to='/'>Inicio</Link> /{' '}
            {tienda?.comercial_name || tienda?.social_razon}
          </Text>
        </Container>
      </Box> */}

      <SizeBox />
      <Container>
        <TiendaContent>
          <CVCarrusel
            navigation={true}
            datalist={[
              <Flex justify='center' align='center'>
                <Text
                  color='white'
                  fontWeight='bold'
                  fontSize={['15px', '25px', '35px', '75px']}
                  padding='1rem'>
                  {tienda?.comercial_name == '-'
                    ? tienda?.social_razon
                    : tienda?.comercial_name}
                </Text>
              </Flex>,
              ...(tienda.sliders || []).map((offerProduct, index) => (
                <CVImage
                  height='210px'
                  width='auto'
                  borderRadius='1rem'
                  key={index}
                  image={offerProduct}
                />
              ))
            ]}
          />
        </TiendaContent>
      </Container>
      <Tabs
        variant='line'
        margin='auto'
        height='100%'
        width='100%'
        padding='1px'
        index={tabIndex}
        tabIndex={tabs[tab]}
        onChange={(e) => setTabIndex(e)}>
        <Container>
          <Box display='flex'>
            <TabList>
              <Box display='flex'>
                <CVImage
                  variant='avatar'
                  width='32px'
                  height='32px'
                  image={tienda.logo}
                  name={tienda.store_name}
                />
                <div style={{ height: '1px', width: '40px' }}></div>
                <Tab>Inicio</Tab>
                <div style={{ height: '1px', width: '60px' }}></div>
                <Tab>Productos</Tab>
                <div style={{ height: '1px', width: '60px' }}></div>
                <Tab>Ofertas</Tab>
                <div style={{ height: '1px', width: '60px' }}></div>
                <Tab>Información</Tab>
              </Box>
            </TabList>
            <Flex width='100%' justifyContent='end'>
              <Text
                cursor='pointer'
                mr='10px'
                onClick={() =>
                  window.open(`/tienda-opinions/${tienda._id}`, '_blank')
                }>
                Valoración
              </Text>
              <CVRating puntuation={tienda.stars || 0} />
            </Flex>
          </Box>
        </Container>
        <SizeBox />
        <Box
          style={{
            // backgroundImage:
            // 'linear-gradient(135deg,#fecae0,#f84e6f,#c70808 50%,#fa6a65,#fbe80d)'
            backgroundImage:
              'linear-gradient(135deg,#C0EBFB,#C0EBFC,#C0EBFC 50%,#C0EBFB,#37A5F4)'
          }}>
          <TabPanels p='2rem'>
            <TabPanel>
              <Container>
                {
                  console.log(
                    'mostrando slider category' + tienda.category_images
                  )

                  /* {JSON.stringify(tienda.category_images)} */
                }
                <SizeBox />
                <Box position='relative'>
                  <CVImage image={tienda?.main_banner || fondostore} />
                </Box>

                <SizeBox />
                <Box
                  display='grid'
                  gridTemplateColumns={`repeat(${loading ? 4 : 5}, 1fr)`}
                  gap='10px'
                  w='100%'
                  position='relative'>
                  {loading ? (
                    Array(10)
                      .fill(0)
                      .map((item, index) => (
                        <Box
                          key={index}
                          background='#fff'
                          boxSizing='border-box'
                          borderRadius='14px'
                          display='flex'>
                          <MyLoader />
                        </Box>
                      ))
                  ) : (
                    <>
                      {products.length > 5 && (
                        <>
                          {/* <Box
                            gridColumnStart='1'
                            gridColumnEnd='4'
                            gridRowStart='2'
                            gridRowEnd='4'
                            position='relative'>
                            <Link to='/ofertas'>
                              {/* <CVImage image={tienda?.secondary_banner} /> */}
                          {/* <Box
                                position='absolute'
                                h='260px'
                                w='315px'
                                top='70px'
                                left='21px'>
                                <Text
                                  fontSize='60px'
                                  color='#fff'
                                  fontWeight='bold'>
                                  Productos en MODA
                                </Text>
                                <Text
                                  color='#fff'
                                  fontSize='40px'
                                  fontWeight='normal'
                                  lineHeight='60px'>
                                  Lo último en moda para ti
                                </Text>
                              </Box> */}
                          {/* <img
                                position='relative'
                                style={{ width: '640px', height: '436px' }}
                                // src='https://covendefiles.s3.amazonaws.com/images/bannerRosa_Cuadra%CC%81tico.png'
                                // src={tienda?.secondary_banner}
                                src={
                                  tienda?.secondary_banner
                                    ? tienda?.secondary_banner
                                    : 'https://covendefiles.s3.amazonaws.com/images/bannerRosa_Cuadra%CC%81tico.png'
                                }
                                alt='BannerRosa'
                              />
                            </Link>
                          </Box>} */}

                          {/* <>
                            {tienda.category_images.map((item) => (
                              <Box
                                key={v4()}
                                w='582px'
                                h='213px'
                                gridColumnStart='4'
                                gridColumnEnd='6'
                                gridRowStart='2'
                                gridRowEnd='3'
                                ml='-100px'>
                                <Link to='/ofertas'>
                                  <img
                                    style={{ borderRadius: '12px' }}
                                    src={item}
                                    alt='BannerYellow'
                                  />
                                </Link>
                              </Box>
                            ))}
                          </> */}
                          {/* <Box
                            w='582px'
                            h='213px'
                            gridColumnStart='4'
                            gridColumnEnd='6'
                            gridRowStart='2'
                            gridRowEnd='3'
                            ml='-100px'>
                            <Link to='/ofertas'>
                              <img
                                style={{ borderRadius: '12px' }}
                                // src='https://covendefiles.s3.amazonaws.com/images/BannerYellowWithLetters.png'
                                src={
                                  tienda.category_images[0]
                                    ? tienda.category_images[0]
                                    : 'https://covendefiles.s3.amazonaws.com/images/BannerYellowWithLetters.png'
                                }
                                alt='BannerYellow'
                              />
                            </Link>
                          </Box>
                          <Box
                            w='582px'
                            h='213px'
                            gridColumnStart='4'
                            gridColumnEnd='6'
                            gridRowStart='3'
                            gridRowEnd='4'
                            ml='-100px'>
                            <Link to='/ofertas'>
                              <img
                                style={{ borderRadius: '12px' }}
                                src={
                                  tienda.category_images[1]
                                    ? tienda.category_images[1]
                                    : 'https://covendefiles.s3.amazonaws.com/images/BannerYellowWithLetters.png'
                                }
                                alt='BannerYellow'
                              />
                            </Link>
                          </Box> */}

                          {products.map((item) => (
                            <CVCardProduct
                              key={v4()}
                              product_id={item?.product_id}
                              product_photo={item?.product_photo || ''}
                              precio={item?.precio}
                              product_name={item?.product_name}
                              precio_minimo={item?.precio_minimo}
                              precio_maximo={item?.precio_maximo}
                              offer={item?.offer}
                              percentage_oferta={item?.percentage_oferta}
                              offer_type={item?.offer_type}
                              offer_value={item?.offer_value}
                              puntuacion={item.stars}
                              product_slug={item.product_slug}
                              pedido_minimo={item?.pedido_minimo || 1}
                              item={item}
                            />
                          ))}
                        </>
                        // <Box>
                        //   <Box
                        //     gridColumnStart='1'
                        //     gridColumnEnd='4'
                        //     gridRowStart='2'
                        //     gridRowEnd='4'
                        //     position='relative'>
                        //     <Link to='/ofertas'>
                        //       <Box
                        //         position='absolute'
                        //         h='260px'
                        //         w='315px'
                        //         top='70px'
                        //         left='21px'>
                        //         <Text
                        //           fontSize='60px'
                        //           color='#fff'
                        //           fontWeight='bold'>
                        //           Productos en MODA
                        //         </Text>
                        //         <Text
                        //           color='#fff'
                        //           fontSize='40px'
                        //           fontWeight='normal'
                        //           lineHeight='60px'>
                        //           Lo último en moda para ti
                        //         </Text>
                        //       </Box>
                        //       <img
                        //         position='relative'
                        //         style={{ width: '640px', height: '436px' }}
                        //         src='https://covendefiles.s3.amazonaws.com/images/bannerRosa_Cuadra%CC%81tico.png'
                        //         alt='BannerRosa'
                        //       />
                        //     </Link>
                        //   </Box>
                        //   <Box
                        //     w='582px'
                        //     h='213px'
                        //     gridColumnStart='4'
                        //     gridColumnEnd='6'
                        //     gridRowStart='2'
                        //     gridRowEnd='3'
                        //     ml='-100px'>
                        //     <Link to='/ofertas'>
                        //       <img
                        //         style={{ borderRadius: '12px' }}
                        //         src='https://covendefiles.s3.amazonaws.com/images/BannerYellowWithLetters.png'
                        //         alt='BannerYellow'
                        //       />
                        //     </Link>
                        //   </Box>
                        //   <Box
                        //     w='582px'
                        //     h='213px'
                        //     gridColumnStart='4'
                        //     gridColumnEnd='6'
                        //     gridRowStart='3'
                        //     gridRowEnd='4'
                        //     ml='-100px'>
                        //     <Link to='/ofertas'>
                        //       <img
                        //         style={{ borderRadius: '12px' }}
                        //         src='https://covendefiles.s3.amazonaws.com/images/BannerYellowWithLetters.png'
                        //         alt='BannerYellow'
                        //       />
                        //     </Link>
                        //   </Box>
                        // </Box>
                      )}

                      {products.map((item) => (
                        <CVCardProduct
                          key={v4()}
                          product_id={item?.product_id}
                          product_photo={item?.product_photo || ''}
                          precio={item?.precio}
                          product_name={item?.product_name}
                          precio_minimo={item?.precio_minimo}
                          precio_maximo={item?.precio_maximo}
                          offer={item?.offer}
                          percentage_oferta={item?.percentage_oferta}
                          offer_type={item?.offer_type}
                          offer_value={item?.offer_value}
                          puntuacion={item.stars}
                          product_slug={item.product_slug}
                          pedido_minimo={item?.pedido_minimo || 1}
                          item={item}
                        />
                      ))}
                    </>
                  )}
                </Box>
                <Center mt='28px'>
                  <CVButton
                    fontSize='14px'
                    fontWeight='normal'
                    onHover={(hover) => setisHover(hover)}
                    padding='0 3rem'
                    boxShadow='none'
                    color='white'
                    backgroundColor='blue'
                    onClick={() => setTabIndex(1)}
                    width='160px'>
                    &nbsp;&nbsp; VER TODO&nbsp;&nbsp;
                  </CVButton>
                </Center>
                <SizeBox />
              </Container>
            </TabPanel>
            <TabPanel>
              <Productos codTienda={id} />
            </TabPanel>
            <TabPanel>
              <Ofertas codTienda={id} />
            </TabPanel>
            <TabPanel>
              <Informacion tienda={tienda} />
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Box>
  );
};
export default Store;
