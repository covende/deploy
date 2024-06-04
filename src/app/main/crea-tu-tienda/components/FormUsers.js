import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { Title } from '../CreaTuTienda.styles';
import { Grid, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useToast } from '@chakra-ui/toast';
import UserExist from './modales/UserExist';
import {
  CVButton,
  CVCheckBox,
  CVInput,
  CVSelect,
  CVSwitch,
  CVText
} from '@/common/CovendeTemplate';
import { useHistory } from 'react-router';
import {
  CVErrorsValidate,
  CVErrorTags,
  isEmail,
  isOnlyText,
  isPassword,
  isPhone,
  onlyEmail,
  onlyNumber
} from '@/common/CovendeTemplate/CVValidation';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import { _finddni, _SubmitFormUser, _validateUserByEmail } from './utils';
import UserRegister from './modales/UserRegister';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';
import { labelPrivacyPolicyTermsAndConditions } from '../../registrar-cuenta/RegistrarCuenta';
import CVInputDNI from '@/common/CovendeTemplate/CVInputDNI';
import UserValidationCode from './modales/UserValidationCode';

function FormUsers({ docs }) {
  const addToast = useToast();
  const history = useHistory();
  const [person, setperson] = useState({
    dni: '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    codVerifica: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistred, setisRegistred] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirPass] = useState(false);
  const [tipodoc, setTipodoc] = useState(0);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [tipeuser, setTipeuser] = useState({
    showPassword: true
  });
  const [usuario, setusuario] = useState({
    email: '',
    phone: '',
    password: '',
    password_again: ''
  });

  const [terminos, setterminos] = useState({
    termino: false,
    condicion: false
  });

  const [isRepresent, setIsRepresentant] = useState(true);
  const validateUserByEmail = async (value) => {
    let valid = await _validateUserByEmail({
      email: value,
      setIsOpen,
      setTipeuser
    });

    setusuario({
      ...usuario,
      email: valid
    });
  };

  const goto_store = () => {
    // routerHistory.push(
    //   `/crea-tu-tienda/create-tienda/${storedStates?.user?.user_id || ''}
    //   }`
    // );
  };

  const senddata = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'llene todos los datos'
      });
      return false;
    }

    await _SubmitFormUser({
      addToast,
      setIsLoading,
      usuario,
      docs,
      tipodoc,
      person,
      setIsOpen: setisRegistred,
      isRepresent,
      terminos,
      user_id: tipeuser?.user?.user_id || '',
      history
    });
  };

  const onSubmit = async () => {
    !errors ? seterrors(true, senddata) : senddata();
  };

  const ConfirmUser = () => (
    <UserExist
      isOpen={isOpen}
      cancelRef={cancelRef}
      person={person}
      tipeuser={tipeuser}
      setperson={setperson}
      onClose={onClose}
      goto_store={goto_store}
      setusuario={setusuario}
      usuario={usuario}
      setTipeuser={setTipeuser}
    />
  );

  const ConfirmRegister = () => (
    <UserValidationCode
      tipeuser='Seller'
      userEmail={usuario?.email}
      isOpen={isRegistred}
      cancelRef={cancelRef}
      onClose={() => false}
      goto_store={goto_store}
    />
  );

  const validando = () =>
    CVErrorsValidate({
      termino: terminos.termino,
      pdni: person.dni != '',
      pnombres: person.nombres != '',
      uemail: usuario.email != '',
      uphone: usuario.phone != ''
      // upassword: usuario.password != '',
      // upassword_again: usuario.password_again != ''
    });

  const setCondicion = (values) => {
    let checks = {
      termino: values.includes('termino'),
      condicion: values.includes('condicion')
    };
    setterminos({ ...terminos, ...checks });
  };

  useEffect(() => {
    setTipodoc(0);
  }, [docs]);

  const provando = (event) => {
    alert(event);
  };

  return (
    <Box>
      <ConfirmUser />
      <ConfirmRegister />

      <SizeBox />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={4}>
          <Title>Correo Electrónico*:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CVInput
            value={usuario.email || ''}
            onValidate={(value) => {
              value == ''
                ? setusuario({ ...usuario, showPassword: true })
                : validateUserByEmail(onlyEmail(value || ''));
            }}
            placeholder='Ingrese su correo electrónico'
            error={errors && (!isEmail(usuario.email) || usuario.email == '')}
            errorMessage='Correo electrónico no válido (ejemplo@ejemplo.com)'
            maxLength={80}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Title>Tipo de documento :</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CVSelect
            options={docs.map((item, idx) => ({
              text: item.descripcion_corta,
              value: idx.toString(),
              values: item.tipodoc
            }))}
            onChange={(value) => {
              setTipodoc(value);
              // alert(value);
            }}
            value={tipodoc.toString()}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Title>Número*:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CVInputDNI
            caracteres={
              // docs.length > 0 ? docs[tipodoc == '' ? 0 : tipodoc].caracteres : 8
              docs.length > 0 ? docs[tipodoc].caracteres : 8
            }
            person={person}
            setTipodoc={setTipodoc}
            limit_dni={true}
            disabled={tipeuser.exist}
            setperson={(value) => setperson(value)}
            valid_dni={(value) => {
              if (value == person.dni) return;

              setperson({
                ...person,
                dni: value,
                nombres: '',
                apellidoPaterno: '',
                apellidoMaterno: ''
              });
            }}
            iconFind={tipodoc == 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Title>Nombres*:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CVInput
            placeholder='Nombres: Ej. Juan'
            value={person.nombres}
            // disabled={tipodoc == 0}
            onClick={(event) => provando(event)}
            onChange={(value) => setperson({ ...person, nombres: value })}
            error={errors && !isOnlyText(person.nombres)}
            errorMessage={
              tipodoc == 0
                ? 'Este campo se autocompleta con el número de DNI, use el botón de la lupa para validar.'
                : 'Solo se permite texto'
            }
          />
        </Grid>

        {/* // <>
          //   <Grid item xs={12} sm={6} md={4}>
          //     <Title>Apellidos*:</Title>
          //   </Grid>
          //   <Grid item xs={12} sm={6} md={6}>
          //     <CVInput
          //       placeholder='Apellidos: Ej. Perez Sosa'
          //       disabled={true}
          //       value={String(
          //         (person.apellidoPaterno || '') +
          //           ' ' +
          //           (person.apellidoMaterno || '')
          //       ).trim()}
          //       error={
          //         errors &&
          //         !isOnlyText(
          //           person.apellidoPaterno +
          //             (person.apellidoPaterno != '' &&
          //             person.apellidoMaterno != ''
          //               ? ' '
          //               : '') +
          //             person.apellidoMaterno
          //         )
          //       }
          //       errorMessage={
          //         tipodoc == 0
          //           ? 'Este campo se autocompleta con el número de DNI, use el botón de la lupa para validar.'
          //           : 'Solo se permite texto'
          //       }
          //     />
          //   </Grid>
          // </> */}

        <Grid item xs={12} sm={6} md={4}>
          <Title>Apellido Paterno*:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CVInput
            placeholder='Ingrese el Apellido Paterno'
            value={person.apellidoPaterno}
            onChange={(value) =>
              setperson({ ...person, apellidoPaterno: value })
            }
            error={
              errors &&
              (!isOnlyText(person.apellidoPaterno) ||
                person.apellidoPaterno == '')
            }
            errorMessage={'Solo se permite texto'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Title>Apellido Materno*:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CVInput
            placeholder='Ingrese el Apellido Materno'
            value={person.apellidoMaterno}
            onChange={(value) =>
              setperson({ ...person, apellidoMaterno: value })
            }
            error={
              errors &&
              (!isOnlyText(person.apellidoMaterno) ||
                person.apellidoMaterno == '')
            }
            errorMessage={'Solo se permite texto'}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Title>Celular*:</Title>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <CVInput
            maxLength='9'
            placeholder='Ejemplo: 999888777'
            value={usuario.phone}
            // onChange={(event) => {
            //   const numericValue = event.target.value;
            //   setusuario({ ...usuario, phone: numericValue });
            // }}

            onChange={(value) => {
              setusuario({ ...usuario, phone: value });
            }}
            error={errors && (!isPhone(usuario.phone) || usuario.phone === '')}
            errorMessage='Sólo caracteres numéricos. No es necesario anteponer +51'
            type='number'
          />
        </Grid>
        {!tipeuser.exist && tipeuser.showPassword && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Title>Contraseña*:</Title>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <CVInput
                error={
                  errors &&
                  (!isPassword(usuario.password) || usuario.password == '')
                }
                icon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                iconFind={true}
                buttonClick={() => setShowPassword(!showPassword)}
                placeholder='Ej. M@n12345678'
                type={showPassword ? 'text' : 'password'}
                value={usuario.password}
                onChange={(value) =>
                  setusuario({ ...usuario, password: value })
                }
              />

              {errors &&
                (!isPassword(usuario.password) || usuario.password == '') && (
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
                          color: usuario.password?.length >= 8 ? 'green' : 'red'
                        }}>
                        Debe tener al menos 8 caracteres
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        style={{
                          color: /[a-z]/.test(usuario.password)
                            ? 'green'
                            : 'red'
                        }}>
                        Al menos una minúscula
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        style={{
                          color: /\d/.test(usuario.password) ? 'green' : 'red'
                        }}>
                        Un número
                      </Typography>
                    </Flex>
                  </CVText>
                )}
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <CVInput
                icon={
                  showConfirmPass ? <VisibilityIcon /> : <VisibilityOffIcon />
                }
                iconFind={true}
                buttonClick={() => setShowConfirPass(!showConfirmPass)}
                placeholder='Confirma Contraseña'
                type={showConfirmPass ? 'text' : 'password'}
                value={usuario.password_again}
                onChange={(value) =>
                  setusuario({ ...usuario, password_again: value })
                }
                error={errors && usuario.password_again != usuario.password}
                errorMessage='*La contraseña no coincide con la ingresada.'
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6} md={4}>
          <Flex>
            <Spacer />
            <Box w='15rem'>
              <Title>
                {' '}
                ¿Soy el representante legal o titular de la empresa?{' '}
              </Title>
            </Box>
          </Flex>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <Box w='5rem'>
            <CVSwitch
              value={isRepresent}
              onChange={(value) => setIsRepresentant(value)}
              variant='option'
              yesColor='primary'
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
        <Grid item xs={12} sm={6} md={8}>
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
        <Grid item xs={12} sm={6} md={4}></Grid>
        <Grid item xs={12} sm={6} md={4}>
          {/* {JSON.stringify(validando())}
          <br></br>
          {JSON.stringify(usuario)} */}
          <SizeBox />
          <CVButton
            width='100%'
            fontWeight='bold'
            onClick={() => onSubmit()}
            isLoading={isLoading}
            disabled={validando()}
            backgroundColor={validando() == true ? 'gray' : 'primary'}>
            REGISTRARME
          </CVButton>
          <SizeBox />
        </Grid>
        <Grid item xs={12} sm={6} md={4}></Grid>
      </Grid>
    </Box>
  );
}

export default FormUsers;
