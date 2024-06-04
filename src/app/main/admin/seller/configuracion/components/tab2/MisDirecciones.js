import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Box, Divider, Flex, Text, Spacer } from '@chakra-ui/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { CardStyle } from '../ConfigurationStyles';

import {
  DELETE_COMPANY_DIRECTIONS,
  SET_DEFAULT_DIRECTION
} from '@/app/api/graphql/webpublic/userData/UserCompanyService';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useToast } from '@chakra-ui/toast';
import ModalDelete from '@CVPages/core/bo/faq/components/ModalDelete';

function MisDirecciones({
  totalDirections,
  onOpen,
  storeID,
  initData,
  setSellerDirection,
  sellerDirection,
  setIsNewDirection,
  permisions
}) {
  const addToast = useToast();
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteparams, setDeleteparams] = useState({
    company_id: storeID,
    direction_id: ' '
  });

  const updateItem = (sellerDirection) => {
    onOpen();
    const newSellerDirection = {
      id: sellerDirection._id,
      type_local: sellerDirection.type_local,
      supervisor: sellerDirection.supervisor,
      phone: sellerDirection.phone,
      street_fiscal: sellerDirection.street_fiscal,
      country: sellerDirection.country,
      zipcode: sellerDirection.zipcode,
      reference: sellerDirection.reference,
      state: sellerDirection.state._id,
      province: sellerDirection.province._id,
      district: sellerDirection.district._id
    };
    setSellerDirection(newSellerDirection);
  };

  const setpreterminado = async (company_id, direction_id) => {
    const { setAsDefaultDirection } = await AxiosGQL(
      SET_DEFAULT_DIRECTION(company_id, direction_id)
    );

    // console.log(setAsDefaultDirection);

    if (setAsDefaultDirection) {
      await initData();
      CVAlertSuccess({
        addToast,
        message: 'La dirección se ha establecido como predeterminada.'
      });
    } else {
      CVAlertError({
        addToast,
        message: 'Error al esteblecer la dirección como predeterminada'
      });
    }
  };

  const removeItem = async (deleteparams) => {
    const { deleteCompanyDirection } = await AxiosGQL(
      DELETE_COMPANY_DIRECTIONS(
        deleteparams.company_id,
        deleteparams.direction_id
      )
    );

    if (deleteCompanyDirection) {
      await initData();
      CVAlertSuccess({ addToast, message: 'Eliminado' });
    } else {
      CVAlertError({ addToast, message: 'Error al eliminar' });
    }

    setConfirmDelete(false);
  };
  useEffect(() => {
    if (confirmDelete) {
      removeItem(deleteparams);
    }
  }, [confirmDelete]);

  return (
    <Box mx={20}>
      <Flex m={10}>
        <Text fontSize='1.5rem' fontWeight='bold' textColor='#00ADF6'>
          Mis Direcciones
        </Text>
        <Spacer />
        <Box>
          {permisions.crear && (
            <Button
              onClick={() => {
                setIsNewDirection(true);
                setSellerDirection({
                  ...sellerDirection,
                  country: 'Perú'
                });
                onOpen();
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
          )}
        </Box>
      </Flex>

      <Grid container spacing={2}>
        {totalDirections.map((direction, idx) => (
          <Grid key={v4()} item xs={12} sm={6} md={3}>
            <CardStyle>
              <Card variant='outlined'>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>
                    {direction.type_local}
                  </Typography>
                  <Divider />
                  <Text fontWeight='bold'>{direction.supervisor}</Text>
                  <Typography color='textSecondary'>
                    {direction.street_fiscal}
                  </Typography>
                  <Typography color='textSecondary'>
                    {direction.reference}
                  </Typography>
                  <Typography color='textSecondary'>
                    {direction.state.name}
                  </Typography>
                  <Typography color='textSecondary'>
                    {direction.province.name}
                  </Typography>
                  <Typography color='textSecondary'>
                    {direction.district.name}
                  </Typography>

                  <Typography color='textSecondary'>
                    {direction.country}
                  </Typography>

                  <Typography color='textSecondary'>
                    {direction.phone}
                  </Typography>
                  <Divider />
                </CardContent>

                <Flex justifyContent='space-around'>
                  {permisions.editar && (
                    <Button
                      variant='text'
                      style={{
                        color: '#00ADF6',
                        textTransform: 'capitalize',
                        backgroundColor: 'inherit'
                      }}
                      onClick={() => {
                        updateItem(direction);
                        setIsNewDirection(false);
                      }}>
                      Editar
                    </Button>
                  )}
                  {!direction.fiscal && permisions.eliminar && (
                    <Button
                      variant='text'
                      style={{
                        color: '#00ADF6',
                        textTransform: 'capitalize',
                        backgroundColor: 'inherit'
                      }}
                      onClick={() => {
                        setOpen(true);
                        setDeleteparams({
                          ...deleteparams,
                          direction_id: direction._id
                        });
                      }}>
                      Eliminar
                    </Button>
                  )}
                </Flex>

                <CardActions>
                  {permisions.editar && (
                    <Button
                      fullWidth={true}
                      variant={
                        direction.predetermined == true
                          ? 'contained'
                          : 'outlined'
                      }
                      style={{
                        backgroundColor:
                          direction.predetermined == true
                            ? '#17BF93'
                            : '#FFFFFF',
                        color:
                          direction.predetermined == true
                            ? '#FFFFFF'
                            : '#17BF93'
                      }}
                      onClick={() => setpreterminado(storeID, direction._id)}>
                      DIRECCIÓN PREDETERMINADO
                    </Button>
                  )}
                </CardActions>
              </Card>
            </CardStyle>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12}>
          {/* <Flex>
            {permisions.crear && (
              <Button
                onClick={() => {
                  setIsNewDirection(true);
                  onOpen();
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
            )}
          </Flex> */}
        </Grid>
      </Grid>
      <ModalDelete
        setConfirmDelete={setConfirmDelete}
        isOpen={open}
        onClose={() => setOpen(!open)}
        title='Dirección'
      />
    </Box>
  );
}

export default MisDirecciones;
