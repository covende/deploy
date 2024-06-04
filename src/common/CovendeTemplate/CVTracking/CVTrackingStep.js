import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { CVLine } from '..';
import {
  COMPLETADO_ICONS,
  ENVIADO_ICONS,
  PENDIENTE_ICONS,
  PROCESADO_ICONS
} from './CVTrackingIcons';
import { colorByStatusValue } from './CVTrackingMethods';
import { CVTrackingStepIcon, CVTrackingStepSimbol } from './CVTrackingStyles';

function CVTrackingStep({
  titles,
  variant,
  estado = 'PENDING_PAY',
  trackings
}) {
  let color = (status) => {
    const colordata = colorByStatusValue(status, estado, variant) || '#ECECEC';
    return colordata;
  };

  let content = (status, icons) => (
    <Box
      display='flex'
      alignItems='center'
      width='36px'
      height='36px'
      bgColor={color(status)}
      borderRadius='100%'>
      {icons}
    </Box>
  );

  let iconos = {
    PENDING: {
      devolucion: (
        <CVTrackingStepSimbol
          color={color('PENDING')}
          style={{ backgroundColor: color('PENDING') }}>
          <div style={{ color: '#FFFFFF' }}>1</div>
        </CVTrackingStepSimbol>
      ),
      pedido: content('PENDING', PENDIENTE_ICONS)
    },
    PROCESSED: {
      devolucion: (
        <CVTrackingStepSimbol
          color={color('PROCESSED')}
          style={{ backgroundColor: color('PROCESSED') }}>
          <div style={{ color: '#FFFFFF' }}>2</div>
        </CVTrackingStepSimbol>
      ),
      pedido: content('PROCESSED', PROCESADO_ICONS)
    },
    SENDED: {
      devolucion: (
        <CVTrackingStepSimbol
          color={color('SENDED')}
          style={{ backgroundColor: color('SENDED') }}>
          <div style={{ color: '#FFFFFF' }}>3</div>
        </CVTrackingStepSimbol>
      ),
      pedido: content('SENDED', ENVIADO_ICONS)
    },
    COMPLETED: {
      devolucion: (
        <CVTrackingStepSimbol
          color={color('COMPLETED')}
          style={{ backgroundColor: color('COMPLETED') }}>
          <div style={{ color: '#FFFFFF' }}>4</div>
        </CVTrackingStepSimbol>
      ),
      pedido: content('COMPLETED', COMPLETADO_ICONS)
    }
  };
  return (
    <Flex justifyContent='space-between'>
      <CVTrackingStepIcon
        color={color('PENDING')}
        title={titles.step1}
        track={trackings.length > 0 ? trackings[0] : {}}
        icono={iconos['PENDING'][variant]}
      />
      <CVLine lineHeight='1px' color={color('PENDING')} />
      <CVTrackingStepIcon
        color={color('PROCESSED')}
        title={titles.step2}
        track={trackings.length > 1 ? trackings[1] : {}}
        icono={iconos['PROCESSED'][variant]}
      />
      <CVLine lineHeight='1px' color={color('PROCESSED')} />
      <CVTrackingStepIcon
        color={color('SENDED')}
        title={titles.step3}
        track={trackings.length > 2 ? trackings[2] : {}}
        icono={iconos['SENDED'][variant]}
      />
      <CVLine lineHeight='1px' color={color('SENDED')} />
      <CVTrackingStepIcon
        color={color('COMPLETED')}
        title={titles.step4}
        track={trackings.length > 3 ? trackings[3] : {}}
        icono={iconos['COMPLETED'][variant]}
      />
    </Flex>
  );
}

export default CVTrackingStep;
