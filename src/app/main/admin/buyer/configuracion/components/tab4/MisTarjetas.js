import React, { useEffect, useState } from 'react';
import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as User from '@/app/helpers/authUtils';
import { useDisclosure } from '@chakra-ui/react';
import { v4 } from 'uuid';
import { CardStyle } from '../ConfigurationStyles';
import ModalEditCard from '../ModalEditCard';
import { CVButton } from '@CVTemplate/core/index';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { LIST_CREDIT_CARD } from '@CVApi/core/webpublic/userData/UserService';
import ModalDelete from '../tab4/ModalDelete';

const useStyles = makeStyles({
  custom: {
    fontWeight: '500'
  },
  text: {
    color: '#4D4D4D'
  }
});

function MisTarjetas() {
  let us = User.getLoggedInUser();
  const [listCards, setListCards] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNewCard, setIsNewCard] = useState(true);
  const [nameModal, setNameModal] = useState('');
  const [update, setUpdate] = useState(false);
  const [card, setCard] = useState({
    user_id: us.user_id,
    type_card_id: '',
    number_card: '',
    number_card: '',
    expiration_date: ''
  });
  const classes = useStyles();

  const listCreditCard = (user_id) => {
    AxiosGQL(LIST_CREDIT_CARD(user_id))
      .then((response) => setListCards(response.listCreditCard))
      .catch((err) => console.log({ err }));
  };

  useEffect(() => {
    listCreditCard(us.user_id);
  }, [update]);

  const getModal = (nameModal) => {
    switch (nameModal) {
      case 'addUp':
        return (
          <ModalEditCard
            {...{
              isOpen,
              onClose,
              isNewCard,
              setIsNewCard,
              card,
              setCard,
              setUpdate,
              update
            }}
          />
        );
      case 'delete':
        return (
          <ModalDelete
            {...{ isOpen, onClose, card, setCard, setUpdate, update }}
          />
        );

      default:
        return '';
    }
  };

  return (
    <Grid container spacing={2}>
      <Box
        w='100%'
        display='flex'
        justifyContent='end'
        mt='34px'
        mr='29px'
        mb='29px'>
        <CVButton
          width='187px'
          backgroundColor='blue'
          onClick={() => {
            setIsNewCard(true);
            setNameModal('addUp');
            onOpen();
          }}>
          Añadir Tarjeta
        </CVButton>
      </Box>
      {listCards.map((it, idx) => (
        <Grid key={v4()} item xs={12} sm={6} md={3}>
          <CardStyle>
            <Card variant='outlined'>
              <CardContent>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  gutterBottom
                  className={classes.custom}>
                  Tarjeta {idx + 1}
                </Typography>
                <Divider />
                <Text fontWeight='normal' color='#4D4D4D'>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>
                    Tipo de tarjeta:
                  </span>{' '}
                  {' ' + it.type_card.title}
                </Text>
                <Text fontWeight='normal' color='#4D4D4D'>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>
                    Nombre del titular:
                  </span>{' '}
                  {' ' + it.name_owner}
                </Text>
                <Text fontWeight='normal' color='#4D4D4D'>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>
                    Número de tarjeta:
                  </span>{' '}
                  {' ' + it.number_card}
                </Text>
                <Text fontWeight='normal' color='#4D4D4D'>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>
                    Fecha de vencimiento:
                  </span>{' '}
                  {' ' + it.expiration_date}
                </Text>
                <Divider />
              </CardContent>
              <Flex justifyContent='space-evenly'>
                <Button
                  variant='text'
                  style={{
                    color: '#FF5454',
                    textTransform: 'capitalize',
                    backgroundColor: 'inherit'
                  }}
                  onClick={() => {
                    setIsNewCard(false);
                    setCard(it);
                    setNameModal('addUp');
                    onOpen();
                  }}>
                  Editar
                </Button>
                <Button
                  variant='text'
                  style={{
                    color: '#FF5454',
                    textTransform: 'capitalize',
                    backgroundColor: 'inherit'
                  }}
                  onClick={() => {
                    setNameModal('delete');
                    onOpen();
                    setCard(it);
                  }}>
                  Eliminar
                </Button>
              </Flex>
              <CardActions>
                {/* 
                <Button
                  fullWidth={true}
                  variant={idx == 0 ? 'contained' : 'outlined'}
                  style={{
                    backgroundColor: idx == 0 ? '#17BF93' : '#FFFFFF',
                    color: idx == 0 ? '#FFFFFF' : '#17BF93'
                  }}
                >
                  DIRECCIÓN PREDETERMINADO
                </Button>
                */}
              </CardActions>
            </Card>
          </CardStyle>
        </Grid>
      ))}
      {getModal(nameModal)}
    </Grid>
  );
}

export default MisTarjetas;
