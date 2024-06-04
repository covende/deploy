import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { devolucion_by_id_reason } from '@CVApi/core/webdevolucion/DevService';
import CVGridText from '@CVTemplate/core/CVGridText';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVText from '@CVTemplate/core/CVText';
import { CVInput } from '@CVTemplate/core/index';
import React, { useEffect, useState } from 'react';

const RCancelacion = ({ reembolso, reason }) => {
  return (
    <>
      <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
        Cancelacion de pedido
      </CVText>
      <SizeBox />

      <CVGridText
        titleColor='black'
        options={[
          {
            title: 'Fecha de solicitud:',
            content: CVFormatDate({
              date: reembolso?.request_date,
              time: false
            })
          },
          {
            title: 'Razón de Cancelacion:'
          },
          {
            title: (
              <CVInput
                marginTop='5px'
                height='40px'
                width='174%'
                disabled
                value={reason?.title}
              />
            )
          }
        ]}
      />
      <SizeBox />
    </>
  );
};

export default RCancelacion;
