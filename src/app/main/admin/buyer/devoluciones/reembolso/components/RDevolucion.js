import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { devolucion_by_id_reason } from '@CVApi/core/webdevolucion/DevService';
import CVGridText from '@CVTemplate/core/CVGridText';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVText from '@CVTemplate/core/CVText';
import React, { useEffect, useState } from 'react';

const RDevolucion = ({ reembolso, devolucion }) => {
  const [devolution, setdevolution] = useState({});
  const initdata = async () => {
    console.log({ reembolso });
    const result = await devolucion_by_id_reason(reembolso.devolution_id);
    if (result) setdevolution(result);
  };
  initdata();
  useEffect(() => {
    if (reembolso?.devolution_id) initdata();
  }, [reembolso?.devolution_id]);
  return (
    <>
      <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
        Devolución de pedido
      </CVText>
      <SizeBox />

      <CVGridText
        titleColor='black'
        options={[
          {
            title: 'Fecha de solicitud:',
            content: CVFormatDate({
              date: devolucion?.request_date,
              time: true
            })
          },
          {
            title: 'Razón de Devolución:',
            content: devolucion?.detail
          }
        ]}
      />
      <SizeBox />
    </>
  );
};

export default RDevolucion;
