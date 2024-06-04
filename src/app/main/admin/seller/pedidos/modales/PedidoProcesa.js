import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { Box, Flex } from '@chakra-ui/react';
import { process_pedido } from '@CVApi/core/webpedido/PedidoService';
import React, { useState } from 'react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';

function PedidoProcesa({ isOpen, onClose, process, pedido }) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();

  const procesar = async () => {
    setloading(true);
    const result = await process_pedido(pedido.pedido_id);
    if (result?.pedido_id) process(result);
    else {
      setloading(false);
      CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }
  };

  const Courier = {
    olva: 'Olva Courier',
    minutes99: '99 Minutos',
    propio: 'Flota Propia'
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header='Detalle de envío'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton isLoading={loading} disabled={loading} onClick={procesar}>
              PROCESAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <CVText color='blue'>Verifica que los datos sean correctos.</CVText>
      <SizeBox />
      <CVGridText
        titleColor='green'
        contentColor='blue'
        options={[
          { title: 'ID Pedido', content: pedido?.custom_id || '' },
          { title: 'Producto', content: pedido?.producto || '' },
          {
            title: 'Direccion de recojo',
            content: pedido?.seller_direction || ''
          },
          {
            title: 'Courier',
            content: (
              <CVText fontWeight='bold' color='blue'>
                {Courier[pedido?.courier_code] || ''}
              </CVText>
            )
          }
        ]}
      />
      <SizeBox />
      <CVText textAlign='center' color='blue'>
        Haz clic en el siguiente botón para notificar al courier que recoja tu
        pedido.
      </CVText>
    </CVModal>
  );
}

export default PedidoProcesa;
