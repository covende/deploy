import React, { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Center,
  Spinner,
  Text,
  Button,
  Box
} from '@chakra-ui/react';
import { WarnIcon } from './assets/WarnIcon';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { DELETE_FAQ } from '@CVApi/core/faq/FaqServices';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import { DELETE_CREDIT_CARD } from '@CVApi/core/webpublic/userData/UserService';

const ModalDelete = ({ isOpen, onClose, card, setCard, setUpdate, update }) => {
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const onSubmit = (itemDeleted) => {
    setLoading(true);
    AxiosGQL(DELETE_CREDIT_CARD(itemDeleted))
      .then((res) => {
        setLoading(false);
        res.deleteCreditCard
          ? CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' })
          : CVAlertError({
              addToast,
              message: 'Algo salió mal, por favor inténtelo mas tarde.'
            });
        onClose();
        setCard({
          type_card_id: '',
          name_owner: '',
          number_card: '',
          expiration_date: ''
        });
        setUpdate(!update);
      })
      .catch((err) => {
        err &&
          CVAlertError({
            addToast,
            message: 'Estamos tendiendo problemas con el servidor'
          });
        //  console.log(err)
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius='12px' maxW='40%'>
        <ModalHeader
          borderTopRadius={10}
          style={{
            backgroundColor: '#FF5454',
            color: '#ffffff',
            fontWeight: '700'
          }}>
          <Center>
            <span style={{ fontWeight: '400', marginRight: '5px' }}>
              Eliminar
            </span>
            Tarjeta
          </Center>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody padding='21px 57px'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(card._id);
            }}>
            <br />
            <Center>
              <Box textAlign='center'>
                <WarnIcon />
                <Text fontSize='35px' fontWeight='500' color='#FF5454'>
                  ¿Estás seguro que quieres{' '}
                  <span style={{ fontWeight: '700', color: '#FF5454' }}>
                    Eliminar esta Tarjeta
                  </span>
                  ?
                </Text>
              </Box>
            </Center>
            <br />
            <Center>
              <Button
                variant='bo-primary'
                type='submit'
                margin='auto'
                width='176px'
                height='27px'
                bg='#FF5454'
                color='#ffffff'
                borderRadius='14px'
                disabled={loading}>
                {loading ? <Spinner /> : 'Eliminar'}
              </Button>
            </Center>
            <br />
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
