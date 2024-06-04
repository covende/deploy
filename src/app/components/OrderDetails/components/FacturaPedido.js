import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
import { Flex, Box } from '@chakra-ui/react';
import React from 'react';

function FacturaPedido({ data }) {
  return (
    <Flex width='100%' flexDirection='column'>
      <Flex width='100%'>
        <Flex width='25%'>Tipo:</Flex>
        <Flex width='75%' color='#828282'>
          {data.information?.invoice_emit
            ? data.information?.invoice_emit
            : 'No hay Datos'}
        </Flex>
      </Flex>

      {data.information?.invoice_emit == 'Factura' && (
        <Flex width='100%'>
          <Flex width='25%'>Razón social</Flex>
          <Flex width='75%' color='#828282'>
            {data.information?.buyer_social_razon
              ? data.information?.buyer_social_razon
              : 'No hay datos'}
          </Flex>
        </Flex>
      )}

      <Flex width='100%'>
        <Flex width='25%'>
          {data.information?.invoice_emit
            ? data.information?.invoice_emit == 'Factura'
              ? 'RUC'
              : 'DNI'
            : 'No hay Datos'}
        </Flex>
        <Flex width='75%' color='#828282'>
          {data.information?.customer_document
            ? data.information?.customer_document
            : 'No hay datos'}
        </Flex>
      </Flex>
      <SizeBox />

      <Flex width='100%' flexDirection='row'>
        <Box>
          <CVText>
            <b>Nota:</b> El vendedor se hace responsable de emitir correctamente
            el comprobante de pago.
          </CVText>
        </Box>
      </Flex>
    </Flex>
  );
}

export default FacturaPedido;
