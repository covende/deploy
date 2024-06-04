import React, { Fragment, useEffect, useState } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import { CVPanel, CVButton, CVText, CVInput } from '@CVTemplate/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVErrorTags, isPassword } from '@CVTemplate/core/CVValidation';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { useHistory, useParams } from 'react-router-dom';
import { fromBase64 } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Typography } from '@material-ui/core';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CHANGE_PASSWORD_PUBLIC } from '@CVApi/core/webpublic/userData/UserReset';
import { FaCheckCircle } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';
import ActionsAuth from '@/app/redux/Auth/actions';
import { userLoginByCode } from '@CVApi/core/webpublic/userData/UserValidationCode';
import { useDispatch } from 'react-redux';
import { A_CARD_PRODUCT } from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
function RestablecerCuenta() {
  const [show, setshow] = useState(false);
  const [password, setpassword] = useState('');
  const [password_again, setpassword_again] = useState('');
  const [errors, seterrors] = CVUseStateCallback(false);
  const [loading, setloading] = useState(false);
  const addToast = useToast();
  const history = useHistory();
  const [codeVerify, setCodeVerify] = useState('');
  const [user_id, setUserID] = useState('');

  const [resetStatus, setResetStatus] = useState(false);
  const dispatch = useDispatch();

  const { data } = useParams();
  let code = data.split('ABCDE');
  let replaceToken = data.replaceAll('ABCDE', '.');

  const onSubmit = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Llene o corrija los campos obligatorios'
      });
      return false;
    }
    setloading(true);

    let user = JSON.parse(fromBase64(code[1]));

    const { changePasswordPublic } = await AxiosGQL(
      CHANGE_PASSWORD_PUBLIC({
        user_id: user.user_id,
        newPassword: password,
        token: replaceToken
      })
    );

    if (changePasswordPublic?.status) {
      setResetStatus(true);
      setCodeVerify(changePasswordPublic?.code);
      setUserID(changePasswordPublic?.user);
    } else {
      CVAlertError({ addToast, message: 'Error, Vuelva a intentarlo' });
    }

    setloading(false);
  };

  const senddata = () => (!errors ? seterrors(true, onSubmit) : onSubmit());

  const pageBack = async () => {
    if (loading) return;

    setloading(true);

    if (codeVerify) {
      const resp = await userLoginByCode(codeVerify);

      if (resp.code === 200) {
        dispatch(
          ActionsAuth.BuyerSeller.login({
            validateCode: true,
            response: resp,
            setIsLoading: setloading,
            callback: (...params) => {
              dispatch(A_CARD_PRODUCT({ carrito_login: false }));
              dispatch(A_CARD_PRODUCT({ url: '' }));
            }
          })
        );
      } else {
        let previous_link = window.localStorage.getItem('previous_link');
        history.push(previous_link || '/iniciar-sesion');
      }
    }

    setloading(false);
  };

  const initdata = () => {
    try {
      let user = JSON.parse(fromBase64(code[1]));
      if (user?.user_id == null) history.push('/recuperar-cuenta');
    } catch (error) {
      history.push('/recuperar-cuenta');
    }
  };

  useEffect(() => {
    initdata();
  }, [data]);

  return (
    <Fragment>
      {!resetStatus ? (
        <Flex justifyContent='center' minHeight='80vh' alignItems='center'>
          <CVPanel
            variant='box'
            style={{ maxWidth: '350px', height: 'auto', padding: '0px' }}>
            <Box maxWidth='350px' borderRadius='1rem' width='100%'>
              <Box
                backgroundColor={COLORS['blue']}
                borderRadius='1rem 1rem 0 0'
                padding='1rem'
                width='100%'>
                <CVText
                  textAlign='center'
                  fontSize='1.5rem'
                  fontWeight='bold'
                  color='white'>
                  Restablecer Contraseña
                </CVText>
              </Box>
              <Flex
                flexDirection='column'
                alignItems='center'
                padding='1rem'
                width='100%'>
                <SizeBox />
                <CVText color='blue'>
                  Ingresa tu email para enviarte un correo de recuperación:
                </CVText>
                <SizeBox />
                <CVInput
                  title='Nueva Contraseña'
                  titleOrientation='column'
                  error={errors && (!isPassword(password) || password == '')}
                  icon={show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  iconFind={true}
                  buttonClick={() => setshow(!show)}
                  placeholder='Ej. M@n12345678'
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(value) => setpassword(value)}
                />

                {errors && (!isPassword(password) || password == '') && (
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
                          color: password?.length >= 8 ? 'green' : 'red'
                        }}>
                        Debe tener al menos 8 caracteres
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        style={{
                          color: /[a-z]/.test(password) ? 'green' : 'red'
                        }}>
                        Al menos una minúscula
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        style={{
                          color: /\d/.test(password) ? 'green' : 'red'
                        }}>
                        Un número
                      </Typography>
                      {/* <Typography
                    component='span'
                    variant='caption'
                    style={{
                      color: /[@$!%*?&]/.test(password) ? 'green' : 'red'
                    }}>
                    {'Alguno de estos símbolos @ $ ! % * ? &'}
                  </Typography> */}
                    </Flex>
                  </CVText>
                )}
                <SizeBox />

                <CVInput
                  title='Confirmar Nueva Contraseña'
                  titleOrientation='column'
                  icon={show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  iconFind={true}
                  buttonClick={() => setshow(!show)}
                  placeholder='Confirma Contraseña'
                  type={show ? 'text' : 'password'}
                  value={password_again}
                  onChange={(value) => setpassword_again(value)}
                  error={errors && password_again != password}
                  errorMessage='*La contraseña no coincide con la ingresada.'
                />

                <SizeBox />

                <Box>
                  <CVButton
                    backgroundColor='green'
                    isLoading={loading}
                    disabled={loading}
                    onClick={() => senddata()}>
                    CONFIRMAR
                  </CVButton>
                </Box>
                <SizeBox />
              </Flex>
            </Box>
          </CVPanel>
        </Flex>
      ) : (
        <Flex justifyContent='center' minHeight='80vh' alignItems='center'>
          <CVPanel
            variant='box'
            style={{ maxWidth: '350px', height: 'auto', padding: '0px' }}>
            <Box maxWidth='350px' borderRadius='1rem' width='100%'>
              <Box
                backgroundColor={COLORS['blue']}
                borderRadius='1rem 1rem 0 0'
                padding='1rem'
                width='100%'>
                <CVText
                  textAlign='center'
                  fontSize='1.5rem'
                  fontWeight='bold'
                  color='white'>
                  Restablecer Contraseña
                </CVText>
              </Box>
              <Flex
                flexDirection='column'
                alignItems='center'
                padding='1rem'
                width='100%'>
                <SizeBox />

                <FaCheckCircle
                  style={{ fontSize: '2rem', color: COLORS['green'] }}
                />

                <SizeBox />

                <CVText color='blue' alignItems='center'>
                  Tu contraseña ha sido restablecida con éxito. Sigue
                  disfrutando de comprar online con Covende.
                </CVText>
                <SizeBox />

                <SizeBox />

                <Box>
                  <CVButton
                    backgroundColor='green'
                    isLoading={loading}
                    onClick={() => pageBack()}>
                    Regresar
                  </CVButton>
                </Box>
                <SizeBox />
              </Flex>
            </Box>
          </CVPanel>
        </Flex>
      )}
    </Fragment>
  );
}

export default RestablecerCuenta;
