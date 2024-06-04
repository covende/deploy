import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { v4 } from 'uuid';
import { CVText } from '..';
import { CVEstadoDevolucion } from '../CVEstado/CVEstadoDevolucion';
import { CVEstadoPedido } from '../CVEstado/CVEstadoPedido';
import { COLORS } from '../CVThemes';

function CVTrackingTrack({ trackings, status, variant }) {
  let activeColor =
    variant == 'pedido'
      ? CVEstadoPedido(status).color || 'gray'
      : CVEstadoDevolucion(status).color;
  let color = (active) =>
    (status == 'PENDING_PAY' || status == 'RETURNED') && active
      ? 'black'
      : active
      ? activeColor
      : 'gray';

  return (
    <Flex flexDirection='column' width='100%' maxHeight='100%' overflow='auto'>
      {trackings.map((item, idx) => (
        <Flex key={v4()} width='100%' alignItems='stretch'>
          <Flex
            width='35%'
            alignItems='end'
            flexDirection='column'
            justifyContent='center'
            mt={5}>
            <CVText
              fontWeight='bold'
              fontSize='0.9rem'
              textAlign='end'
              color={color(item.active)}>
              {item.date}
            </CVText>
            <CVText
              fontSize='0.9rem'
              textAlign='end'
              color={color(item.active)}>
              {item.time}
            </CVText>
          </Flex>
          <Flex width='5%' alignItems='center' flexDirection='column'>
            <Box
              my={2}
              height={2}
              border='1px'
              borderLeftColor='gray.200'></Box>
            <CVText>
              {item.active ? (
                <BsCheckLg
                  style={{
                    color: COLORS[color(item.active)],
                    fontSize: '0.84rem'
                  }}
                />
              ) : (
                <VscCircleLargeFilled
                  style={{
                    color: COLORS[color(item.active)],
                    fontSize: '0.84rem'
                  }}
                />
              )}
            </CVText>
            {/* <CVText>|</CVText> */}
          </Flex>
          <Flex width='60%' alignItems='center' mt={2}>
            <CVText fontSize='0.9rem' color={color(item.active)}>
              {item.text}
            </CVText>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default CVTrackingTrack;
