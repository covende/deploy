import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVPanel, CVText } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import CVTracking from '@/common/CovendeTemplate/CVTracking';
import CVLink from '@CVTemplate/core/CVLink';
import {
  Box,
  Flex,
  useToast,
  Tooltip,
  Heading,
  Spacer
} from '@chakra-ui/react';
import { confirm_receipt_pedido } from '@CVApi/core/webpedido/PedidoService';
import { CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import React, { useEffect, useState } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { COLORS } from '@CVTemplate/core/CVThemes';
import RemisionGuide from '@/app/components/OrderDetails/components/RemisionGuide/RemisionGuide';

function DEstado({ pedido }) {
  const [confirm, setconfirm] = useState(pedido.confirm_reception || false);
  const addToast = useToast();
  const [loading, setloading] = useState(false);

  const okAction = async () => {
    setloading(true);
    const result = await confirm_receipt_pedido({
      pedido_id: pedido.pedido_id,
      user_id: pedido.buyer_id
    });
    if (result) {
      setconfirm(true);
      CVAlertSuccess({
        addToast,
        message: 'Gracias por confirmar, disfruta de tu compra'
      });
    }
    setloading(false);
  };

  const us_confirm = async () => {
    okAction();
  };

  return (
    <Box>
      <SizeBox />
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        Detalles de Producto
      </CVText>
      <SizeBox />
      <CVPanel itemsAlign='center' itemDirection='column' padding='0rem 5rem'>
        <SizeBox />

        {pedido.fecha_entrega && (
          <Flex justifyContent='center' align='center'>
            <CVButton
              onClick={() => us_confirm()}
              isLoading={loading}
              disabled={loading || confirm}
              variant='outlined'
              color={loading || confirm ? 'gray' : 'primary'}>
              CONFIRMAR RECEPCION
            </CVButton>
            <SizeBox />

            <Tooltip label='Si recibiste tu producto haz clic en “Confirmar recepción”. Recuerda que si no confirmas en un máximo de 1 días se dará por hecho que ya recibiste tu pedido.'>
              <span>
                <HiQuestionMarkCircle />
              </span>
            </Tooltip>
          </Flex>
        )}
        <SizeBox />
        <CVTracking
          // status={pedido?.status || 'PENDING_PAY'}
          variant='pedido'
          pedido_id={pedido?.pedido_id}
          // idtracking={pedido?.id_tracking || ''}
          // trackings={(pedido?.statuses || []).map((track) => ({
          //   data: track.fecha,
          //   time: track.hora,
          //   text: track.messages.seller,
          //   active: track.active
          // }))}
        />
        <SizeBox />
        <CVLine
          maxWidth='450px'
          titles={['COMPROBANTE']}
          color='green'
          backgroundColor='white'
          fontSize='1rem'
          lineHeight='1px'
        />
        <Flex>
          <CVGridText
            padding='0 5px'
            options={[
              { title: 'Tipo:  ', content: pedido.billing_type },
              {
                title: 'DNI o RUC:  ',
                content: pedido.ruc_buyer || pedido.buyer?.dni
              }
            ]}
          />
          {pedido?.receipt_url && (
            <Flex ml={3} align='end' direction='column'>
              <CVLink href={pedido?.receipt_url} target='_blank' color='blue'>
                <Flex>
                  <RemisionGuide />
                  <Heading ml='5px' color={COLORS['black']}>
                    Comprobante de pago .PDF
                  </Heading>
                </Flex>
              </CVLink>
            </Flex>
          )}
        </Flex>
        <SizeBox />
      </CVPanel>
    </Box>
  );
}

export default DEstado;
