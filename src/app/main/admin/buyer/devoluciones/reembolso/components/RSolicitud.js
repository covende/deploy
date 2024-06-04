import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVGridText from '@CVTemplate/core/CVGridText';
import CVRow from '@CVTemplate/core/CVRow';
import CVText from '@CVTemplate/core/CVText';
import React, { useEffect, useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Box, Text } from '@chakra-ui/react';
import { CVFormatDate, CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import CVColumn from '@CVTemplate/core/CVColumn';
import {
  add_refund_coupon,
  request_account_deposit
} from '@CVApi/core/webreembolso/ReemServices';
import { TextsmsOutlined } from '@/../node_modules/@material-ui/icons/index';

const RSolicitud = ({ reembolso, setreembolso, setUpdateData, updateData }) => {
  const [loading, setloading] = useState(false);
  const [sending, setsending] = useState(false);
  const [seetoaccount, setseetoaccount] = useState(false);
  const [success, setsuccess] = useState(false);
  const [copyCoupon, setCopyCoupon] = useState(false);
  const [state_acount, setState_acount] = useState(false);

  const senddata = async () => {
    setloading(true);
    const result = await add_refund_coupon(reembolso?._id);
    if (result) setreembolso(result);
    setloading(false);
  };

  const toaccount = async () => {
    setsending(true);
    const res = await request_account_deposit(reembolso._id);
    if (res) {
      setsuccess(true);
    }
    setsending(false);
    setState_acount(true);
  };

  // console.log({ reembolso });
  return (
    <>
      <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
        Solicitud de reembolso
      </CVText>
      <SizeBox />

      <CVGridText
        titleColor='black'
        options={[
          {
            title: 'Fecha de solicitud:',
            content: CVFormatDate({
              date: reembolso?.request_date || new Date(),
              time: false
            })
          },
          {
            title: 'Importe:',
            content: CVMoneyFormat({ amount: reembolso?.amount || '0' })
          }
        ]}
      />
      <SizeBox />
      <SizeBox />

      <CVRow justifyContent='center'>
        <CVColumn>
          {reembolso?.coupon != null && (
            <CVText
              color={reembolso?.coupon?.status != 'Activo' ? 'gray' : 'green'}>
              Hemos generado el siguiente cupón como método de reembolso:
            </CVText>
          )}
          <SizeBox />

          <Box>
            {reembolso?.coupon != null ? (
              <CopyToClipboard text={reembolso?.coupon?.name}>
                <Box
                  backgroundColor={
                    reembolso?.coupon != null &&
                    reembolso?.coupon?.status != 'Activo'
                      ? '#CDCCCC'
                      : '#17BF93'
                  }
                  p='6px 43px'
                  color='white'
                  borderRadius='10px'
                  fontWeight='bold'
                  cursor='pointer'
                  onClick={() => setCopyCoupon(true)}>
                  {reembolso?.coupon?.name}
                </Box>
              </CopyToClipboard>
            ) : (
              <CVButton
                isLoading={loading}
                disabled={reembolso?.coupon != null || loading}
                backgroundColor={
                  reembolso?.coupon != null
                    ? reembolso?.coupon?.status === 'Activo'
                      ? 'green'
                      : 'gray'
                    : 'red'
                }
                onClick={() => senddata()}>
                {reembolso?.coupon != null
                  ? reembolso?.coupon?.name
                  : 'SOLICITAR REEMBOLSO'}
              </CVButton>
            )}
            {copyCoupon && (
              <Text
                color={
                  reembolso?.coupon != null &&
                  reembolso?.coupon?.status != 'Activo'
                    ? '#CDCCCC'
                    : '#17BF93'
                }>
                {reembolso?.coupon != null &&
                reembolso?.coupon?.status != 'Activo'
                  ? 'Cupón en desuso copiado!'
                  : 'Cupón Copiado!'}
              </Text>
            )}
          </Box>
          <SizeBox />

          <Box maxWidth='388px'>
            {reembolso?.coupon != null &&
              reembolso?.coupon?.status == 'Activo' && (
                <CVText color='green' textAlign='start'>
                  Utilízalo en tu siguiente compra y obtendrás un descuento por
                  el valor de{' '}
                  {reembolso?.coupon?.discount_type == 'FIXED' ? 'S/ ' : ''}
                  {CVMoneyFormat({
                    amount: reembolso?.coupon?.discount,
                    currency: ''
                  })}
                  {reembolso?.coupon?.discount_type == 'FIXED' ? '' : '%'}.
                  Válido hasta el{' '}
                  {CVFormatDate({ date: reembolso?.coupon?.expiration_date })}.
                </CVText>
              )}
          </Box>
          <SizeBox />
          {reembolso?.coupon != null &&
            reembolso?.coupon?.status != 'Activo' && (
              <CVText color='gray'>
                El cupón caducó. Solicitaste un reembolso.
              </CVText>
            )}
          <SizeBox />
          {reembolso?.coupon != null &&
            seetoaccount &&
            reembolso?.allow_refund_account &&
            reembolso?.coupon?.status === 'Activo' && (
              <Box onClick={() => setseetoaccount(!seetoaccount)}>
                <CVText textDecoration='underline'>
                  {seetoaccount ? 'Ocultar ' : 'Ver'}Solicitar el reembolso a
                  cuenta
                </CVText>
              </Box>
            )}
          <SizeBox />
          <Box>
            {reembolso?.coupon != null &&
            seetoaccount &&
            !success &&
            reembolso?.allow_refund_account &&
            reembolso?.coupon?.status === 'Activo' ? (
              <Box>
                <CVText>
                  Todo reembolso se realiza a la cuenta que se utilizó para
                  realizar el pago del pedido. No se podrá revertir esta acción.
                </CVText>
                <SizeBox />
                <CVButton
                  isLoading={sending}
                  disabled={sending}
                  backgroundColor='red'
                  onClick={() => {
                    toaccount();
                    setUpdateData(!updateData);
                  }}>
                  Confirmar
                </CVButton>
              </Box>
            ) : (
              state_acount && (
                <CVText color='green'>
                  25/01/2021 Vamos a procesar el reembolso a tu cuenta. Recuerda
                  que tu entidad bancaria puede tardar de 10 a 30 días hábiles
                  en reflejar el depósito en tu cuenta.
                </CVText>
              )
            )}
          </Box>
          {success && (
            <CVText color='green'>
              Vamos a procesar el reembolso a tu cuenta. Recuerda que tu entidad
              bancaria puede tardar de 10 a 30 días hábiles en reflejar el
              depósito en tu cuenta.
            </CVText>
          )}
        </CVColumn>
      </CVRow>
    </>
  );
};

export default RSolicitud;
