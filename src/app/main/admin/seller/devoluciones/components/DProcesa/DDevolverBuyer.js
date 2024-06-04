import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVText from '@CVTemplate/core/CVText';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import CVLink from '@CVTemplate/core/CVLink';
import DVCEnviado from '../DModales/DVCEnviado';
import DVAEnviado from '../DModales/DVAEnviado';
import { add_pedido_refund } from '@CVApi/core/webreembolso/ReemServices';
import { useHistory } from 'react-router-dom';

function DDevolverBuyer({
  devolucion,
  iddevolucion,
  guia_pdf = '',
  fetchdata,
  confirm_shipment_product
}) {
  const [cenviado, setcenviado] = useState(false);
  const [aenviado, setaenviado] = useState(false);
  const [isRefunded, setIsRefunded] = useState(false);
  const history = useHistory();

  return (
    <>
      {devolucion?.satisfied_product ? (
        <CVLink>
          <CVButton
            backgroundColor='red'
            onClick={async () => {
              await add_pedido_refund({
                pedido_id: devolucion?.idpedido,
                provenance_custom_id: iddevolucion,
                provenance_type: 'DEVOLUTION'
              });
              await history.push(
                '/buyer/reembolso/devolution/' + devolucion?.idpedido
              );
            }}>
            {isRefunded ? 'Ver Reembolso' : 'Solicitar Reembolso'}
          </CVButton>
        </CVLink>
      ) : (
        ''
      )}
      <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
        Información Para la devolución
      </CVText>
      <CVText fontSize='0.9rem'>
        Tienes 3 días hábiles desde la aprobación de la solicitud para enviar el
        producto.
        {devolucion?.courier_type == 'propio'
          ? ''
          : 'Sigue los siguientes pasos:'}
      </CVText>

      <Box>
        <SizeBox />

        {devolucion?.courier_type == 'propio' ? (
          <Flex alignItems='center'>
            <CVText marginRight='5px'>
              <p>
                Puede comunicarse con el vendedor {''}
                <b>{devolucion?.company?.name || ''}</b> al siguiente número:{' '}
                {''}
                <b>+51 {devolucion?.company?.phone || '+51 XXXXXXXXX'}</b>, para
                el recojo o envío del paquete según lo indique.
              </p>
            </CVText>
          </Flex>
        ) : (
          <>
            <Flex alignItems='center'>
              <CVText fontSize='0.9rem' marginRight='5px'>
                a. Imprime la Guía de devolución :
              </CVText>
              {devolucion?.idpedido && (
                <CVLink
                  target='_blank'
                  href={
                    process.env.API_URL +
                    '/api.devolutionguidepdf/' +
                    devolucion.idpedido
                  }>
                  <Flex alignItems='center'>
                    <IoDocumentAttachOutline />
                    <SizeBox />
                    <CVText color='primary'>Guia de Devolución</CVText>
                  </Flex>
                </CVLink>
              )}
              <Box>
                <SizeBox />
              </Box>
            </Flex>
            <SizeBox />
            <CVText fontSize='0.9rem'>
              b. Empaca el producto tal como indica nuestro{' '}
              <CVLink href='/ayuda' target='_blank'>
                Manual de Devoluciones.
              </CVLink>
              No cumplir los requisitos invalida del proceso de devolución
              automáticamente.
            </CVText>
            <SizeBox />
            <CVText fontSize='0.9rem'>
              {devolucion?.courier_type == 'propio'
                ? 'c. Estar atento al courier. Se comunicará contigo para recoger o llevar el paquete según se lo indique.'
                : 'c. Lleva el paquete a la agencia Olva más cercana.'}
            </CVText>
            <SizeBox />
            <CVText fontSize='0.9rem'>
              d. Solo después de haber embarcado el producto, marca el siguiente
              botón:
            </CVText>
          </>
        )}

        <SizeBox />

        <Flex width='100%'>
          <Box>
            <CVButton
              backgroundColor='red'
              disabled={!!(confirm_shipment_product != null)}
              onClick={() => setcenviado(!cenviado)}>
              {!!(confirm_shipment_product != null)
                ? 'Confirmaste el envío del producto'
                : 'Confirmo que envié el producto'}
            </CVButton>
          </Box>
        </Flex>

        {cenviado && (
          <DVCEnviado
            iddevolucion={iddevolucion}
            isOpen={cenviado}
            courier_type={devolucion?.courier_type}
            onClose={() => setcenviado(!cenviado)}
            process={async () => {
              await fetchdata();
              setcenviado(!cenviado);
              setaenviado(!aenviado);
            }}
          />
        )}
        {aenviado && (
          <DVAEnviado
            isOpen={aenviado}
            onClose={() => setaenviado(!aenviado)}
            process={() => {
              setaenviado(!aenviado);
            }}
          />
        )}
      </Box>

      <SizeBox />
    </>
  );
}

export default DDevolverBuyer;
