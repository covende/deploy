import React, { useState, useEffect } from 'react';
import { Box, useDisclosure, Center } from '@chakra-ui/react';
import { userService } from '@/app/api/graphql';
import {
  CVButton,
  CVImage,
  CVInput,
  CVInputImage,
  CVSelect,
  CVText
} from '@/common/CovendeTemplate';
import { Grid } from '@material-ui/core';
import { FcEditImage } from 'react-icons/fc';
import { IMAGESIZE } from '@/common/CovendeTemplate/CVThemes';
import {
  isPassword,
  isEmail,
  onlyText
} from '@/common/CovendeTemplate/CVValidation';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';

function ModalForm(props) {
  const { state, setState, onSubmit, dataDependency, errors, seterrors } =
    props;
  const [size, setsize] = useState({});
  const { onOpen, isOpen, onClose } = useDisclosure();

  const validateUserByEmail = (e) => {
    const { name, value } = e.target;
    const elem = e.target;
    if (name === 'email' && !isEmail(value)) {
      // Buscamos el email en la colección de "users"
      userService.fetchByEmail({ email: value }).then((res) => {
        setIsOpenTooltip(!!res);
      });
    }
  };

  useEffect(() => {
    const [width, height, attr] = IMAGESIZE['PHOTOPROFILE'].split(',');
    setsize({ width, height, attr });
  }, []);

  console.log({ state });

  return (
    <Box p={5}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <Center>
            <Box>
              <Box onClick={() => onOpen()} position='relative'>
                {state.image != '' ? (
                  <CVImage
                    width={'105px'}
                    height={'105px'}
                    image={state.image}
                  />
                ) : (
                  <Box padding='0.25rem'>
                    <FcEditImage fontSize='8rem' />
                  </Box>
                )}
              </Box>
              {errors && state.image == '' && (
                <CVErrorLabel
                  errorClass='errores'
                  errorMessage='La imagen es obligatoria'
                />
              )}
            </Box>
          </Center>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVText color='blue'>Nombres</CVText>
          <CVInput
            error={errors && !onlyText(state.name)}
            value={state.name}
            onChange={(value) => setState({ ...state, name: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVText color='blue'>Apellidos</CVText>
          <CVInput
            error={errors && !onlyText(state.lastName)}
            value={state.lastName}
            onChange={(value) => setState({ ...state, lastName: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <CVText color='blue'>Correo Electrónico:</CVText>
          <CVInput
            error={errors && !isEmail(state.email)}
            value={state.email}
            onChange={(value) => setState({ ...state, email: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVText color='blue'>Contraseña:</CVText>
          <CVInput
            type='password'
            error={errors && !isPassword(state.password)}
            errorMessage={
              !isPassword(state.password) &&
              'Tiene que tener @, < 8 digitos, Mayusculas, numeros'
            }
            value={state.password}
            onChange={(value) => setState({ ...state, password: value })}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CVText color='blue'>Repetir Contraseña:</CVText>
          <CVInput
            type='password'
            error={errors && state.password != state.confirmPassword}
            value={state.confirmPassword}
            onChange={(value) => setState({ ...state, confirmPassword: value })}
          />
        </Grid>

        <Grid item xs={8} sm={8} md={8}>
          <CVText color='blue'>Roles:</CVText>
          <CVSelect
            value={state.roleId}
            onChange={(value) => setState({ ...state, roleId: value })}
            error={errors && state.roleId == ''}
            options={
              dataDependency.loading
                ? []
                : dataDependency.error
                ? []
                : dataDependency.data.map((rol) => ({
                    value: rol.roleID,
                    text: rol.roleName
                  }))
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Center>
            <CVButton onClick={() => onSubmit()}>Guardar</CVButton>
          </Center>
        </Grid>
      </Grid>
      {isOpen && (
        <CVInputImage
          size={size}
          onChange={(img) => {
            setState({ ...state, image: img });
            onClose();
          }}
          isOpen={isOpen}
          onClose={() => onClose()}
        />
      )}
    </Box>
  );
}

export default ModalForm;
