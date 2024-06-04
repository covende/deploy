import React, { useState } from 'react';

import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Label } from '@/common/components';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  Center,
  Spinner,
  Text,
  Box,
  Textarea,
  HStack
} from '@chakra-ui/react';
import {
  CVErrorsValidate,
  CVErrorTags
} from '@/common/CovendeTemplate/CVValidation';
import CVUseStateCallback from '@/common/CovendeTemplate/CVHooks/CVUseStateCallback';

import { useDispatch, useSelector } from 'react-redux';
import { A_FAQ } from '../redux/Actions';
import { A_GLOBALES } from '@/app/redux/Global/Actions';
import { useToast } from '@chakra-ui/toast';
import { addQuestions, ADD_QUESTION } from '@/app/api/graphql/faq/FaqServices';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate/index.js';
import { CVAlertSuccess, CVAlertError } from '@/common/CovendeTemplate/CVAlert';
// Components
const ModalPregunta = ({ isOpen, onClose }) => {
  const [errors, seterrors] = CVUseStateCallback(false);
  const [loading, setLoading] = useState(false);
  const { Faqs, qwestion } = useSelector((state) => state.Faq);
  const [newQuestion, setNewQuestion] = useState({
    cotegory_faq: '',
    faq_question: '',
    answer: '',
    status: ''
  });
  const dispatch = useDispatch();
  const addToast = useToast();

  const addQuestion = async (newQuestion) => {
    setLoading(true);
    const res = await addQuestions(newQuestion);
    console.log({ res });
    if (res?.id) {
      setNewQuestion({
        cotegory_faq: '',
        faq_question: '',
        answer: '',
        status: ''
      });
      setLoading(false);
      CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
      onClose();
      return false;
    }
    CVAlertError({ addToast, title: 'Error' });
    setLoading(false);
    return console.log(res);
  };

  const showerrors = () => {
    !errors ? seterrors(true) : 'ko';
    if (CVErrorTags()) {
      CVAlertError({
        addToast,
        message: 'Solucione o corrija los errores en rojo'
      });
      return false;
    }
  };

  const validando = () =>
    CVErrorsValidate({
      cotegory_faq: newQuestion.cotegory_faq != '',
      faq_question: newQuestion.faq_question != '',
      answer: newQuestion.answer != '',
      status: newQuestion.status != ''
    });
  const saveQwestions = async () => {
    let faqks = await addQuestion({ ...qwestion });
    CVAlertSuccess({ addToast, message: 'Agregado Correctamente' });
  };

  const onSubmit = async () => {
    dispatch(A_GLOBALES({ loading: true }));
    await saveQwestions();
    dispatch(A_GLOBALES({ loading: false }));
    onClose();
  };
  console.log({ Faqs });
  return (
    <Modal onClose={onClose} size='xl' isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent mr={43} borderRadius='12px' maxW='40%'>
        <ModalHeader
          borderTopRadius={10}
          style={{
            backgroundColor: '#00ADF6',
            color: '#FFFFFF',
            fontSize: '18px'
          }}>
          <Center alignItems='self-start'>
            {false ? (
              <Text fontSize='18px' color='#FFFFFF' mr='3px'>
                Editar
              </Text>
            ) : (
              <Text fontSize='18px' color='#FFFFFF' mr='3px'>
                Crear
              </Text>
            )}{' '}
            {`${' '} Pregunta`}{' '}
          </Center>
        </ModalHeader>
        <ModalCloseButton style={{ color: '#FFFFFF' }} />
        <ModalBody padding='37px 55px'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
            <br />
            <Grid templateColumns='repeat(1, 1fr)' gap={3}>
              <Box
                display='flex'
                gridColumnStart='1'
                gridColumnEnd='3'
                alignSelf='center'>
                <Label margin='0' alignSelf='center'>
                  Categoria:
                </Label>
                <CVSelect
                  name='cotegory_faq'
                  width='90%'
                  marginLeft='12px'
                  options={Faqs.map((it) => ({
                    text: it.category,
                    value: it._id
                  }))}
                  value={newQuestion.cotegory_faq}
                  onChange={(e) => {
                    let iq = { ...qwestion, category: e };
                    dispatch(A_FAQ({ qwestion: iq }));
                    setNewQuestion({
                      ...newQuestion,
                      cotegory_faq: e
                    });
                  }}
                />
              </Box>

              <Box
                display='flex'
                gridColumnStart='1'
                gridColumnEnd='3'
                alignSelf='center'>
                <Label marginLeft='5px'>Pregunta:</Label>
                <CVInput
                  name='faq_question'
                  value={qwestion.question}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      faq_question: e
                    })
                  }
                  marginLeft='12px'
                />
              </Box>

              {/* <Box display='flex'>
                <Label margin='10px 8px 0 0'>Respuesta:</Label>
                <CVTextArea
                  content={qwestion.answer}
                  setContent={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      answer: e
                    })
                  }
                  // onChange={(e)=>setNewQuestion({
                  //   ...newQuestion,
                  //   answer: e
                  // })}
                />
              </Box> */}

              <Box
                width='100%'
                gridColumnStart='1'
                gridColumnEnd='3'
                display='flex'
                alignSelf='center'>
                <Label alignSelf='center'>Respuesta:</Label>
                <Textarea
                  type='text'
                  name='response'
                  marginLeft='10px'
                  value={newQuestion.answer}
                  onChange={(e) => {
                    setNewQuestion({
                      ...newQuestion,
                      answer: e.target.value
                    });
                  }}
                  required={true}
                  borderRadius='12px'
                />
              </Box>
              <br />
              <Box display='flex' width='100%' alignSelf='center'>
                <Label alignSelf='center' margin='0 0 0 12px '>
                  Posición:
                </Label>
                <CVInput
                  name='status'
                  width='65px'
                  marginLeft='12px'
                  value=''
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      status: e
                    })
                  }
                />
              </Box>
            </Grid>
            <br />
            <Center>
              <HStack>
                <Button
                  variant='bo-primary'
                  color='white'
                  type='submit'
                  margin='auto'
                  width='173px'
                  fontSize='14px'
                  height='27px'
                  borderRadius='14px'
                  fontWeight='600'
                  bg='#00adf6'
                  disabled={loading || validando()}
                  onClick={() => {
                    validando();
                    showerrors();
                    addQuestion(newQuestion);
                  }}>
                  {loading ? <Spinner /> : 'Crear'}
                </Button>
                <CVButton
                  width='173px'
                  color='white'
                  backgroundColor='red'
                  borderRadius='14px'
                  fontSize='14px'
                  fontWeight='600'
                  onClick={onClose}>
                  {' '}
                  Cancelar
                </CVButton>
              </HStack>
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

export default ModalPregunta;
