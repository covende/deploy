import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { Box, Flex } from '@chakra-ui/react';
import { process_pedido } from '@CVApi/core/webpedido/PedidoService';
import React, { useEffect, useState } from 'react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import { CHANGE_COMPANIES_CUT_PAYMENT_STATUS } from '@CVApi/core/faq/ClienteAsist/HelpService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function MChangePaymentStatus({
  isOpen,
  onClose,
  masive,
  cut_code,
  stores,
  checkAll,
  noStores,
  paymentStatus,
  process
}) {
  const [loading, setloading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const procesar = async () => {
    setloading(true);
    AxiosGQL(
      CHANGE_COMPANIES_CUT_PAYMENT_STATUS({
        cut_code,
        company_ids: checkAll ? [] : stores,
        no_companies: checkAll ? noStores : [],
        payment_status: paymentStatus,
        change_payment_status: masive
      })
    )
      .then(({ changeCompanyCutPaymentStatus }) => {
        if (changeCompanyCutPaymentStatus?.status) {
          setUpdated(true);
        }

        setloading(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };

  const finished = async () => {
    setUpdated(false);
    if (updated) await process();
    onClose();
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={finished}
      bgHeader='primary'
      header='Estado de Pago'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            {updated ? (
              <CVButton onClick={finished}>Cerrar</CVButton>
            ) : (
              <CVButton
                isLoading={loading}
                disabled={loading}
                onClick={procesar}>
                {masive == 'PAID' ? 'PAGAR' : 'CAMBIAR A PENDIENTE DE PAGO'}
              </CVButton>
            )}
          </Box>
        </Flex>
      }>
      {updated ? (
        <CVText color='blue' textAlign='center' fontSize='20px'>
          Se actualizo correctamente el estado de pago de los cortes de tiendas
          seleccionadas.
        </CVText>
      ) : (
        <>
          <CVText color='blue' textAlign='center' fontSize='20px'>
            El estado de pago de los cortes de tiendas seleccionadas se cambiara
            a <strong>{masive == 'PAID' ? 'PAGADO.' : 'PENDIENTE.'}</strong>
          </CVText>
          <SizeBox />
          <SizeBox />
          <CVText textAlign='center' color='blue'>
            Haz clic en el siguiente botón para realizar la actualización.
          </CVText>
        </>
      )}
    </CVModal>
  );
}

export default MChangePaymentStatus;
