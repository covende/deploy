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
import { DELETE_QUESTIONS } from '@CVApi/core/faq/ClienteAsist/HelpService';
import { Q_QUESTIONS, A_FAQ } from '../redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_ROLE } from '@CVApi/core/roles/typeDefs/query';

const ModalDelete = ({
  isOpen,
  onClose,
  title,
  itemToDelete,
  selecteds,
  setSelecteds,
  checkAll,
  setOnDelete,
  onDelete,
  deleteUser,
  setConfirmDelete,
  confirm = () => {},
  onConfirm = false
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addToast = useToast();
  const { Preguntas, cotegory_faq, Dato } = useSelector(
    (state) => state.Questions
  );
  const { Faqs } = useSelector((state) => state.Faq);

  // console.log({Faqs})

  const onSubmit = (itemDeleted) => {
    setLoading(true);
    if (title === 'Menu') {
      setLoading(false);
      onClose();
      return setConfirmDelete(true);
    }
    if (title === 'Dirección') {
      setLoading(false);
      onClose();
      return setConfirmDelete(true);
    }
    if (title === 'Usuario') {
      deleteUser(itemToDelete);
      return setLoading(false);
    }
    if (title === 'Rol') {
      AxiosGQL(DELETE_ROLE(itemToDelete.roleID))
        .then((res) => {
          res.deleteRole?.status == true
            ? CVAlertSuccess({ addToast, message: res.deleteRole?.message })
            : CVAlertError({ addToast, message: res.deleteRole?.message });
          setOnDelete(res.deleteRole?.status);
          onClose();
          setLoading(false);
        })
        .catch((err) => {
          err &&
            CVAlertError({
              addToast,
              message: 'Estamos teniendo problemas con el servidor.'
            });
        });
    } else {
      AxiosGQL(DELETE_FAQ({ itemDeleted }))
        .then((res) => {
          setLoading(false);
          let updateCategory = Faqs.filter((Faq) => Faq._id !== itemDeleted);
          dispatch(
            A_FAQ({
              Faqs: updateCategory
            })
          );
          res.deleteFaq?._id
            ? CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' })
            : CVAlertError({
                addToast,
                message: 'Algo salió mal, por favor inténtalo más tarde.'
              });
          onClose();
        })
        .catch((err) => {
          err &&
            CVAlertError({
              addToast,
              message: 'Estamos teniendo problemas con el servidor.'
            });
          //  console.log(err)
        });
    }
  };

  const updateQuestionsDeleteds = (questions, selecteds) => {
    for (let i = 0; i < selecteds.length; i++) {
      return questions.filter((question) => question.id !== selecteds[i]);
    }
  };

  const deleteQuestion = (selecteds) => {
    AxiosGQL(
      DELETE_QUESTIONS(checkAll ? selecteds[selecteds.length - 1] : selecteds)
    )
      .then((res) => {
        setLoading(false);
        let questionsUpdate = updateQuestionsDeleteds(
          [...Preguntas],
          selecteds
        );
        dispatch(
          Q_QUESTIONS({
            Preguntas: checkAll ? [] : questionsUpdate
          })
        );
        setOnDelete(!onDelete);
        setSelecteds([]);
        res.deleteFaqQuestions === true
          ? CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' })
          : CVAlertError({
              addToast,
              message: 'Algo salió mal, por favor inténtalo más tarde.'
            });
        onClose();
      })
      .catch(
        (err) =>
          err &&
          CVAlertError({
            addToast,
            message: 'Algo salió mal, por favor inténtalo más tarde.'
          })
      );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent borderRadius='12px' maxW={{ base: '100%', md: '40%' }}>
      <ModalHeader
        borderTopRadius={10}
        style={{
          backgroundColor: '#FF5454',
          color: '#ffffff',
          fontWeight: '700',
          fontSize: { base: '16px', md: 'inherit' }
        }}>
        <Center>
          <span style={{ fontWeight: '400', marginRight: '5px', fontSize: { base: '14px', md: 'inherit' } }}>
            Eliminar
          </span>
          {title}
        </Center>
      </ModalHeader>
      <ModalCloseButton style={{ color: '#FFFFFF' }} />
      <ModalBody padding={{ base: '10px', md: '21px 57px' }}>
        <form
          onSubmit={async (e) => {
            console.log('ejecutndo el form submit...');
            e.preventDefault();

            if (loading) return;

            if (onConfirm) {
              setLoading(true);
              await confirm(itemToDelete);
              setLoading(false);
            } else {
              if (title === 'Pregunta') {
                deleteQuestion(selecteds);
              } else {
                onSubmit(itemToDelete);
              }
            }
          }}>
          <br />
          <Center>
            <Box textAlign='center'>
              <WarnIcon />
              <Text fontSize={{ base: '18px', md: '35px' }} fontWeight='500' color='#FF5454'>
                ¿Estás seguro que quieres{' '}
                <span style={{ fontWeight: '700', color: '#FF5454' }}>
                  {checkAll
                    ? 'Eliminar todas las Preguntas'
                    : `Eliminar ${
                        title.split(' ').length > 1
                          ? title
                          : title == 'Rol' || 'Atributo'
                          ? `el ${title}`
                          : `la ${title}`
                      }`}
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
              // disabled={loading}>
            >
              {' '}
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
