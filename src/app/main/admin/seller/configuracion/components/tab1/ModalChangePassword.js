import React, { useEffect } from 'react';
import { CVModal, CVInput, CVButton, CVText } from '@/common/CovendeTemplate';
import { Grid, Typography } from '@material-ui/core';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { useState } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { SET_NEW_PASSWORD } from '@/app/api/graphql/webpublic/userData/UserService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { CVErrorsValidate, isPassword } from '@CVTemplate/core/CVValidation';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useToast } from '@chakra-ui/toast';
function ModalChangePassword({ codUser, isOpen, onClose, type = 'seller' }) {
  const addToast = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);

  const [data, setData] = useState({
    user_id: codUser,
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const saveData = async () => {
    setLoading(true);
    const { changePassword } = await AxiosGQL(
      SET_NEW_PASSWORD({
        id: codUser,
        old: data.current_password,
        last: data.new_password
      })
    );

    if (changePassword.status) {
      CVAlertSuccess({
        addToast,
        message: changePassword.message,
        title: 'Contraseña actualizada'
      });
      setData({
        user_id: codUser,
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
      seterrors(false);
      onClose();
    } else {
      CVAlertError({
        addToast,
        title: 'Error',
        message: changePassword.message
      });
    }
    setLoading(false);
  };

  const onSubmit = async () => {
    !errors ? seterrors(true, saveData) : saveData();
  };

  const validando = () =>
    CVErrorsValidate({
      uppassword: data.current_password != '',
      upassword_new: data.new_password != '',
      upassword_again: data.confirm_password != ''
    });

  return (
    <>
      <CVModal
        isOpen={isOpen}
        onClose={onClose}
        size='3xl'
        bgHeader={type == 'seller' ? 'primary' : 'red'}
        colorHeader='white'
        header='Cambiar contraseña'>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12}>
            <CVInput
              title='Contraseña actual'
              titleColor={type == 'seller' ? 'primary' : 'red'}
              error={errors && data.current_password == ''}
              value={data.current_password}
              onChange={(value) =>
                setData({ ...data, current_password: value })
              }
              errorMessage='Campo obligatorio.'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CVInput
              title='Nueva contraseña'
              error={
                errors &&
                (!isPassword(data.new_password) || data.new_password == '')
              }
              titleColor={type == 'seller' ? 'primary' : 'red'}
              value={data.new_password}
              onChange={(value) => setData({ ...data, new_password: value })}
            />
            {errors &&
              (!isPassword(data.new_password) || data.new_password == '') && (
                <CVText
                  color='red'
                  className='errores'
                  fontWeight='bold'
                  fontSize='0.85rem'>
                  <Flex direction='column'>
                    <Typography
                      component='span'
                      variant='caption'
                      style={{
                        color: data.new_password?.length >= 8 ? 'green' : 'red'
                      }}>
                      Debe tener al menos 8 caracteres
                    </Typography>
                    <Typography
                      component='span'
                      variant='caption'
                      style={{
                        color: /[a-z]/.test(data.new_password) ? 'green' : 'red'
                      }}>
                      Al menos una minúscula
                    </Typography>
                    <Typography
                      component='span'
                      variant='caption'
                      style={{
                        color: /\d/.test(data.new_password) ? 'green' : 'red'
                      }}>
                      Un número
                    </Typography>
                    {/* <Typography
                      component='span'
                      variant='caption'
                      style={{
                        color: /[@$!%*?&]/.test(data.new_password)
                          ? 'green'
                          : 'red'
                      }}>
                      {'Alguno de estos símbolos @ $ ! % * ? &'}
                    </Typography> */}
                  </Flex>
                </CVText>
              )}
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <CVInput
              title='Confirmar nueva contraseña'
              titleColor={type == 'seller' ? 'primary' : 'red'}
              value={data.confirm_password}
              onChange={(value) =>
                setData({ ...data, confirm_password: value })
              }
              error={errors && data.confirm_password != data.new_password}
              errorMessage='*La contraseña no coincide con la ingresada.'
            />
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Flex mt={4} justifyContent='center'>
            <CVButton
              fontSize='1.5rem'
              backgroundColor={type == 'seller' ? 'primary' : 'red'}
              onClick={() => onSubmit()}
              isLoading={loading}
              disabled={validando()}
              padding='1px 30px'>
              Guardar
            </CVButton>
          </Flex>
        </Grid>
      </CVModal>
    </>
  );
}

export default ModalChangePassword;
