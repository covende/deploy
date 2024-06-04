import React, { useState, useEffect } from 'react';
import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Label } from '@/common/components';
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  NumberInput,
  Grid,
  GridItem,
  Flex,
  Center,
  Spinner,
  Textarea,
  Text,
  Box
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { A_FAQ } from '../redux/Actions';
import { A_GLOBALES } from '@/app/redux/Global/Actions';
import { initialfaq } from '../redux/initials';
import { useToast } from '@chakra-ui/toast';
import { ADD_FAQ, UPDATE_FAQ } from '@/app/api/graphql/faq/FaqServices';
import { CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { json_format } from '@/common/utils/methods';
import styled from 'styled-components';
import { fontSize } from '@/app/assets/icons/index';
import CVSelect from '@CVTemplate/core/CVSelect';
import { iconsFaq } from './assets/WarnIcon';

const ModalCategoria = ({ isOpen, onClose, type }) => {
  const { loading, error } = useSelector((state) => state.Globales);
  const { Faqs, faq } = useSelector((state) => state.Faq);
  const [textButton, setTextButton] = useState(() =>
    faq._id != '' ? 'Crear' : 'Actualizar'
  );
  const [iconComplete, setIconComplete] = useState();
  const dispatch = useDispatch();
  const addToast = useToast();

  const addFaq = async (faqs) => {
    const faqt = Object.values(faqs).map((it) => {
      let insert_flag = {};
      insert_flag['category'] = faqs.category;
      insert_flag['position'] = parseInt(faqs.position);
      insert_flag['type_faq'] = type;
      insert_flag['status'] = faqs.status;
      insert_flag['icon'] = faqs.icon;
      return insert_flag;
    });
    const res = await AxiosGQL(ADD_FAQ({ faqt }));
    return res.addFaq;
  };

  const setfaq = (e) => {
    let fq = {
      ...faq,
      [e.target.name]: e.target.value
    };

    dispatch(A_FAQ({ faq: fq }));
  };

  const saveFaq = async () => {
    let faqks = await addFaq({ ...faq });
    console.log({ faqks, Faqs });
    let fqs = [...Faqs, faqks];
    CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
    dispatch(A_FAQ({ Faqs: fqs, faq: initialfaq }));
  };

  const updateFaq = async () => {
    const { editFaq } = await AxiosGQL(UPDATE_FAQ({ faq }));
    let fqs = [...Faqs];
    fqs = fqs.map((da) => {
      if (da._id == editFaq._id) {
        da = { ...editFaq };
      }
      return da;
    });
    CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
    dispatch(A_FAQ({ Faqs: fqs, faq: initialfaq }));
  };

  const onSubmit = async () => {
    dispatch(A_GLOBALES({ loading: true }));
    console.log({ faq });
    try {
      if (!!faq._id) {
        await updateFaq();
      } else {
        await saveFaq();
      }
      onClose();
    } catch (error) {
      dispatch(A_GLOBALES({ error: true }));
    } finally {
      dispatch(A_GLOBALES({ loading: false }));
    }
  };

  useEffect(() => {
    !!faq._id ? setTextButton('Actualizar') : setTextButton('Crear');
  }, [faq._id]);

  useEffect(() => {
    let iconComplete = iconsFaq.find(({ code }) => code == faq.icon);
    if (iconComplete) setIconComplete(iconComplete?.svg);
  }, [faq.icon]);

  return (
    <Modal
      onClose={() => {
        onClose();
        dispatch(
          A_FAQ({
            Faqs: Faqs,
            faq: {
              _id: '',
              type_faq: '',
              category: '',
              position: 0,
              quantity: 0,
              status: false,
              icon: ''
            }
          })
        );
      }}
      size='xl'
      isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent mr={43} borderRadius='12px' maxW='40%'>
        <ModalHeader
          borderTopRadius='12px'
          style={{
            backgroundColor: '#00ADF6',
            color: '#FFFFFF',
            fontSize: '18px'
          }}>
          <Center alignItems='self-start'>
            {faq._id ? (
              <Text fontSize='18px' color='#FFFFFF' mr='3px'>
                Editar
              </Text>
            ) : (
              <Text fontSize='18px' color='#FFFFFF' mr='3px'>
                Crear
              </Text>
            )}{' '}
            {`${' '} categoría`}{' '}
          </Center>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody padding='21px 57px'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
            <br />
            <Grid templateColumns='repeat(2, 1fr)' gap='8px'>
              <Box display='flex' alignSelf='center'>
                <Label alignSelf='center' width='68px'>
                  Nombre de Categoría:
                </Label>
                <Input
                  marginLeft='18px'
                  type='text'
                  maxW='196px'
                  name='category'
                  value={faq.category}
                  onChange={(e) => setfaq(e)}
                  alignSelf='center'
                  required={true}
                />
              </Box>

              <Box display='flex' width='100%' alignSelf='center'>
                <Label alignSelf='center'>Posición:</Label>
                <Input
                  min={0}
                  name='position'
                  maxW='179px'
                  value={faq.position || ''}
                  onChange={(e) => setfaq(e)}
                  required={true}
                  marginLeft='10px'
                />
              </Box>

              <Box
                width='100%'
                gridColumnStart='1'
                gridColumnEnd='3'
                display='flex'
                justifyContent='space-between'
                alignSelf='center'>
                <Label alignSelf='center' margin='0'>
                  Icono:
                </Label>
                <Box w='70%'>
                  <CVSelect
                    options={iconsFaq.map((icon) => ({
                      value: icon.code,
                      text: icon.title
                    }))}
                    value={faq.icon || ''}
                    onChange={(value) =>
                      dispatch(A_FAQ({ faq: { ...faq, icon: value } }))
                    }
                    placeholder='Icono para la pregunta frecuente'
                    // error={
                    //   icon.isValid != null
                    //     ? icon.value != ''
                    //       ? false
                    //       : true
                    //     : ''
                    // }
                  />
                </Box>
                <Box borderRadius='50%' p='3px' ml='3px' bg='black'>
                  {iconComplete}
                </Box>
                {/* <Textarea
                  type='text'
                  name='description'
                  marginLeft='10px'
                  value={faq.description}
                  onChange={(e) => setfaq(e)}
                  required={true}
                  borderRadius='12px'
                /> */}
              </Box>
            </Grid>
            <br />
            <Center>
              <Button
                variant='bo-primary'
                type='submit'
                margin='auto'
                width='176px'
                height='27px'
                bg='#00adf6'
                color='#ffffff'
                borderRadius='14px'
                disabled={loading}>
                {loading && !error ? <Spinner /> : textButton}
              </Button>
            </Center>
            <br />
          </form>
        </ModalBody>
        {/*<ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>*/}
      </ModalContent>
    </Modal>
  );
};

export default ModalCategoria;
