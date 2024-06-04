import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { useState } from 'react';
import * as User from '@/app/helpers/authUtils';
import { Text, useDisclosure, Flex, Box } from '@chakra-ui/react';
import { CVInput } from '@CVTemplate/core/index';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import ResponseSend from '../response_send';
import { REQUEST_CHANGES_PROFILE } from '@CVApi/core/webpublic/newsletter/NLTypes';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
function RequestModification() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const addToast = useToast();
  let us = User.getLoggedInUser();
  const [data, setData] = useState({
    user_id: us.user_id,
    data_update: '',
    data_new: '',
    data_change: ''
  });
  const saveData = async () => {
    setLoading(true);
    const { requestChagesProfile } = await AxiosGQL(
      REQUEST_CHANGES_PROFILE(data.data_update, data.data_new, data.data_change)
    );

    if (requestChagesProfile.status) {
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
        message: requestChagesProfile.message
      });
    }

    setLoading(false);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Grid item md={12}>
        <Flex justifyContent='center' mt='2.2rem'>
          <Text fontSize='12px' color='#004772'>
            Clic <u onClick={() => onOpen()}>aquí</u> para solicitar la
            modificación de algún dato restringido.
          </Text>
        </Flex>
      </Grid>

      <CVModal
        isOpen={isOpen}
        onClose={onClose}
        size='5xl'
        bgHeader='red'
        colorHeader='white'
        header='Solicitud de modificación de datos'>
        <Box p={10}>
          <Grid container spacing={1} >
            <Grid item xs={12} sm={12} md={12} style={{ maxWidth: '86.5%', marginLeft: '8px', textAlign: 'center'}}>
              <CVInput
                title='Dato(s) a actualizar:'
                titleColor={COLORS['blue']}
                height='100%'
                multiline={true}
                minLength='15'
                borderRadius='12px'
                paddingLeft='0'
                value={data.data_update}
                onChange={(value) => setData({ ...data, data_update: value })}
                
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{ maxWidth: '84.5%', marginLeft: '20px',  textAlign: 'center'}} >
              <CVInput
                title='Nuevo(s) dato(s):' 
                titleColor={COLORS['blue']}
                height='100%'
                multiline={true}
                minLength='15'
                borderRadius='12px'
                paddingLeft='0'
                value={data.data_new}
                onChange={(value) => setData({ ...data, data_new: value })}
                
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{ maxWidth: '100%', marginRight: '85px', textAlign: 'center' }}>
              <CVInput
                title='Razón de modificación:'
                titleColor={COLORS['blue']}
                height='100%'
                multiline={true}
                minLength='15'
                borderRadius='12px'
                paddingLeft='0'
                value={data.data_change}
                onChange={(value) => setData({ ...data, data_change: value })}
              />
            </Grid>
          </Grid>

          <Grid item md={12}>
            <Flex mt={4} justifyContent='center'>
              <CVButton
                fontSize='1.5rem'
                backgroundColor='red'
                onClick={() => saveData()}
                isLoading={loading}
                padding='1px 30px'>
                Enviar
              </CVButton>
            </Flex>
          </Grid>
          {result && <ResponseSend />}
        </Box>
      </CVModal>
    </>
  );
}

export default RequestModification;
