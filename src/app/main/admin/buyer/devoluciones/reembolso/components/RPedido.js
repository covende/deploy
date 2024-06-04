import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { pedido_details_by_id } from '@CVApi/core/webadmin/PedidoService';
import CVGridText from '@CVTemplate/core/CVGridText';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import CVText from '@CVTemplate/core/CVText';
import React, { useEffect, useState } from 'react';

const RPedido = ({ reembolso }) => {
  const [pedido, setpedido] = useState({});
  const initdata = async () => {
    const result = await pedido_details_by_id(reembolso?.pedido_id);
    if (result) setpedido(result);
  };

  useEffect(() => {
    if (reembolso?.pedido_id) initdata();
  }, [reembolso?.pedido_id]);
  return (
    <>
      <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
        Informacion del Pedido
      </CVText>
      <SizeBox />

      <CVGridText
        titleColor='black'
        options={[
          {
            title: 'Producto:',
            content: pedido?.producto || ''
          },
          {
            title: 'Tienda:',
            content: pedido?.company?.comercial_name || ''
          },
          {
            title: 'Precio:',
            content: CVMoneyFormat({ amount: pedido?.total || '0' })
          },
          {
            title: 'Medio de pago:',
            content: pedido?.methodPayment?.title || ''
          }
        ]}
      />
      <SizeBox />
    </>
  );
};

export default RPedido;
