import { useState } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText, CVSelect } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { useToast } from '@chakra-ui/toast';
import React from 'react';
import { REJECT_CONFIRMATION_SALE_CUT } from '@CVApi/core/webadmin/types/PedidoType';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import CVSwitch from '@CVTemplate/core/CVSwitch';
import CCardOption from '@CVPages/core/bo/marcas/components/CCardOption';
import CVLink from '@CVTemplate/core/CVLink';
import { CONFIRM_SALE_CUT_BY_COMPANY } from '@CVApi/core/webpublic/userData/UserCompanyService';

function MConfirmFacturacion({
  isOpen,
  onClose,
  currentMove,
  setCurrentMove,
  sellerIncome,
  setSellerIncome
}) {
  const [motives, setMotives] = useState([
    'No esta conforme con el depósito',
    'Ingreso incorrecto'
  ]);
  const [reasonId, setReasonId] = useState('0');
  const addToast = useToast();
  const [confirm, setConfirm] = useState(true);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (confirm) confirmSaleCutByCompany();
    else rejectConfirmationSaleCut();
  };

  const confirmSaleCutByCompany = async () => {
    setLoading(true);
    const { confirmSaleCutByCompany: data } = await AxiosGQL(
      CONFIRM_SALE_CUT_BY_COMPANY(currentMove.code, currentMove.store_id)
    );

    if (data?.status) {
      setCurrentMove({
        ...currentMove,
        confirmedAt: data?.confirmedAt,
        invoice_url: data?.invoice_url,
        status: 'CONFIRMED'
      });

      setSellerIncome(
        sellerIncome.map((income) =>
          income.code === currentMove.code
            ? {
                ...income,
                confirmedAt: data?.confirmedAt,
                invoice_url: data?.invoice_url,
                status: 'CONFIRMED'
              }
            : income
        )
      );

      CVAlertSuccess({ addToast, message: 'Confirmado satisfactoriamente.' });
    } else {
      CVAlertError({ addToast, message: data.message });
    }

    setLoading(false);
    onClose();
  };

  const rejectConfirmationSaleCut = async () => {
    setLoading(true);
    let { rejectConfirmationSaleCut: resp } = await AxiosGQL(
      REJECT_CONFIRMATION_SALE_CUT(currentMove._id, motives[+reasonId])
    );

    if (resp.status) {
      setCurrentMove({ ...currentMove, status: 'REJECTED' });
      CVAlertSuccess({ addToast, message: resp.message });
    } else {
      CVAlertError({ addToast, message: resp.message });
    }

    setLoading(false);
    onClose();
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header={'Corte de venta' + ' - ' + currentMove?.code}
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <CVButton
            width='40%'
            onClick={send}
            isLoading={loading}
            disabled={loading}>
            {currentMove.status === 'REJECTED' ? 'ACEPTAR' : 'ENVIAR'}
          </CVButton>
          {currentMove.status === 'REJECTED' && (
            <>
              <SizeBox />
              <CVLink href={'/seller/mensajes/' + currentMove?._id}>
                <CVButton backgroundColor='green'>IR A MENSAJERÍA</CVButton>
              </CVLink>
            </>
          )}
        </Flex>
      }>
      <SizeBox />

      <CVText color='blue' textAlign='center' fontWeight='bold'>
        ¿Apruebas el monto de {CVMoneyFormat({ amount: currentMove?.deposit })}{' '}
        a depositar?
      </CVText>

      <SizeBox />
      <Flex width='100%' justifyContent='center'>
        {currentMove.status == 'REJECTED' ? (
          <CCardOption
            borderColor='#00ADF6'
            backgroundColor='#00ADF6'
            text='SI'
          />
        ) : (
          <CVSwitch
            variant='option'
            yesColor='primary'
            value={confirm}
            onChange={(value) => setConfirm(value)}
          />
        )}
      </Flex>

      <SizeBox />

      {!confirm && (
        <Grid item xs={12}>
          <CVSelect
            titleColor='#004772'
            title='Motivo de queja'
            titleOrientation='column'
            value={reasonId}
            onChange={(value) => setReasonId(value)}
            options={[
              ...motives.map((item, index) => ({
                value: String(index),
                text: item
              }))
            ]}
          />
        </Grid>
      )}
    </CVModal>
  );
}

export default MConfirmFacturacion;
