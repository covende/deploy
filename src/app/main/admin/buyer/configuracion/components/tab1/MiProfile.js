import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  CVImage,
  CVInput,
  CVInputImage,
  CVButton,
  CVModal
} from '@/common/CovendeTemplate';
import { COLORS, IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import * as User from '@/app/helpers/authUtils';
import { Stack, Text, useDisclosure, Flex, Box } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  USER_BY_ID,
  USER_UPDATE,
  USER_UPDATE_TOKEN
} from '@/app/api/graphql/webpublic/userData/UserService';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { DOCUMENT_TYPE_LIST } from '@CVApi/core/webpublic/createstore/CreateStoreService';
import { user } from '@/app/configs/niubizConfig';
import CVInputDNI from '@CVTemplate/core/CVInputDNI';
import { CVSelect, CVText } from '@CVTemplate/core/index';
import { iconsLock } from '../../ConfigurationIcons';
import useGetPermisions from '@/common/hooks/useGetPermisions';
import ModalChangePassword from '@CVPages/core/admin/seller/configuracion/components/tab1/ModalChangePassword';
import { useDispatch } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';
import CVInputDNIConfig from '@CVTemplate/core/CVInputDNIConfig';

function MiProfile({}) {
  const [tipodoc, setTipodoc] = useState(0);
  let us = User.getLoggedInUser();
  const [loading, setLoading] = useState(false);
  const addToast = useToast();
  const dispatch = useDispatch();
  const [docs, setDocs] = useState([]);
  const [validatedDNI, setValidatedDNI] = useState('');
  const { crear, editar, eliminar, ver } = useGetPermisions(
    'Comprar',
    'Configuración'
  );
  const [changePassword, setChangePassword] = useState(false);
  const [profile, setProfile] = useState({
    user_id: us.user_id,
    first_name: us.first_name,
    last_name: us.last_name,
    email: us.email,
    role: us.role,
    phone: '',
    dni: '',
    image: '',
    tipodoc: '',
    inWhatapp: true
  });

  const saveImage = async (img) => {
    let { editUserByToken } = await AxiosGQL(USER_UPDATE_TOKEN({ image: img }));

    if (editUserByToken?.status) {
      User.setToken(editUserByToken.newToken);
      dispatch(ActionsAuth.BuyerSeller.updateUser({ image: img }));
    }
  };

  const saveData = async () => {
    let doc = docs[tipodoc];

    if (profile.dni.length != doc.caracteres) {
      CVAlertError({
        addToast,
        message:
          'El ' +
          doc.descripcion_corta +
          ' debe tener ' +
          doc.caracteres +
          ' caracteres'
      });
      return;
    }

    if (doc?.descripcion_corta == 'DNI' && profile.dni != validatedDNI) {
      CVAlertError({
        addToast,
        message: 'El ' + doc.descripcion_corta + ' no está validado.'
      });
      return;
    }

    setLoading(true);

    let { editUserByToken } = await AxiosGQL(
      USER_UPDATE_TOKEN({
        dni: profile.dni,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone,
        image: profile.image,
        tipodoc: doc?._id || ''
      })
    );

    if (editUserByToken?.status) {
      if (
        us?.first_name != profile.first_name ||
        us?.last_name != profile.last_name
      ) {
        User.setToken(editUserByToken.newToken);
        dispatch(
          ActionsAuth.BuyerSeller.updateUser({
            first_name: profile.first_name,
            last_name: profile.last_name
          })
        );
      }

      setLoading(false);
      CVAlertSuccess({
        addToast,
        message: 'Datos actualizados',
        title: 'Actualizar'
      });

      initdata();
    } else {
      setLoading(false);
      CVAlertError({
        addToast,
        title: 'Error',
        message: 'Comuniquese con el administrador'
      });
    }
  };

  const initdata = async () => {
    let documento_listado = await AxiosGQL(DOCUMENT_TYPE_LIST);
    setDocs(documento_listado.DocumentTypeList);

    let us = User.getLoggedInUser();
    const { userFind } = await AxiosGQL(USER_BY_ID(us.user_id));

    let data = {
      ...us,
      first_name: userFind.first_name,
      last_name: userFind.last_name,
      email: userFind.email,
      image: userFind.image,
      phone: userFind?.phone[userFind.phone.length - 1]?.number || '',
      dni: userFind.dni,
      tipodoc: userFind?.tipodoc || ''
    };

    if (userFind?.tipodoc && documento_listado?.DocumentTypeList) {
      let index = documento_listado.DocumentTypeList.findIndex(
        (document) => document._id == userFind?.tipodoc
      );

      setTipodoc(index.toString());
    }

    setProfile(data);
    setValidatedDNI(userFind?.dni || '');
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState({});

  useEffect(() => {
    let [width, height, attr] = IMAGESIZE['PHOTOPROFILE'].split(',');
    setSize({ height, width, attr });

    initdata();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}>
          {/* <Stack onClick={() => onOpen()}> */}
          <CVImage
            variant='avatar'
            width='150px'
            height='150px'
            name={
              profile.first_name != '' && profile.last_name != ''
                ? `${profile.first_name} ${profile.last_name}`
                : profile.email
            }
            image={profile.image || ''}
            cursor='auto'
          />
          {/* <Text color={COLORS['red']} cursor='pointer' textAlign='center'>
            Cambiar Imagen
          </Text> */}
          {/* </Stack> */}
        </Grid>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6}>
                  <CVText color='blue'>Tipo de documento:</CVText>
                  <CVSelect
                    disabled={profile.role !== 'Seller' ? false : true}
                    value={tipodoc.toString()}
                    onChange={(value) => setTipodoc(value)}
                    options={(docs || []).map((item, idx) => ({
                      text: item.descripcion_corta,
                      value: idx.toString()
                    }))}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <CVText color='blue'>Número de documento:</CVText>
                  <CVInputDNIConfig
                    caracteres={
                      docs.length > 0
                        ? docs[tipodoc == '' ? 0 : tipodoc].caracteres
                        : 8
                    }
                    disabled={profile.role !== 'Seller' ? false : true}
                    person={profile}
                    edit={true}
                    buttonColor='red'
                    setperson={setProfile}
                    setValidatedDNI={setValidatedDNI}
                    valid_dni={(value) => {
                      setProfile({
                        ...profile,
                        dni: value
                      });
                    }}
                    iconFind={tipodoc == 0}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={8}>
              <CVInput
                title='Nombres'
                titleOrientation='column'
                titleColor={COLORS['blue']}
                value={profile.first_name || ''}
                disabled={tipodoc == '0' ? true : false}
                buttonColor='white'
                onChange={(value) =>
                  setProfile({ ...profile, first_name: value })
                }
                icon={iconsLock}
                iconFind={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <CVInput
                title='Apellidos'
                titleOrientation='column'
                titleColor={COLORS['blue']}
                value={profile.last_name || ''}
                buttonColor='white'
                disabled={tipodoc == '0' ? true : false}
                onChange={(value) =>
                  setProfile({ ...profile, last_name: value })
                }
                icon={iconsLock}
                iconFind={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <CVInput
                title='Correo electrónico'
                titleOrientation='column'
                titleColor={COLORS['blue']}
                buttonColor='white'
                value={profile.email || ''}
                disabled={true}
                onChange={(value) => setProfile({ ...profile, email: value })}
                icon={iconsLock}
                iconFind={true}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <Flex>
                <CVInput
                  title='Número de Celular'
                  titleOrientation='column'
                  titleColor={COLORS['blue']}
                  value={profile.phone}
                  onChange={(value) => setProfile({ ...profile, phone: value })}
                />
                <Box ml={3} mt={7}>
                  <svg
                    width='26'
                    height='25'
                    viewBox='0 0 26 25'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M0.00125692 5.20962C0.136244 4.81847 0.214731 4.39342 0.415642 4.04182C1.0121 2.99081 1.9457 2.454 3.15619 2.44584C4.97192 2.43328 6.78766 2.44081 8.60339 2.44584C9.02656 2.44584 9.31035 2.70137 9.31349 3.06364C9.31663 3.42591 9.01777 3.69149 8.58832 3.69149C6.80524 3.69149 5.02216 3.69149 3.23907 3.69149C2.26716 3.69149 1.5602 4.21888 1.31911 5.12549C1.27332 5.316 1.25222 5.51161 1.25632 5.7075C1.25297 11.048 1.25297 16.3889 1.25632 21.7302C1.25632 22.7303 1.75861 23.431 2.64953 23.6765C2.85443 23.7302 3.06556 23.7564 3.27737 23.7543C9.03557 23.7581 14.7936 23.7581 20.5513 23.7543C21.7756 23.7543 22.5711 22.952 22.5724 21.7207C22.5749 19.946 22.5749 18.1711 22.5724 16.396C22.5724 16.0394 22.7607 15.7769 23.0495 15.7122C23.1394 15.6912 23.2328 15.6905 23.323 15.7101C23.4131 15.7298 23.4978 15.7694 23.5707 15.8259C23.6436 15.8825 23.703 15.9546 23.7445 16.0371C23.786 16.1195 23.8085 16.2102 23.8105 16.3024C23.823 16.8009 23.8161 17.3001 23.8155 17.7986C23.8155 19.2138 23.8325 20.6289 23.8023 22.0435C23.769 23.6081 22.4386 24.9234 20.8728 24.9906C20.7585 24.9956 20.6436 25 20.5293 25C14.7795 25 9.0297 25 3.27987 25C2.01978 25 1.04223 24.4977 0.415642 23.4009C0.213475 23.0486 0.134987 22.6255 0 22.2343L0.00125692 5.20962Z'
                      fill='#939393'
                    />
                    <path
                      d='M25.1327 3.53394C25.1183 4.3853 24.7912 5.06966 24.2073 5.65104C22.3179 7.53207 20.432 9.41687 18.5497 11.3054C16.8031 13.0509 15.0583 14.7984 13.3154 16.548C13.1335 16.7356 12.9041 16.8703 12.6517 16.9379C11.0193 17.383 9.39321 17.8363 7.76458 18.2871C7.70179 18.3047 7.63901 18.3235 7.57622 18.338C7.08336 18.4491 6.67463 18.0561 6.80648 17.5701C7.28239 15.8121 7.76813 14.0575 8.26371 12.3062C8.31288 12.1594 8.39715 12.0269 8.5092 11.9201C12.1896 8.23213 15.873 4.54875 19.5593 0.869988C20.734 -0.30032 22.4405 -0.282112 23.6202 0.877522C23.8827 1.13557 24.1464 1.39299 24.3956 1.66359C24.8666 2.17291 25.1296 2.84024 25.1327 3.53394ZM18.9409 3.33429L9.85844 12.4167L12.7183 15.2766L21.8013 6.19351L18.9409 3.33429ZM22.74 5.24546C22.9911 5.01755 23.2893 4.79466 23.5286 4.52029C23.7552 4.25297 23.8806 3.91441 23.8826 3.56394C23.8847 3.21347 23.7634 2.87345 23.5399 2.60348C23.2293 2.23538 22.8871 1.89525 22.5171 1.58699C22.0337 1.19082 21.4498 1.12301 20.9136 1.43128C20.5055 1.66547 20.1696 2.02585 19.8142 2.31969L22.74 5.24546ZM9.18539 13.6329C8.89532 14.6826 8.60275 15.7424 8.2995 16.8393L11.5103 15.9484L9.18539 13.6329Z'
                      fill='#939393'
                    />
                  </svg>
                </Box>
              </Flex>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Text
                width='12rem'
                onClick={() => setChangePassword(true)}
                fontSize='1rem'
                color='#FF5454'
                cursor='pointer'
                mt='1rem'
                mb='2rem'>
                Cambiar contraseña
              </Text>
            </Grid>
          </Grid>
        </Grid>
        <CVInputImage
          onClose={onClose}
          isOpen={isOpen}
          size={size}
          callback={(img) => {
            setProfile({ ...profile, image: img });
            saveImage(img);
            onClose();
          }}
        />
      </Grid>
      <Grid item md={12}>
        <Flex mt={4} justifyContent='center'>
          <CVButton
            fontSize='18px'
            backgroundColor='blue'
            color='white'
            padding='1px 20px'
            onClick={() => saveData()}
            isLoading={loading}>
            Guardar
          </CVButton>
        </Flex>
      </Grid>
      <ModalChangePassword
        isOpen={changePassword}
        onClose={() => setChangePassword(!changePassword)}
        codUser={profile.user_id}
        type='buyer'
      />
    </>
  );
}

export default MiProfile;
