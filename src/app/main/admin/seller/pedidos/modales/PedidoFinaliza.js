import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLink, CVModal, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { BsFileEarmark } from 'react-icons/bs';

function PedidoFinaliza({ isOpen, onClose, process, pedido, basepath }) {
  return (
    <CVModal
      size='2xl'
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header='¡Listo! Has procesado tu pedido'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={process}>ACEPTAR</CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />

      <CVText color='blue'>
        Imprime la Guía de envío y pégala en el paquete a enviar.
      </CVText>
      <SizeBox />

      <Flex justifyContent='center'>
        <Box position='relative'>
          <CVLink
            href={basepath + '/api.shippingguidepdf/' + pedido?.guide_number}
            target='_blank'
            color='blue'>
            <BsFileEarmark
              style={{ color: COLORS['blue'], fontSize: '100px' }}
            />
            <Box
              color='white'
              rounded='0.5rem'
              backgroundColor={COLORS['blue']}
              position='absolute'
              padding='0.5rem'
              top='40px'>
              <CVLink
                href={
                  basepath + '/api.shippingguidepdf/' + pedido?.guide_number
                }
                target='_blank'>
                <CVText fontSize='0.85rem' color='white'>
                  Descargar
                </CVText>
              </CVLink>
            </Box>
          </CVLink>
        </Box>
      </Flex>
      <SizeBox />
      <CVLink
        href={basepath + '/api.shippingguidepdf/' + pedido?.guide_number}
        target='_blank'
        color='blue'>
        <Flex fontSize='16px' justifyContent='center' width='100%'>
          <CVText color='green' fontWeight='bold'>
            Número de guía:&nbsp;
          </CVText>
          <CVText fontSize='16px' color='blue'>
            {pedido?.guide_number || ''}
          </CVText>
          <SizeBox />
        </Flex>
      </CVLink>

      <SizeBox />

      <CVText textAlign='center' color='blue'>
        Deberás entregar una copia al courier cuando venga a recoger el pedido.
        Puedes guardar otra copia para tus registros. Además, recuerda tomar
        fotos del contenido del paquete para guardar evidencias.
      </CVText>
      <SizeBox />

      <CVText fontWeight='bold' color='blue'>
        El courier vendrá a recoger tu pedido pronto.{' '}
      </CVText>
      <SizeBox />

      {pedido?.tracking?.remito != undefined && pedido?.tracking?.remito != '' && (
        <>
          <CVText color='blue'>
            Podrás hacer seguimiento a tu pedido usando este número de Tracking
            en la web del courier:
          </CVText>
          <SizeBox />
          <Flex justifyContent='center'>
            <Box rounded='1rem' padding='3px 1rem' backgroundColor='gray.300'>
              <CVText color='green'>{pedido?.tracking?.remito}</CVText>
            </Box>
          </Flex>
        </>
      )}
    </CVModal>
  );
}

export default PedidoFinaliza;
