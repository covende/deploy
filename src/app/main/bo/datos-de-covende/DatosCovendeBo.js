import React, { useEffect, useState } from 'react';

// UI Components
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  Flex,
  useToast,
  useDisclosure
} from '@chakra-ui/react';

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { DatosCovendeBoContainer } from './DatosCovendeBo.styles';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { FcEditImage } from 'react-icons/fc';
import {
  GET_APP_DATA,
  UPDATE_APP_DATA
} from '@CVApi/core/webbo/CovendeData/datosCovende';
import CVButton from '@CVTemplate/core/CVButton';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import InputData from './components/InputData';
import CVInputImageGallery from '@CVTemplate/core/CVInputImageGallery';
import CVImage from '@CVTemplate/core/CVImage';
import CVInputImage from '@CVTemplate/core/CVInputImage';
import { IMAGESIZE } from '@CVTemplate/core/CVThemes';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Assets

function DatosCovendeBo(props) {
  const initialValue = { value: '', isValid: null };
  const [_id, set_id] = useState('');
  const [company_name, setCompany_name] = useState(initialValue);
  const [social_razon, setSocial_razon] = useState(initialValue);
  const [logo, setLogo] = useState(initialValue);
  const [fiscal_address, setFiscal_address] = useState(initialValue);
  const [commercial_address, setCommercial_address] = useState(initialValue);
  const [ruc, setRuc] = useState(initialValue);
  const [phone, setPhone] = useState(initialValue);
  const [email, setEmail] = useState(initialValue);
  const [facebook, setFacebook] = useState(initialValue);
  const [instagram, setInstagram] = useState(initialValue);
  const [twitter, setTwitter] = useState(initialValue);
  const [site_title, setSite_title] = useState(initialValue);
  const [short_description, setShort_description] = useState(initialValue);
  const [favicon, setFavicon] = useState(initialValue);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setsize] = useState({});
  const [title, setTitle] = useState(null);
  const CovendeDataPermisions = useGetPermisions(
    'Backoffice',
    'Datos de Covende'
  );

  const addToast = useToast();

  useEffect(() => {
    const [width, height, attr] = IMAGESIZE['LOGO_GALLERY'].split(',');
    setsize({ width, height, attr });
  }, []);

  useEffect(() => {
    AxiosGQL(GET_APP_DATA())
      .then(({ getAppData }) => {
        setCompany_name({ ...company_name, value: getAppData.company_name });
        setSocial_razon({ ...social_razon, value: getAppData.social_razon });
        setLogo({ ...logo, value: getAppData.logo });
        setFiscal_address({
          ...fiscal_address,
          value: getAppData.fiscal_address
        });
        setCommercial_address({
          ...commercial_address,
          value: getAppData.commercial_address
        });
        setRuc({ ...ruc, value: getAppData.ruc });
        setPhone({ ...phone, value: getAppData.phone });
        setEmail({ ...email, value: getAppData.email });
        setFacebook({ ...facebook, value: getAppData?.social_media?.facebook });
        setInstagram({
          ...instagram,
          value: getAppData?.social_media?.instagram
        });
        setTwitter({ ...twitter, value: getAppData?.social_media?.twitter });
        setSite_title({ ...site_title, value: getAppData.site_title });
        setShort_description({
          ...short_description,
          value: getAppData.short_description
        });
        setFavicon({ ...favicon, value: getAppData.favicon });
        set_id(getAppData._id);
      })
      .catch((err) => console.error(err));
  }, []);

  const valid = () => {
    if (
      company_name.isValid == false ||
      social_razon.isValid == false ||
      logo.isValid == false ||
      fiscal_address.isValid == false ||
      commercial_address.isValid == false ||
      ruc.isValid == false ||
      phone.isValid == false ||
      email.isValid == false ||
      facebook.isValid == false ||
      instagram.isValid == false ||
      twitter.isValid == false ||
      site_title.isValid == false ||
      short_description.isValid == false ||
      favicon.isValid == false
    ) {
      AxiosGQL(
        UPDATE_APP_DATA({
          company_name: company_name.value,
          social_razon: social_razon.value,
          logo: logo.value,
          fiscal_address: fiscal_address.value,
          commercial_address: commercial_address.value,
          ruc: ruc.value,
          phone: phone.value,
          email: email.value,
          facebook: facebook.value,
          instagram: instagram.value,
          twitter: twitter.value,
          site_title: site_title.value,
          short_description: short_description.value,
          favicon: favicon.value,
          _id: _id
        })
      )
        .then(({ updateAppData }) => {
          if (updateAppData) {
            CVAlertSuccess({
              addToast,
              message: `Los datos de ${updateAppData.company_name} fueron modificados`
            });
          }
        })
        .catch((err) => {
          if (err) {
            CVAlertError({
              addToast,
              message:
                'Estamos teniendo problemas, por favor inténtalo más tarde.'
            });
          }
        });
    } else {
      CVAlertError({
        addToast,
        message: 'Corrija los errores o edita algún campo.'
      });
    }
  };
  return (
    <DatosCovendeBoContainer>
      <Heading mb='16px'>Datos de Covende</Heading>
      <Grid
        templateRows='repeat(2, max-content)'
        gap='16px'
        padding='24px'
        width='100%'
        height='auto'
        backgroundColor='white'
        borderRadius='12px'>
        <GridItem width='100%'>
          <Heading size='sm'>General</Heading>
          <Divider mb='16px' />
          <Grid
            templateColumns='repeat(2, calc(50% - 8px))'
            gap='16px'
            justifyContent='space-between'>
            <GridItem>
              <InputData
                label='Nombre de la empresa'
                placeholder='Nombre de la empresa'
                value={company_name}
                setValue={setCompany_name}
              />

              <InputData
                label='Razón Social'
                placeholder='Razón Social'
                value={social_razon}
                setValue={setSocial_razon}
              />

              <Text variant='primary'>Logo</Text>
              <Box
                position='relative'
                w='10%'
                onClick={() => {
                  setTitle('logo');
                  onOpen();
                }}>
                <CVImage width={'110px'} image={logo.value} />
                <Box
                  zIndex={logo.value == '' ? 2 : -1}
                  position='absolute'
                  onClick={() => {
                    setTitle('logo');
                    onOpen();
                  }}
                  top='0'
                  left='0'
                  padding='0.25rem'>
                  <FcEditImage fontSize='8rem' />
                </Box>
                {logo.isValid && (
                  <Text color='red' fontSize='8px'>
                    Campo requerido*
                  </Text>
                )}
              </Box>
            </GridItem>

            <GridItem>
              <InputData
                label='Dirección fiscal'
                placeholder='Dirección fiscal'
                value={fiscal_address}
                setValue={setFiscal_address}
              />

              <InputData
                label='Dirección comercial'
                placeholder='Dirección comercial'
                value={commercial_address}
                setValue={setCommercial_address}
              />

              <InputData
                label='RUC'
                placeholder='Tu RUC'
                value={ruc}
                setValue={setRuc}
              />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          <Grid
            templateColumns='repeat(2, calc(50% - 8px))'
            gap='16px'
            justifyContent='space-between'>
            <GridItem>
              <Heading size='sm'>Datos de contacto</Heading>
              <Divider mb='16px' />

              <InputData
                label='Teléfono'
                placeholder='Teléfono'
                value={phone}
                setValue={setPhone}
              />

              <InputData
                label='Email'
                placeholder='Email'
                value={email}
                setValue={setEmail}
              />

              <Text variant='primary'>Redes Sociales</Text>
              <InputGroup>
                <InputLeftElement
                  w='31px'
                  h='31px'
                  pointerEvents='none'
                  children={<FaFacebook color='#00ADF6' />}
                />
                <Input
                  value={facebook.value}
                  onChange={(e) =>
                    setFacebook({
                      ...facebook,
                      value: e.target.value,
                      isValid: e.target.value == '' ? true : false
                    })
                  }
                  variant='outline'
                  isInvalid={facebook.isValid}
                  placeholder='https:/www.facebook.com/CoVendeShop'
                  size='sm'
                  width='325px'
                />
                {facebook.isValid && (
                  <Text color='red' fontSize='8px'>
                    Campo requerido*
                  </Text>
                )}
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  w='31px'
                  h='31px'
                  pointerEvents='none'
                  children={<FaInstagram color='#00ADF6' />}
                />
                <Input
                  value={instagram.value}
                  onChange={(e) =>
                    setInstagram({
                      ...instagram,
                      value: e.target.value,
                      isValid: e.target.value == '' ? true : false
                    })
                  }
                  variant='outline'
                  isInvalid={instagram.isValid}
                  placeholder='https:/www.instagram.com/CoVendeShop'
                  size='sm'
                  width='325px'
                />
                {instagram.isValid && (
                  <Text color='red' fontSize='8px'>
                    Campo requerido*
                  </Text>
                )}
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  w='31px'
                  h='31px'
                  children={<FaTwitter color='#00ADF6' />}
                />
                <Input
                  value={twitter.value}
                  onChange={(e) =>
                    setTwitter({
                      ...twitter,
                      value: e.target.value,
                      isValid: e.target.value == '' ? true : false
                    })
                  }
                  variant='outline'
                  isInvalid={twitter.isValid}
                  placeholder='https:/www.twitter.com/CoVendeShop'
                  size='sm'
                  width='325px'
                />
                {twitter.isValid && (
                  <Text color='red' fontSize='8px'>
                    Campo requerido*
                  </Text>
                )}
              </InputGroup>
            </GridItem>
            <GridItem>
              <Heading size='sm'>Datos del sitio</Heading>
              <Divider mb='16px' />

              <InputData
                label='Título del sitio'
                placeholder='Título del sitio'
                value={site_title}
                setValue={setSite_title}
              />

              <Text variant='primary'>Descripción corta</Text>
              <Textarea
                value={short_description.value}
                onChange={(e) =>
                  setShort_description({
                    ...short_description,
                    value: e.target.value,
                    isValid: e.target.value == '' ? true : false
                  })
                }
                isInvalid={short_description.isValid}
                placeholder='Descripción corta'
              />
              {short_description.isValid && (
                <Text color='red' fontSize='8px'>
                  Campo requerido*
                </Text>
              )}

              <Text variant='primary'>Favicon</Text>
              <Box position='relative' w='10%' onClick={() => onOpen()}>
                <CVImage width={'110px'} image={favicon.value} />
                <Box
                  zIndex={favicon.value == '' ? 2 : -1}
                  position='absolute'
                  onClick={() => onOpen()}
                  top='0'
                  left='0'
                  padding='0.25rem'>
                  <FcEditImage fontSize='8rem' />
                </Box>
                {favicon.isValid && (
                  <Text color='red' fontSize='8px'>
                    Campo requerido*
                  </Text>
                )}
              </Box>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
      <Flex justify='center'>
        {CovendeDataPermisions.editar && (
          <CVButton width='114' onClick={valid}>
            Guardar
          </CVButton>
        )}
      </Flex>
      {isOpen && (
        <CVInputImage
          size={size}
          onChange={(img) => {
            if (title === 'logo') {
              setLogo({
                ...logo,
                value: img,
                isValid: img != '' ? false : true
              });
            } else {
              setFavicon({
                ...favicon,
                value: img,
                isValid: img != '' ? false : true
              });
            }
            onClose();
          }}
          isOpen={isOpen}
          onClose={() => onClose()}
        />
      )}
    </DatosCovendeBoContainer>
  );
}

export default DatosCovendeBo;
