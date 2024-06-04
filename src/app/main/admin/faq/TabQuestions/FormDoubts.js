import React, { useEffect, useState } from 'react';
import { Box, useToast, Text, Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { CVButton, CVInput, CVSelect } from '@/common/CovendeTemplate';
import { callcenter, SendMesagge } from '../assets/svg';
import * as User from '@/app/helpers/authUtils';
import { requestSellerInfo } from '@CVApi/core/webpublic/newsletter/NLTypes';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import CVUseStateCallback from '@CVTemplate/core/CVHooks/CVUseStateCallback';

const ORIGINPROD = [
  { text: 'Seleccionar', value: '', disabled: true },
  { text: 'Fabricación', value: 'MANUFACTURING' },
  { text: 'Importación', value: 'IMPORT' },
  { text: 'Re-venta', value: 'RESALE' }
];
const optionsSeller = [
  [
    'Mi pedido no cambia de estado',
    'No se generó mi Guía de envío',
    'Reportar courier por fallos en la entrega',
    'Reportar el no recojo de un pedido'
  ],
  [
    'No han verificado mi tienda',
    'No responden mi solicitud de creación de marca/categoría',
    'Deseo reactivar mi cuenta',
    'Deseo desactivar mi cuenta',
    'Preguntas sobre cobros en mi estado de cuenta Covende'
  ],
  [
    'La información de mi producto no se visualiza correctamente',
    'Quiero eliminar un comentario'
  ]
];
const optionsBuyer = [
  ['Me cobraron un monto incorrecto', 'Quiero aplicar mi garantía', 'Otros'],
  ['Mis Devoluciones', 'No he recibido el reembolso', 'Otros']
];
function FormDoubts({ fondo, type }) {
  const [loading, setLoading] = useState(false);
  const [errors, seterrors] = CVUseStateCallback(false);
  const [isHover, setisHover] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const addToast = useToast();
  let us = User.getLoggedInUser();
  const [data, setData] = useState({
    user: us.user_id,
    reason: '',
    detail: ''
  });
  const savedata = async () => {
    console.log(data);
    setLoading(true);

    const { requestFaqSeller } = await requestSellerInfo(data);
    if (requestFaqSeller.status) {
      CVAlertSuccess({
        addToast,
        message: 'Pregunta enviada correctamente.¡Gracias por tu consulta!',
        title: 'Mensaje enviado'
      });
      setIsSend(true);
    } else {
      CVAlertError({
        addToast,
        title: 'Error',
        message: requestFaqSeller.message
      });
      setLoading(false);
    }
    setLoading(false);
  };
  const onSubmit = () => {
    !errors ? seterrors(true, savedata) : savedata();
  };

  return (
    <Box mt={10} p={8} size='4xl' background='#fff'>
      <Box textAlign='center'>
        <Text
          mx='auto'
          fontWeight='bold'
          width='90%'
          color='#004772'
          fontSize='25px'>
          ¿Aún con dudas? ¿No encuentras solución a tu problema? Escríbenos
        </Text>
      </Box>

      <Box px='90px'>
        {/* {type === 'buyer' && (
          <Box
            display='flex'
            justifyContent='space-between'
            mb='23px'
            mt='49px'
            alignItems='center'>
            <Box display='flex'>
              <Box mr='53px'>
                <label
                  style={{
                    fontWeight: '600',
                    color: '#004772',
                    fontSize: '18px',
                    width: '90px'
                  }}>
                  ID Pedido:
                </label>
              </Box>
              <Grid item xs={12} sm={12} md={7}>
                <CVInput
                  boxShadow='-1px 1px 8px rgba(0, 0, 0, 0.2)'
                  borderRadius='12px'
                  width='207px'
                  value=''
                />
              </Grid>
            </Box>
            <Box display='flex'>
              <Box mr='40px'>
                <label
                  style={{
                    fontWeight: '600',
                    color: '#004772',
                    fontSize: '18px',
                    marginLeft: '-22px',
                    width: '130px'
                  }}>
                  ID Devolución:
                </label>
              </Box>
              <Grid item xs={12} sm={12} md={7}>
                <CVInput
                  boxShadow='-1px 1px 8px rgba(0, 0, 0, 0.2)'
                  borderRadius='12px'
                  width='207px'
                  value=''
                />
              </Grid>
            </Box>
          </Box>
        )} */}

        {/* mt={type !== 'buyer' && '49px'} */}
        <Box display='flex' mb='23px' mt='30px'>
          <Box mr='74px'>
            <label
              style={{
                fontWeight: '600',
                color: '#004772',
                fontSize: '18px'
              }}>
              Motivo:
            </label>
          </Box>
          <Grid item xs={12} sm={12} md={7}>
            <CVSelect
              type={type}
              boxShadow='-1px 1px 8px rgba(0, 0, 0, 0.2)'
              groupOptions={type === 'buyer' ? optionsBuyer : optionsSeller}
              borderRadius='12px'
              options={ORIGINPROD}
              onChange={(index) => {
                if (index != 'none') {
                  setData({
                    ...data,
                    reason:
                      type == 'buyer'
                        ? optionsBuyer.flat()[index]
                        : optionsSeller.flat()[index]
                  });
                }
              }}
              error={errors && data.reason == ''}
              errorMessage='El motivo es requerido'
            />
          </Grid>
        </Box>
        <Box display='flex'>
          <Box mr='62px'>
            <label
              style={{
                fontWeight: '600',
                color: '#004772',
                fontSize: '18px'
              }}>
              Detalles:
            </label>
          </Box>
          <CVInput
            height='100%'
            multiline={true}
            minLength='15'
            boxShadow='-1px 1px 8px rgba(0, 0, 0, 0.2)'
            borderRadius='12px'
            placeholder='Ingresa todos los detalles de tu pregunta o caso: ID pedido, ID producto, nombre del vendedor, método de pago, recibo, etc.'
            paddingLeft='0'
            value={data.detail}
            onChange={(value) => setData({ ...data, detail: value })}
            error={errors && data.detail == ''}
            errorMessage='El detalle es requerido'
          />
        </Box>
        <Box mt={10}>
          <Box
            display='flex'
            justifyContent='space-between'
            w='100%'
            alignItems={isSend ? 'flex-start' : 'center'}>
            <Flex m={0}>
              <Box>{callcenter}</Box>
              <Box textAlign='center' mt='10px' w='225px'>
                <Box fontWeight='400' fontSize='16px' mb='5px'>
                Contáctanos enviando un correo electrónico a:
                </Box>
                <Box fontWeight='bold' fontSize='18px' color='#004772'>
                  info@Covende.com
                </Box>
              </Box>
            </Flex>

            {!isSend && (
              <CVButton
                fontSize='1.5rem'
                onHover={(hover) => setisHover(hover)}
                padding='0 3rem'
                boxShadow='none'
                color='white'
                backgroundColor='skyblue'
                onClick={() => onSubmit()}
                variant={isHover ? 'outlined' : 'contained'}
                width='160px'
                isLoading={loading}>
                &nbsp;&nbsp; Enviar&nbsp;&nbsp;
              </CVButton>
            )}

            {isSend && (
              <Box
                w='460px'
                display='flex'
                flexDirection='column'
                alignItems='end'>
                <SendMesagge />
                <Text
                  h='40px'
                  textAlign='right'
                  color='#00ADF6'
                  fontWeight={400}
                  fontSize='16px'>
                  <p style={{ fontWeight: '600' }}>¡Mensaje enviado!</p>{' '}
                  Responderemos en breve al email asociado a tu cuenta.
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FormDoubts;
