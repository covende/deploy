import AxiosGQL from '@/app/api/rest/AxiosGQL';
import * as User from '@/app/helpers/authUtils';

import { Center, Text, useDisclosure, Button, Box } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  UPDATE_USER_IMG,
  USER_BY_ID,
  USER_UPDATE_TOKEN
} from '@/app/api/graphql/webpublic/userData/UserService';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  CVInputImage,
  CVInput,
  CVButton,
  CVImage
} from '@/common/CovendeTemplate';
import { COLORS, IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import ModalChangePassword from './ModalChangePassword';
import { iconsLock } from '../../ConfigurationIcons';
import { useDispatch } from 'react-redux';
import ActionsAuth from '@/app/redux/Auth/actions';

function MiProfile({ storeID, permissions }) {
  let us = User.getLoggedInUser();
  const addToast = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    id_user: us.user_id,
    first_name: us.first_name,
    last_name: us.last_name,
    email: us.email,
    phone: '',
    dni: '',
    image: ''
  });

  const [password, Setpassword] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const changePassword = async () => {
    setLoading(true);
    let us = User.getLoggedInUser();
    let id_user = us.user_id;
    let oldPassword = password.newPassword;
    let newPassword = password.oldPassword;

    const updatePasword = await AxiosGQL(
      CHANGE_PASSWORD({ user_id: id_user, oldPassword, newPassword })
    );

    if (updatePasword.resetPassword === 'success') {
      setLoading(false);
      CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
      return false;
    }
    CVAlertError({ addToast, title: 'Error' });
  };

  const changeImage = async (id_user, img) => {
    let { editUserByToken } = await AxiosGQL(USER_UPDATE_TOKEN({ image: img }));

    if (editUserByToken?.status) {
      User.setToken(editUserByToken.newToken);
      dispatch(ActionsAuth.BuyerSeller.updateUser({ image: img }));
      CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
      return false;
    }

    CVAlertError({ addToast, title: 'Error' });
  };

  //const setProfile = (event) => {};
  //const { profile } = useSelector((state) => state.AccountView);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState({});
  const [showModal, setShowModal] = useState('');

  const initdata = async () => {
    let us = User.getLoggedInUser();
    const result = await AxiosGQL(USER_BY_ID(us.user_id));
    setProfile({
      ...profile,
      dni: result.userFind.dni,
      phone: result.userFind.phone[0].number,
      image: result.userFind.image
    });
  };

  useEffect(() => {
    initdata();
    let [width, height, attr] = IMAGESIZE['PHOTOPROFILE'].split(',');
    setSize({ height, width, attr });
  }, []);

  const openModal = (title) => {
    switch (title) {
      case 'changePassword':
        return (
          <ModalChangePassword
            {...{ isOpen, onClose }}
            codUser={us.user_id}
            type='seller'
          />
        );

      case 'image':
        return (
          <CVInputImage
            onClose={onClose}
            isOpen={isOpen}
            size={size}
            callback={(img) => {
              setProfile({ ...profile, image: img });
              changeImage(profile.id_user, img);
              onClose();
            }}
          />
        );
      default:
        return '';
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4}>
        <Box>
          <Center
            // onClick={() => {
            //   setShowModal('image');
            //   onOpen();
            // }}
            mt={20}>
            <CVImage
              name={profile?.first_name}
              image={profile?.image ? profile?.image : null}
              width='150px'
              height='150px'
              variant='avatar'
              cursor='auto'
            />
          </Center>
          {/* <Box
            onClick={() => {
              setShowModal('image');
              onOpen();
            }}
            my={4}>
            <Text color={COLORS['primary']} cursor='pointer' textAlign='center'>
              Cambiar Imagen
            </Text>
          </Box> */}
          {/* <Box mt={10}>
            {permissions.editar && (
              <Text
                color={COLORS['primary']}
                cursor='pointer'
                textAlign='center'
                onClick={() => {
                  changeImage(profile?.id_user, profile?.image);
                }}>
                Cambiar Imagen
              </Text>
            )}
          </Box> */}
          {/* <Box md={12}>
            <Center>
              <CVButton
                fontSe='20px'
                backgroundColor='white'
                color='blue'
                padding='1px 30px'
                onClick={() => {
                  changeImage(profile?.id_user, profile?.image);
                }}>
                Guardar
              </CVButton>
            </Center>
          </Box> */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <CVInput
              title='Nombres'
              titleOrientation='column'
              titleColor={COLORS['blue']}
              disabled={true}
              icon={iconsLock}
              buttonColor='white'
              iconFind={true}
              value={profile.first_name}
              onChange={(value) =>
                setProfile({ ...profile, first_name: value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CVInput
              title='Apellidos'
              titleOrientation='column'
              titleColor={COLORS['blue']}
              disabled={true}
              icon={iconsLock}
              buttonColor='white'
              iconFind={true}
              value={profile.last_name}
              onChange={(value) => setProfile({ ...profile, last_name: value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CVInput
              title='Correo'
              titleOrientation='column'
              titleColor={COLORS['blue']}
              disabled={true}
              icon={iconsLock}
              buttonColor='white'
              iconFind={true}
              value={profile.email}
              onChange={(value) => setProfile({ ...profile, value })}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <CVInput
              title='Número de Celular'
              titleOrientation='column'
              titleColor={COLORS['blue']}
              disabled={true}
              icon={iconsLock}
              buttonColor='white'
              iconFind={true}
              value={profile.phone}
              onChange={(value) => setProfile({ ...profile, phone: value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <CVInput
              title='DNI'
              titleOrientation='column'
              titleColor={COLORS['blue']}
              disabled={true}
              icon={iconsLock}
              buttonColor='white'
              iconFind={true}
              value={profile.dni}
              onChange={(value) => setProfile({ ...profile, dni: value })}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            {permissions.editar && (
              <Button
                isLoading={loading}
                variant='ghost'
                color={COLORS['primary']}
                onClick={() => {
                  setShowModal('changePassword');
                  onOpen();
                  // changePassword()
                }}>
                Cambiar contraseña
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      {openModal(showModal)}
    </Grid>
  );
}

export default MiProfile;
