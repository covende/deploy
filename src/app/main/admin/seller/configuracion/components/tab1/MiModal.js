import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';
import { TIPOROLE } from '@/common/CovendeTemplate/CVThemes';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import CVText from '@CVTemplate/core/CVText';
import {
  CVErrorTags,
  CVErrorsValidate,
  isEmail,
  isPassword,
  isPasswordBasic
} from '@CVTemplate/core/CVValidation';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex
} from '@chakra-ui/react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { v4 } from 'uuid';
import { useToast } from '@chakra-ui/toast';
import { addSubAccount } from '@CVApi/core/subAccount/service';

function MiModal({
  isOpen,
  onClose,
  setUserCurrent,
  userCurrent,
  roles,
  process
}) {
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const addToast = useToast();

  const isValid = () =>
    CVErrorsValidate({
      first_name: userCurrent.first_name != '',
      last_name: userCurrent.last_name != '',
      role: userCurrent.role != '',
      email: userCurrent.email != '',
      password: userCurrent.password != ''
    });

  const onSubmit = async () => {
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Llene o corrija los campos obligatorios'
      });
      return false;
    }
    setloading(true);

    try {
      let resp = await addSubAccount({
        email: userCurrent.email,
        first_name: userCurrent.first_name,
        last_name: userCurrent.last_name,
        password: userCurrent.password,
        role: userCurrent.role
      });

      if (resp?.status) {
        seterrors(false);
        process(true);
      } else {
        CVAlertError({ addToast, message: resp.message });
      }

      setloading(false);
    } catch (error) {}
  };

  const senddata = () => (!errors ? seterrors(true, onSubmit) : onSubmit());

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        seterrors(false);
        onClose();
      }}
      rounded='1rem'
      size='xl'>
      <ModalOverlay />
      <ModalContent rounded='1rem'>
        <ModalHeader
          borderRadius='1rem 1rem 0 0'
          backgroundColor='#00ADF6'
          color='#FFFFFF'>
          Agregar Usuario
        </ModalHeader>
        <ModalCloseButton />
        <ModalCloseButton rounded='50%' color='#FFFFFF' />
        <ModalBody>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4} md={4}>
              <Typography align='right'>Rol*</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <CVSelect
                options={roles}
                value={userCurrent.role}
                onChange={(value) =>
                  setUserCurrent({ ...userCurrent, role: value })
                }
                error={errors && userCurrent.role == ''}
                errorMessage='*Campo requerido'
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Typography align='right'>Nombre*</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <CVInput
                value={userCurrent.first_name}
                onChange={(value) =>
                  setUserCurrent({ ...userCurrent, first_name: value })
                }
                error={errors && userCurrent.first_name == ''}
                errorMessage='*Campo requerido'
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Typography align='right'>Apellidos*</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <CVInput
                value={userCurrent.last_name}
                onChange={(value) =>
                  setUserCurrent({ ...userCurrent, last_name: value })
                }
                error={errors && userCurrent.last_name == ''}
                errorMessage='*Campo requerido'
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Typography align='right'>Correo electrónico*</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <CVInput
                value={userCurrent.email}
                onChange={(value) =>
                  setUserCurrent({ ...userCurrent, email: value })
                }
                error={
                  errors &&
                  (!isEmail(userCurrent.email) || userCurrent.email == '')
                }
                errorMessage='*Campo requerido. Correo electrónico no válido'
              />
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              <Typography align='right'>Contraseña*</Typography>
            </Grid>
            <Grid item xs={8} sm={8} md={8}>
              <CVInput
                value={userCurrent.password}
                onChange={(value) =>
                  setUserCurrent({ ...userCurrent, password: value })
                }
                error={
                  errors &&
                  (!isPassword(userCurrent.password) ||
                    userCurrent.password == '')
                }
              />
              {errors &&
                (!isPasswordBasic(userCurrent.password) ||
                  userCurrent.password == '') && (
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
                            userCurrent.password.length >= 8 ? 'green' : 'red'
                        }}>
                        Debe tener al menos 8 caracteres
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        style={{
                          color: /[A-Z]/.test(userCurrent.password)
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
                          color: /[a-z]/.test(userCurrent.password)
                            ? 'green'
                            : 'red'
                        }}>
                        Al menos una minúscula
                      </Typography>
                      <Typography
                        component='span'
                        variant='caption'
                        style={{
                          color: /\d/.test(userCurrent.password)
                            ? 'green'
                            : 'red'
                        }}>
                        Un número
                      </Typography>
                    </Flex>
                  </CVText>
                )}
            </Grid>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <CVButton
            isLoading={loading}
            disabled={loading || isValid()}
            onClick={() => senddata()}
            backgroundColor={isValid() ? 'gray' : 'primary'}>
            Guardar
          </CVButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default MiModal;
