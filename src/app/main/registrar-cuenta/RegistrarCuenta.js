import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, Redirect } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

// Helpers
import { isUserAuthenticated } from '@/app/helpers/authUtils';
import { userService } from '@/app/api/graphql';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Flex
} from '@chakra-ui/react';

import {
  CuentaContainer,
  CuentaTitle,
  RecaptchaContainer,
  StyledLoginTitle,
  FormRegister
} from './RegistrarCuenta.styles';
import { Container, Grid, Typography } from '@material-ui/core';
import {
  CVButton,
  CVCheckBox,
  CVInput,
  CVText
} from '@/common/CovendeTemplate';
import {
  isPassword,
  isEmail,
  CVErrorsValidate,
  CVErrorTags,
  onlyEmail,
  isPasswordBasic
} from '@/common/CovendeTemplate/CVValidation';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { FaCheck } from 'react-icons/fa';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import {
  _SubmitFormUser,
  _validateUserByEmail
} from '../crea-tu-tienda/components/utils';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import CVLink from '@CVTemplate/core/CVLink';
import { useHistory } from 'react-router-dom';
import UserValidationCode from '../crea-tu-tienda/components/modales/UserValidationCode';
import { Visibility } from '@/../node_modules/@material-ui/icons/index';
import { Title } from '../crea-tu-tienda/CreaTuTienda.styles';
import usuarios from '../bo/usuarios/index';

const initialState = {
  email: '',
  password: '',
  password_again: '',
  company_name: '',
  first_name: '',
  last_name: '',
  dni: '',
  celular: ''
};

export const labelPrivacyPolicyTermsAndConditions = (
  <div>
    Declaro que he leído y acepto los{' '}
    <CVLink target='_blank' href='/terminos-y-condiciones'>
      <span style={{ color: '#00ADF6' }}>Términos y Condiciones</span>
    </CVLink>{' '}
    {/* y{' '}
    <CVLink target='_blank' href='/terminos-y-condiciones'>
      <span style={{ color: '00ADF6' }}>Términos y Condiciones</span>
    </CVLink> */}
    .
  </div>
);
function RegistrarCuenta(props) {
  const addToast = useToast();

  const [terminos, setterminos] = useState({
    termino: false,
    condicion: false,
    captcha: true
  });
  const [state, setState] = useState(initialState);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [loading, setloading] = useState(false);
  const [next, setNext] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirPass] = useState(false);
  const [tipeuser, setTipeuser] = useState({
    showPassword: true
  });
  function onChangeCaptcha(value) {
    // setterminos({ ...terminos, captcha: value ? true : false });
    setterminos({ ...terminos, captcha: true });
  }

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const setCondicion = (values) => {
    let checks = {
      termino: values.includes('termino'),
      condicion: values.includes('condicion')
    };
    setterminos({ ...terminos, ...checks });
  };

  const validateUserByEmail = async (value) => {
    let valid = await _validateUserByEmail({
      email: value,
      setIsOpen
    });
    setState({
      ...state,
      email: valid
    });
  };

  const onSubmit = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Llene o corrija los campos obligatorios'
      });
      return false;
    }
    setloading(true);
    var data = {
      ...state,
      platformID: 'PBS',
      typeUser: 'COMPRADOR',
      policies_terms: terminos.termino,
      shareData_promotions: terminos.condicion
    };

    try {
      let resp = await userService.addItem({
        email: state.email,
        password: state.password,
        policies_terms: terminos.termino,
        shareData_promotions: terminos.condicion,
        role: 'Buyer'
      });

      if (resp?.message == 'OK') {
        setNext(true);

        // CVAlertSuccess({
        //   addToast,
        //   message:
        //     'Te enviamos un mail para verificar tu correo electrónico. Verifica tu email para iniciar sesion'
        // });
        // history.push('/iniciar-sesion');
      } else {
        CVAlertError({ addToast, message: resp?.description });
      }
    } catch (error) {
      CVAlertError({
        addToast,
        message: error
      });
    }

    //await props.register(data, props.history);

    setloading(false);
  };

  const senddata = () => (!errors ? seterrors(true, onSubmit) : onSubmit());

  const renderRedirectToRoot = () => {
    const isAuthTokenValid = isUserAuthenticated();
    if (isAuthTokenValid) {
      return <Redirect to='/' />;
    }
  };

  const isValid = () =>
    CVErrorsValidate({
      ...terminos,
      condicion: true,
      semail: state.email != '',
      spassword: state.password != '',
      spassword_again: state.password_again != ''
      /*
sfirst_name: state.first_name != '',
slast_name: state.last_name != '',
scelular: state.celular != ''
*/
    });

  const ConfirmUser = () => (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius='10px'>
          <AlertDialogHeader
            bg={COLORS['green']}
            textAlign='center'
            color={COLORS['white']}
            borderRadius='10px 10px 0 0'
            fontSize='lg'
            fontWeight='bold'>
            ¡Usuario ya existe!
          </AlertDialogHeader>
          <AlertDialogBody
            color={COLORS['blue']} 
          >
            {/* Le informamos que existe una cuenta vinculada al correo electrónico
            ingresado. Por favor, ingrese otro... */}
            Ya existe una cuenta asociada al correo electrónico proporcionado.
            <strong> Por favor, ingrese otro correo electrónico. </strong>
            <br />
            <br />
            <small>Guarde sus credenciales para su pronta visita.</small>
          </AlertDialogBody>

          <AlertDialogFooter>
            <CVButton
              backgroundColor='green'
              color='green'
              onClick={onClose}
              variant='outlined'>
              Cancel
            </CVButton>
            <SizeBox />
            <CVButton backgroundColor='green' onClick={() => onClose()}>
              Ok
            </CVButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box backgroundColor='#EFEFEF' padding='2rem 0px' height='100%'>
      <UserValidationCode
        isOpen={next}
        tipeuser='Buyer'
        userEmail={state?.email}
        onClose={() => setNext(false)}
      />

      {/* <UserValidationCode
        isOpen={true}
        tipeuser='Buyer'
        userEmail={'miemail@gmail.com'}
        onClose={() => false}
      /> */}

      <Container style={{ height: '100%' }}>
        <Flex justifyContent='center' flexWrap='wrap' width='100%'>
          <Box
            width={220}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'>
            <Box display='flex' flexDirection='column'></Box>
          </Box>
          {renderRedirectToRoot()}
          <FormRegister>
            <StyledLoginTitle>
              <Flex width='100%' alignItems='center' justifyContent='center'>
                <FaCheck style={{ color: COLORS['primary'] }} /> <SizeBox />{' '}
                Crea tu cuenta comprador
              </Flex>
            </StyledLoginTitle>
            <SizeBox />
            <CVText textAlign='center' color='blue'>
              ¡Compra desde el primer momento!
            </CVText>
            <SizeBox />
            <ConfirmUser />
            <Box padding='2rem'>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <CVInput
                    title='Correo Electrónico:'
                    titleOrientation='column'
                    placeholder='Ingrese su correo electrónico'
                    // onValid={(value) => onlyEmail(value || '')}
                    onValidate={(value) => validateUserByEmail(value)}
                    value={state.email}
                    width='100%'
                    error={
                      errors && (!isEmail(state.email) || state.email == '')
                    }
                    errorMessage='*Campo requerido. Correo electrónico no válido'
                  />
                </Grid>
                {!tipeuser.exist && tipeuser.showPassword && (
                  <>
                    {/* <Grid item xs={12} sm={6} md={4}>
                    <Title>Contraseña</Title>
                     </Grid> */}
                    <Grid item xs={12} sm={6} md={6}>
                      <CVInput
                        error={
                          errors &&
                          (!isPassword(state.password) || state.password == '')
                        }
                        icon={
                          showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )
                        }
                        iconFind={true}
                        buttonClick={() => setShowPassword(!showPassword)}
                        placeholder='Ingrese su contraseña'
                        type={showPassword ? 'text' : 'password'}
                        title='Contraseña:'
                        titleOrientation='column'
                        value={state.password}
                        onChange={(value) =>
                          setState({ ...state, password: value })
                        }
                        //   type='password'
                        //   title='Contraseña:'
                        //   titleOrientation='column'
                        //   value={state.password}
                        //   error={
                        //     errors &&
                        //     (!isPassword(state.password) || state.password == '')
                        //   }
                        //   icon={showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        //   iconFind={true}
                        //   buttonClick={() => setShowPassword(!showPassword)}
                        //   onChange={(value) =>
                        //     setState({ ...state, password: value })
                        //   }
                        //   placeholder='Ingrese su contraseña'
                      />
                      {errors &&
                        (!isPasswordBasic(state.password) ||
                          state.password == '') && (
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
                                  color:
                                    state.password.length >= 8 ? 'green' : 'red'
                                }}>
                                Debe tener al menos 8 caracteres
                              </Typography>
                              <Typography
                                component='span'
                                variant='caption'
                                style={{
                                  color: /[A-Z]/.test(state.password)
                                    ? 'green'
                                    : 'red'
                                }}>
                                {' '}
                                Al menos una mayúscula{' '}
                              </Typography>
                              <Typography
                                component='span'
                                variant='caption'
                                style={{
                                  color: /[a-z]/.test(state.password)
                                    ? 'green'
                                    : 'red'
                                }}>
                                Al menos una minúscula
                              </Typography>
                              <Typography
                                component='span'
                                variant='caption'
                                style={{
                                  color: /\d/.test(state.password)
                                    ? 'green'
                                    : 'red'
                                }}>
                                Un número
                              </Typography>
                              {/* <Typography
                                component='span'
                                variant='caption'
                                style={{
                                  color: /[@$!%*?&]/.test(state.password)
                                    ? 'green'
                                    : 'red'
                                }}>
                                {'Alguno de estos síbolos @ $ ! % * ? &'}
                              </Typography> */}
                            </Flex>
                          </CVText>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CVInput
                        icon={
                          showConfirmPass ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )
                        }
                        iconFind={true}
                        buttonClick={() => setShowConfirPass(!showConfirmPass)}
                        placeholder='Ingrese su contraseña nuevamente'
                        type={showConfirmPass ? 'text' : 'password'}
                        title='Repetir su contraseña'
                        titleOrientation='column'
                        value={state.password_again}
                        onChange={(value) =>
                          setState({ ...state, password_again: value })
                        }
                        error={errors && state.password_again != state.password}
                        errorMessage='*La contraseña no coincide con la ingresada.'
                      />
                    </Grid>
                    {/* <CVInput
                    type='password'
                    title='Ingrese Nuevamente'
                    titleOrientation='column'
                    placeholder='Ingrese su contraseña de nuevo'
                    width='100%'
                    value={state.password_again}
                    onChange={(value) =>
                      setState({ ...state, password_again: value })
                    }
                    error={errors && state.password_again != state.password}
                    errorMessage='*La contraseña no coincide con la ingresada.'
                  />
                </Grid> */}
                  </>
                )}
                {/* 
                <Grid item xs={12} sm={6} md={6}>
                  <CVInput
                    title='Nombres'
                    titleOrientation='column'
                    value={state.first_name}
                    onChange={(value) =>
                      setState({ ...state, first_name: value })
                    }
                    placeholder='Ingrese sus nombres'
                    width='100%'
                    errorMessage='*Campo requerido.'
                    error={errors.first_name}
                    onValidate={(value) => {
                      value = typeof value == 'string' ? value : null;
                      seterrors({
                        ...errors,
                        first_name: !(
                          isOnlyText(value || state.first_name) &&
                          state.first_name != ''
                        )
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CVInput
                    title='Apellidos'
                    titleOrientation='column'
                    value={state.last_name}
                    onChange={(value) =>
                      setState({ ...state, last_name: value })
                    }
                    placeholder='Ingrese sus apellidos'
                    width='100%'
                    errorMessage='*Campo requerido.'
                    error={errors.last_name}
                    onValidate={(value) => {
                      value = typeof value == 'string' ? value : null;
                      seterrors({
                        ...errors,
                        last_name: !(
                          isOnlyText(value || state.last_name) &&
                          state.last_name != ''
                        )
                      });
                    }}
                  />
                </Grid>
               
                <Grid item xs={12} sm={6} md={6}>
                  <CVInput
                    title='DNI (opcional)'
                    titleOrientation='column'
                    value={state.dni}
                    onChange={(value) => setState({ ...state, dni: value })}
                    placeholder='Ingrese su DNI'
                    width='100%'
                    errorMessage='*DNI no válido.'
                    maxLength='8'
                    error={errors.dni}
                    onValidate={(value) => {
                      value = typeof value == 'string' ? value : null;
                      seterrors({
                        ...errors,
                        dni: !isIDNumber({ idcard: value || state.dni })
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <CVInput
                    title='Número de Celular'
                    titleOrientation='column'
                    value={state.celular}
                    onChange={(value) => setState({ ...state, celular: value })}
                    placeholder='Ingrese su celular'
                    width='100%'
                    errorMessage='*Teléfono no válido.'
                    maxLength='9'
                    error={errors.celular}
                    onValidate={(value) => {
                      value = typeof value == 'string' ? value : null;
                      seterrors({
                        ...errors,
                        celular: !isPhone(value || state.celular)
                      });
                    }}
                  />
                </Grid>
                    */}

                {/* <SizeBox height='2rem' />
                <Grid item xs={12} sm={12} md={12}>
                  <RecaptchaContainer>
                    <ReCAPTCHA
                      sitekey={process.env.RECAPTCHA_SITEKEY}
                      onChange={onChangeCaptcha}
                    />
                  </RecaptchaContainer>
                </Grid> */}
                <SizeBox height='2rem' />
                <Grid item xs={12} sm={12} md={12}>
                  <CVCheckBox
                    onChange={(values) => setCondicion(values)}
                    itemDirection='column'
                    options={[
                      {
                        value: 'termino',
                        text: labelPrivacyPolicyTermsAndConditions
                      },
                      {
                        value: 'condicion',
                        text: 'Acepto compartir mis datos para uso comercial y para recibir promociones de CoVende.'
                      }
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <SizeBox />

                  <CVButton
                    isLoading={loading}
                    disabled={loading || isValid()}
                    fontWeight='bold'
                    onClick={() => senddata()}
                    width='100%'
                    backgroundColor={isValid() ? 'gray' : 'primary'}>
                    CREAR CUENTA
                  </CVButton>

                  <SizeBox fontSize='2rem' />
                </Grid>
              </Grid>
            </Box>
          </FormRegister>
          <SizeBox />
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'>
            <Box display='flex' flexDirection='column'>
              <CuentaContainer>
                <Link to='/crea-tu-tienda'>
                  <CuentaTitle color='#00ADF6'>
                    Quiero mi cuenta Vendedor
                  </CuentaTitle>
                  ¡Haz crecer tu negocio! Vende con nosotros y genera más
                  ingresos <h2 style={{ color: '#00ADF6' }}>aquí.</h2>
                  {/* <Link to='/crea-tu-tienda' style={{ color: '#00ADF6' }}>
                  aquí */}
                </Link>
              </CuentaContainer>
              {/* <CuentaContainer>
                  <CuentaTitle color='#FF5454'>
                    Quiero mi cuenta SELLER
                  </CuentaTitle>
                  Posibilidades de realizar subastas cuando desees y compra sin
                  ningún problema.{' '}
                </CuentaContainer>
                <CuentaContainer>
                  <CuentaTitle color='#004574'>
                    Quiero mi CUENTA PRO
                  </CuentaTitle>
                  Todas los beneficios de ambas. ¡Ya no tienes límites!
                </CuentaContainer> */}
            </Box>
            {/* <LoginSocial width='220px' /> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default RegistrarCuenta;
