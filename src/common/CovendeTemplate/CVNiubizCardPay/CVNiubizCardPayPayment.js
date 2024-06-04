import React, { useState } from 'react';
import styled from '@emotion/styled';

// UI components
import {
  Box,
  Button,
  CircularProgress,
  Text,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Center
} from '@chakra-ui/react';
import { Label } from '@/common/components';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { CVCheckBox } from '@/common/CovendeTemplate';

const InputNiubiz = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 4px 12px;
  display: ${({ activePayment }) => (activePayment ? 'block' : 'none')};
  width: ${({ width }) => width || 'auto'};
  background: #ffffff;
  border: 1px solid #cdcccc;
  box-sizing: border-box;
  border-radius: 10px;
`;

function CVNiubizCardPayPayment({
  payVisa,
  activePayment,
  showForm,
  successPayment,
  loadingPay,
  showSuccessModal
}) {
  const [activeSend, setactiveSend] = useState(false);

  return (
    <Box
      padding='36px 40px'
      maxWidth='576px'
      height='429px'
      bg='#E6E6E6'
      color='white'
      borderRadius='10px'>
      <Text
        py='4px'
        color='#004772'
        fontSize='30px'
        fontStyle='normal'
        fontWeight='700'
        lineHeight='45px'
        letterSpacing='0em'>
        Medio de pago
      </Text>
      {activePayment ? (
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} sm={12}>
            <Label>Número de tarjeta:</Label>
            <InputNiubiz
              activePayment={activePayment}
              id='txtNumeroTarjeta'
              className='form-control'></InputNiubiz>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Label>Fecha de vencimiento:</Label>
            <InputNiubiz
              activePayment={activePayment}
              id='txtFechaVencimiento'
              className='form-control'></InputNiubiz>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Label>Código de seguridad:</Label>
            <InputNiubiz
              activePayment={activePayment}
              id='txtCvv'
              className='form-control'></InputNiubiz>
          </Grid>
          {/*
          <CVCheckBox
            onChange={(values) => setactiveSend(values.includes('activeSend'))}
            options={[
              {
                value: 'activeSend',
                text: (
                  <Text>
                    Al hacer clic en "Pagar" aceptas los{' '}
                    <Label>
                      <Link
                        style={{ color: '#00ADF6' }}
                        to='/terminos-y-condiciones'>
                        Términos y Condiciones
                      </Link>
                    </Label>
                    de Covende.
                  </Text>
                )
              }
            ]}
          />
*/}
          <Button
            variant='bo-primary'
            margin='auto'
            display={!activeSend ? 'block' : 'none'}
            bg='covende.default.main'
            width='170px'
            onClick={() => payVisa()}
            isLoading={loadingPay}
            loadingText='Pagando...'
            isDisabled={successPayment && activePayment}>
            {successPayment ? '¡Pagado!' : 'Pagar'}
          </Button>

          <Modal isOpen={showSuccessModal} isCentered onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody id='modalbox'>
                <Box height='300px'>
                  <Center>
                    <Spinner />
                  </Center>
                  <Center>Por favor no cierre la ventana</Center>
                  <Box color='red' id='ResponseNiubiz'></Box>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Grid>
      ) : (
        ''
      )}

      <CircularProgress
        isIndeterminate
        color='covende.default.main'
        display={showForm || activePayment ? 'none' : 'grid'}
        width='100%'
        height='calc(100% - 53px)'
        justifyItems='center'
        alignItems='center'
      />
    </Box>
  );
}

export default CVNiubizCardPayPayment;
