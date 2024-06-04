import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaCheckCircle } from 'react-icons/fa';
import CVButton from '@CVTemplate/core/CVButton';
import DVCRecepcion from '../DModales/DVCRecepcion';
import DVARecepcion from '../DModales/DVARecepcion';
import DVCRechazo from '../DModales/DVCRechazo';
import DVARechazo from '../DModales/DVARechazo';
import { useHistory } from 'react-router-dom';
function DDevolver({ iddevolucion, disputa, aprobar, fetchdata, satisfied_product }) {
  const [crecepcion, setcrecepcion] = useState(false);
  const [arecepcion, setarecepcion] = useState(false);

  const [crechazo, setcrechazo] = useState(false);
  const [arechazo, setarechazo] = useState(false);
  const history = useHistory();
  return (
    <>
      <CVText fontSize='1.5rem' fontWeight='bold' color='blue'>
        Información de la devolución
      </CVText>
      <Box>
        <SizeBox />
        <CVText fontSize='0.9rem'>
          El comprador ha notificado que envió el producto. Una vez que recibas
          el producto, tienes 2 días hábiles para notificar tu conformidad con
          el producto devuelto.
        </CVText>
        <SizeBox />
        <CVText fontSize='0.9rem'>
          Si tienes observaciones sobre el producto devuelto, diríjete a
          Mensajería para informar al comprador. Debes ser sumamente detallado
          en tu explicación de rechazo y adjuntar documentación sustentatoria de
          ser posible.
        </CVText>
        <SizeBox />
        <CVText color='primary' display='flex'>
          <FaCheckCircle />
          <SizeBox />
          El courier ha informado que recibiste el producto.
        </CVText>
        <SizeBox />
        <Flex width='100%'>
          <CVButton
            backgroundColor='green'
            disabled={!!satisfied_product}
            onClick={() => setcrecepcion(!crecepcion)}>
            Estoy conforme con el producto devuelto
          </CVButton>
        </Flex>
        <SizeBox />
        <Flex width='100%'>
          <CVButton
            variant='outlined'
            disabled={!!satisfied_product}
            onClick={() => setcrechazo(!crechazo)}
            color='green'>
            No estoy conforme con el producto devuelto
          </CVButton>
        </Flex>

        {crecepcion && (
          <DVCRecepcion
            iddevolucion={iddevolucion}
            isOpen={crecepcion}
            onClose={() => setcrecepcion(!crecepcion)}
            process={async () => {
              await fetchdata();
              setcrecepcion(!crecepcion);
              setarecepcion(!arecepcion);
            }}
          />
        )}
        {arecepcion && (
          <DVARecepcion
            isOpen={arecepcion}
            onClose={() => setarecepcion(!arecepcion)}
            process={() => {
              setarecepcion(!arecepcion);
            }}
          />
        )}

        {crechazo && (
          <DVCRechazo
            iddevolucion={iddevolucion}
            isOpen={crechazo}
            onClose={() => setcrechazo(!crechazo)}
            process={async () => {
              await fetchdata();
              setcrechazo(!crechazo);
              setarechazo(!arechazo);
            }}
          />
        )}
        {arechazo && (
          <DVARechazo
            isOpen={arechazo}
            onClose={() => setarechazo(!arechazo)}
            process={() => {
              history.push('/seller/mensajes/' + iddevolucion);
              setarechazo(!arechazo);
            }}
          />
        )}
      </Box>
      <SizeBox />
    </>
  );
}

export default DDevolver;
