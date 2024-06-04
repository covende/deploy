import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { CardStyle } from '../ConfigurationStyles';
import {
  SET_CUSTOMER_DEFAULT_DIRECTION,
  USER_DIRECTION_DELETE
} from '@/app/api/graphql/webpublic/userData/UserDirectionService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';

function MisDirecciones({
  onOpen,
  initdata,
  setUserDirection,
  userData,
  setIsNewDirection
}) {
  const addToast = useToast();

  const removeItem = async (id) => {
    // setDirections([...directions.filter((it, idx) => idx != index)]);
    const { userDirectionDelete } = await AxiosGQL(USER_DIRECTION_DELETE(id));
    if (userDirectionDelete) {
      await initdata();
      CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
    } else {
      CVAlertError({ addToast, message: 'Error' });
    }
  };

  const setDefault = async (cusotmer_id, direction_id) => {
    const { setCustomerDefaultDirection } = await AxiosGQL(
      SET_CUSTOMER_DEFAULT_DIRECTION(cusotmer_id, direction_id)
    );
    if (setCustomerDefaultDirection) {
      await initdata();
      CVAlertSuccess({
        addToast,
        message: '¡Listo! Has establecido tu dirección de envío'
      });
    } else {
      CVAlertError({ addToast, message: 'Error' });
    }
  };

  const setUpdateDirection = async (userDirection) => {
    onOpen();
    const newUserDirection = {
      _id: userDirection._id,
      predeterminado: userDirection?.predeterminado,
      user_id: userDirection.user_id,
      customer_id: userDirection.customer_id,
      nombre: userDirection.nombre,
      apellidos: userDirection.apellidos,
      direccion: userDirection.direccion,
      referencia: userDirection.referencia,
      departamento_id: userDirection.departamento._id,
      provincia_id: userDirection.provincia._id,
      distrito_id: userDirection.distrito._id,
      zip: userDirection.zip,
      telefono: userDirection.telefono,
      ubigeo_district: userDirection.ubigeo_district,
      position: userDirection?.position || 1
    };
    setUserDirection(newUserDirection);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Flex justify='end'>
          <Button
            onClick={() => {
              onOpen();
              setIsNewDirection(true);
            }}
            variant='contained'
            style={{
              backgroundColor: '',
              borderRadius: '20px',
              color: '#FFFFFF',
              backgroundColor: '#004772'
            }}>
            Añadir Direccion
          </Button>
        </Flex>
      </Grid>
      {userData.map((userDirection, idx) => (
        <Grid key={v4()} item xs={12} sm={6} md={3}>
          <CardStyle>
            <Card variant='outlined'>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  Dirección {idx + 1}
                </Typography>
                <Divider />
                <Text fontWeight='bold'>
                  {userDirection.nombre} {userDirection.apellidos}
                </Text>
                <Typography color='textSecondary'>
                  {userDirection.direccion}
                </Typography>
                <Typography color='textSecondary'>
                  {userDirection.referencia}
                </Typography>
                <Typography color='textSecondary'>
                  {userDirection.departamento.name}
                </Typography>
                <Typography color='textSecondary'>
                  {userDirection.provincia.name}
                </Typography>
                <Typography color='textSecondary'>
                  {userDirection.distrito.name}
                </Typography>

                {/*<Typography color='textSecondary'>{it.country}</Typography> */}

                <Typography color='textSecondary'>
                  {userDirection.telefono}
                </Typography>
                <Divider />
              </CardContent>
              <Flex justifyContent='space-around'>
                <Button
                  variant='text'
                  style={{
                    color: '#00ADF6',
                    textTransform: 'capitalize',
                    backgroundColor: 'inherit'
                  }}
                  onClick={() => {
                    setUpdateDirection(userDirection);
                    setIsNewDirection(false);
                  }}>
                  Editar
                </Button>
                <Button
                  variant='text'
                  style={{
                    color: '#00ADF6',
                    textTransform: 'capitalize',
                    backgroundColor: 'inherit'
                  }}
                  onClick={() => removeItem(userDirection._id)}>
                  Eliminar
                </Button>
              </Flex>
              <CardActions>
                <Button
                  fullWidth={true}
                  onClick={() =>
                    setDefault(userDirection.customer_id, userDirection._id)
                  }
                  variant={
                    userDirection.predeterminado == true
                      ? 'contained'
                      : 'outlined'
                  }
                  style={{
                    backgroundColor:
                      userDirection.predeterminado == true
                        ? '#17BF93'
                        : '#FFFFFF',
                    color:
                      userDirection.predeterminado == true
                        ? '#FFFFFF'
                        : '#17BF93'
                  }}>
                  {' '}
                  DIRECCIÓN PREDETERMINADO
                </Button>
              </CardActions>
            </Card>
          </CardStyle>
        </Grid>
      ))}
    </Grid>
  );
}

export default MisDirecciones;
