import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInputFileLink, CVText } from '@/common/CovendeTemplate';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { Box, Flex } from '@chakra-ui/layout';
import { pedidos } from '@CVPages/core/admin/buyer/inicio/BuyerInicioUtils';
import CVLink from '@CVTemplate/core/CVLink';
import React, { useState } from 'react';
import { IoDocumentAttachOutline } from 'react-icons/io5';

function DProducto({ devolucion, setdevolucion, pedido, title, type }) {
  const [nota, setnota] = useState({
    data: '',
    name: ''
  });

  return (
    <Box>
      <CVGridText
        options={[
          {
            title: 'ID de pedido:',
            content: pedido?.custom_id
          },
          {
            title: 'Producto:',
            content: pedido?.producto
          },
          {
            title: 'Vendedor:',
            content:
              pedido?.company?.comercial_name != '-'
                ? pedido?.company?.comercial_name
                : pedido?.company?.social_razon
          },
          {
            title: 'Precio:',
            content: CVMoneyFormat({ amount: pedido?.final_unit_price || 0 })
          },
          {
            title: 'Tipo de comprobante:',
            content: pedido?.ruc_buyer?.length > 8 ? 'Factura' : 'Boleta'
          },
          {
            title: 'Dirección de envío:',
            content: pedido?.receiver_direction
          }
        ]}
      />

      <SizeBox />
      {title != 'bo' && (
        <CVLink
          href={
            type == 'buyer'
              ? '/buyer/pedidos/detalle/' + devolucion?.idpedido
              : '/seller/pedidos?search=' +
                String(devolucion?.custom_id).replace('DEV', '')
          }
          /// href={'/seller/pedidos/detalle/'}
          target='_blank'
          disabled={!devolucion?.idpedido}>
          <CVButton backgroundColor={devolucion?.idpedido ? 'primary' : 'gray'}>
            Ver detalle
          </CVButton>
        </CVLink>
      )}
      <SizeBox />
      <Flex justifyContent='space-between'>
        {/* <CVInputFileLink
          onChange={(result) =>
            setdevolucion({
              ...devolucion,
              producto: { ...devolucion.producto, note_pdf: result.data }
            })
          }>
          Adjuntar Nota de Crédito
        </CVInputFileLink> */}
        <a href={nota.data} target='_blank'>
          {devolucion?.producto?.note_pdf != '' ? (
            <CVText>
              <IoDocumentAttachOutline /> {devolucion?.producto?.note_pdf}
            </CVText>
          ) : (
            <></>
          )}
        </a>
      </Flex>
    </Box>
  );
}

export default DProducto;
