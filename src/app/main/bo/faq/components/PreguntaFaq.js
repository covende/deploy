import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FAQ_QUESTIONS_BY_ID,
  EDIT_RESPONSE_QUESTIONS,
  editResponseQuestion
} from '@/app/api/graphql/faq/ClienteAsist/HelpService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  Input,
  Checkbox,
  Grid,
  Flex,
  Text,
  Spacer,
  useToast,
  Center,
  useDisclosure,
  Textarea,
  Button,
  Box
} from '@chakra-ui/react';
// import { Box } from '@material-ui/core';
import { HiTrash } from 'react-icons/hi';
import { confirmAlert } from 'react-confirm-alert';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import ModalDelete from './ModalDelete';
import { DeleteIconDisabled } from './assets/WarnIcon';
import CVRow from '@CVTemplate/core/CVRow';
import { BsTrash } from 'react-icons/bs';
import { CVCheck } from '@CVTemplate/core/index';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Components
const PreguntaFaq = ({ id, item }) => {
  const [selecteds, setselecteds] = useState([]);
  const [toUpdate, setToUpdate] = useState([]);
  const [newDataAdd, setNewDataAdd] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [newData, setNewData] = useState({
    // answer: ,
    // faq_question:
  });
  const [onEdit, setOnEdit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const addToast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [Preguntas, setPreguntas] = useState({});
  const faqPermisions = useGetPermisions('Backoffice', 'Preguntas Frecuentes');
  const dispatch = useDispatch();
  const fetchPlans = async () => {
    const { faqQuestionsByFaqId } = await AxiosGQL(
      FAQ_QUESTIONS_BY_ID(id.idflag)
    );
    setPreguntas(faqQuestionsByFaqId);
  };

  const setQuestion = async (data) => {
    const variables = data.map(({ answer, faq_question, id }) => ({
      answer,
      faq_question,
      _id: id
    }));
    const dataSend = {
      faq_questions: variables
    };

    const edit = await editResponseQuestion(dataSend);

    if (edit) {
      CVAlertSuccess({ addToast, message: 'Actualizado Correctamente' });
      setNewDataAdd(true);
      setOnEdit(false);
    } else {
      CVAlertError({
        addToast,
        message: 'Algo salió mal, por favor inténtalo más tarde.'
      });
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [newDataAdd, onDelete, onEdit]);

  useEffect(() => {
    if (checkAll === true) {
      let check = Preguntas.map((item) => {
        return item.id;
      });
      setselecteds([...selecteds, check]);
    } else {
      setselecteds([]);
    }
  }, [checkAll]);

  const deleteQuestion = () => {
    onOpen();
  };

  // console.log({ Preguntas });
  return (
    <Box>
      <Box
        w='100%'
        display='flex'
        justifyContent='space-between'
        p='9px 28px'
        alignItems='center'>
        {faqPermisions.eliminar && (
          <Box display='flex' alignItems='center' ml='11px'>
            <CVCheck
              value={selecteds.includes(item.id || '')}
              onChange={(value) => {
                value
                  ? setselecteds([...selecteds, item.id || ''])
                  : setselecteds(
                      selecteds.filter((it) => it != (item.id || ''))
                    );
                setCheckAll(!checkAll);
              }}
            />
            <DeleteIconDisabled
              onClick={deleteQuestion}
              color={selecteds.length != 0 ? '#FF5454' : '#B1B1B1'}
            />
          </Box>
        )}
        <Box>
          {faqPermisions.editar && (
            <Box display='flex' w='100%' justifyContent='end'>
              <Button
                size='sm'
                color='#fff'
                bg={onEdit ? '#FF5454' : '#00adf6'}
                w='75px'
                borderRadius='31px'
                fontWeight='700'
                fontSize='12px'
                textAlign='end'
                isDisabled={Preguntas.length == 0}
                onClick={() => setOnEdit(!onEdit)}>
                {onEdit ? 'Cancelar' : 'Editar'}
              </Button>
              <Button
                size='sm'
                color='#fff'
                bg='#00adf6'
                w='75px'
                borderRadius='31px'
                fontWeight='700'
                fontSize='12px'
                textAlign='end'
                ml='15px'
                isDisabled={
                  newData.faq_question === undefined ||
                  newData.answer === undefined ||
                  onEdit === false
                }
                onClick={() => setQuestion(toUpdate)}>
                Guardar
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {Preguntas && Preguntas.length > 0 ? (
        Preguntas.map((item, i) => {
          return (
            <Box mx={3} my={1} key={i}>
              <Flex ml={5} mb='-4px' display='flex' alignItems='center'>
                <CVCheck
                  value={
                    checkAll === true ? true : selecteds.includes(item.id || '')
                  }
                  onChange={(value) =>
                    value
                      ? setselecteds([...selecteds, item.id || ''])
                      : setselecteds(
                          selecteds.filter((it) => it != (item.id || ''))
                        )
                  }
                />
                <Box width='100%'>
                  {onEdit ? (
                    <Box my='10px'>
                      <Input
                        type='text'
                        // isInvalid={onEdit}
                        height='30px'
                        variant='outline'
                        pl={8}
                        defaultValue={item.faq_question}
                        color='#9E9E9E'
                        isInvalid={
                          newData.faq_question === '' && item.id === newData.id
                        }
                        errorBorderColor='red.500'
                        onChange={(e) => {
                          setNewData({
                            ...newData,
                            id: item.id,
                            faq_question: e.target.value
                          });
                          toUpdate[i] = {
                            ...toUpdate[i],
                            id: item.id,
                            faq_question: e.target.value
                          };
                        }}
                        // onChange={(e) => setQuestion(e, item.id)}
                      />
                    </Box>
                  ) : (
                    <Flex>
                      <Text
                        my='10px'
                        width='2xl'
                        color='#9E9E9E'
                        fontSize='11px'
                        fontWeight='600'>
                        {item.faq_question}
                      </Text>
                      <Spacer />
                      <Spacer />
                      {/* <HiTrash
                        onClick={() => {
                          onOpen()
                          setItemToDelete(item.id)
                        }}
                        style={{
                          fontSize: '1.5rem',
                          color: '#9E9E9E',
                          cursor: 'pointer'
                        }}
                      /> */}
                    </Flex>
                  )}
                </Box>
              </Flex>
              {onEdit ? (
                <Box ml='44px' mb='5px' h='10rem'>
                  <Textarea
                    type='text'
                    variant='outline'
                    h='100%'
                    pl={8}
                    defaultValue={item.answer.replace(/<[^>]*>?/g, '')}
                    color='#4F4F4F'
                    isInvalid={newData.answer === '' && item.id === newData.id}
                    errorBorderColor='red.500'
                    // onChange={handleChangeAnswer}
                    onChange={(e) => {
                      setNewData({
                        ...newData,
                        id: item.id,
                        answer: e.target.value
                      });
                      toUpdate[i] = {
                        ...toUpdate[i],
                        id: item.id,
                        answer: e.target.value
                      };
                    }}
                  />
                </Box>
              ) : (
                <Flex ml='44px' maxH='10rem' overflowY='auto'>
                  <Text
                    width='2xl'
                    color='#4F4F4F'
                    fontSize='11px'
                    fontWeight='300'>
                    {item.answer.replace(/<[^>]*>?/g, '')}
                  </Text>
                </Flex>
              )}

              <ModalDelete
                isOpen={isOpen}
                onClose={onClose}
                title='Pregunta'
                selecteds={selecteds}
                checkAll={checkAll}
                setCheckAll={setCheckAll}
                setOnDelete={setOnDelete}
                onDelete={onDelete}
                setSelecteds={setselecteds}
              />
            </Box>
          );
        })
      ) : (
        <Box>
          <Grid>Ninguna pregunta</Grid>
        </Box>
      )}
    </Box>
  );
};
export default PreguntaFaq;
