import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Typography, Grid, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as User from '@/app/helpers/authUtils';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';
import { Box, Center, useToast } from '@chakra-ui/react';
import { CVButton, CVInput, CVModal, CVText } from '@/common/CovendeTemplate';
import ResponseSend from '@CVPages/core/admin/buyer/configuracion/components/response_send';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { REQUEST_CATEGORY_SELLER } from '@CVApi/core/webpublic/newsletter/NLTypes';

function RequestNewCategory({ onClose, isOpen, _resultcat }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const addToast = useToast();
  let us = User.getLoggedInUser();
  const [data, setData] = useState({
    user: us.user_id,
    category_main: '',
    category_sub: '',
    category_last: ''
  });
  const saveData = async () => {
    setLoading(true);

    const { requestNewCategory } = await AxiosGQL(
      REQUEST_CATEGORY_SELLER(
        data.category_main,
        data.category_sub,
        data.category_last,
        data.user
      )
    );
    if (requestNewCategory.status) {
      CVAlertSuccess({
        addToast,
        message: 'Datos enviados para actualizar',
        title: 'Actualizar'
      });
      setResult(true);
    } else {
      CVAlertError({
        addToast,
        title: 'Error',
        message: requestNewCategory.message
      });
      setLoading(false);
    }

    setLoading(false);
    setData({ category_main: '', category_sub: '', category_last: '' });
    seterrors(false);
  };

  const cancelar = () => {
    onClose();
    setResult(false);
    seterrors(false);
    setData({ category_main: '', category_sub: '', category_last: '' });
  };

  const onSubmit = async () => {
    !errors ? seterrors(true, saveData) : saveData();
  };

  return (
    <CVModal
      title='Solicitar nueva categoría'
      isOpen={isOpen}
      onClose={onClose}
      size='4xl'
      header={
        <CVText fontWeight='bold' color='white' fontSize='1.5rem'>
          Solicitar nueva categoría
        </CVText>
      }
      bgHeader='blue'
      colorHeader='white'>
      <>
        <Container>
          <Box my={6}>
            <CVText fontSize='1.5rem'>
              Ingresa la siguiente información para evaluar la nueva categoría
              que necesitas. Te confirmaremos si tu solicitud ha sido aprobada o
              no.
            </CVText>
          </Box>

          <Box my={10}>
            <div style={{ display: 'inline-block', margin: '0.4rem 0.5rem' }}>
              <CVText fontSize='1.5rem' color='blue'>
                Categoría Principal
              </CVText>
              <CVInput
                borderRadius='1rem'
                width='15rem'
                error={errors && data.category_main == ''}
                value={data.category_main}
                onValidate={(value) =>
                  setData({ ...data, category_main: value })
                }
                errorMessage='Campo obligatorio.'
              />
            </div>
            <div style={{ display: 'inline-block', margin: '0.4rem 0.5rem' }}>
              <CVText fontSize='1.5rem' color='blue'>
                Sub - Categoría 1
              </CVText>
              <CVInput
                borderRadius='1rem'
                width='15rem'
                error={errors && data.category_sub == ''}
                value={data.category_sub}
                onValidate={(value) =>
                  setData({ ...data, category_sub: value })
                }
                errorMessage='Campo obligatorio.'
              />
            </div>
            <div style={{ display: 'inline-block', margin: '0.4rem 0.5rem' }}>
              <CVText fontSize='1.5rem' color='blue'>
                Sub - Categoría 1.1
              </CVText>
              <CVInput
                borderRadius='1rem'
                width='15rem'
                error={errors && data.category_last == ''}
                value={data.category_last}
                onValidate={(value) =>
                  setData({ ...data, category_last: value })
                }
                errorMessage='Campo obligatorio.'
              />
            </div>
          </Box>
          <Box mb={7} mt={4}>
            {data.category_sub !== '' && (
              <CVText fontSize='1.2rem'>
                {data.category_main} {'>'} {data.category_sub} {' >'}
                {data.category_last}
              </CVText>
            )}
          </Box>

          {/* 
          <Box my={10}>
            {listCategorys.map((item, i) => {
              return (
                <div
                  key={i}
                  style={{ display: 'inline-block', margin: '0.4rem 0.5rem' }}>
                  <CVText fontSize='1.5rem' color='blue'>
                    {item}
                  </CVText>
                  <CVInput borderRadius='1rem' width='15rem' />
                </div>
              );
            })}
          </Box>
          */}
        </Container>
        <Container>
          <Box mt={4}>
            <Center>
              <CVButton
                padding='0 10%'
                border='1px solid transparent'
                onClick={() => onSubmit()}
                isLoading={loading}>
                Enviar
              </CVButton>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <CVButton
                padding='0 10%'
                backgroundColor='red'
                border='1px solid transparent'
                onClick={() => cancelar()}>
                Cancelar
              </CVButton>
            </Center>
          </Box>
        </Container>
        {result && <ResponseSend />}
      </>
    </CVModal>
  );
}

export default RequestNewCategory;
