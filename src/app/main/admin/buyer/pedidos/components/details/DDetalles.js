import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { Box } from '@chakra-ui/layout';
import React from 'react';

function DDetalles({ pedido }) {
  console.log({ pedido });
  return (
    <Box>
      <SizeBox />
      <CVText color='blue' fontSize='1.5rem' fontWeight='bold'>
        Detalles de Pedido
      </CVText>
      <SizeBox />
      <CVPanel>
        <CVGridText
          maxWidth='400px'
          options={[
            // { title: 'Nombre:', content: pedido?.receiver_first_name || '' },
            // { title: 'Apellido:', content: pedido?.receiver_last_name || '' },

            {
              title: 'Fecha de compra:',
              content:
                CVFormatDate({ date: pedido?.fecha_compra, time: true }) || ''
            },
            {
              title: 'Medio de Pago:',
              content: pedido?.methodPayment?.title || ''
            },
            { title: 'Courier:', content: pedido?.courier?.title || '' },
            {
              title: 'Lugar de Entrega:',
              content: pedido?.receiver_direction || ''
            },
            { title: 'Referencia:', content: pedido?.receiver_reference || '' },
            { title: 'Región:', content: pedido?.departamento?.name || '' },
            { title: 'Distrito:', content: pedido?.provincia?.name || '' },
            { title: 'Provincia:', content: pedido?.distrito?.name || '' }
          ]}
        />
      </CVPanel>
    </Box>
  );
}

export default DDetalles;
