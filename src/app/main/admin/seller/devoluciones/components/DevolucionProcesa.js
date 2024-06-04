import React, { useEffect, useState } from 'react';
import DFormulario from './DFormulario';
import { Container } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import { useParams } from 'react-router-dom';
import { fromBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react';
import DConfirma from './DModales/DConfirma';
import DAprobar from './DModales/DAprobar';
import DDisputa from './DModales/DDisputa';

function DevolucionProcesa({
  title,
  onClose: onClosem,
  isOpen: isOpenm,
  idpedido: idpedidom,
  iddevolucion: iddevolucionm,
  disputa: disputam,
  aprobar,
  fetchdata = () => {},
  ...rest
}) {
  const params = useParams();
  const idpedido = fromBase64(params.pedido_id);
  const iddevolucion = fromBase64(params.devolucion_id);
  const [confirma, setConfirma] = useState(false);
  const [devolver, setDevolver] = useState(false);
  const [disputa, setDisputa] = useState(false);
  return (
    <>
      {title != 'bo' ? (
        <Container>
          <CVText fontSize='1.5rem' fontWeight='bold' color='red'>
            Devoluciones
          </CVText>
          <SizeBox />
          <CVPanel itemDirection='column' padding='3rem'>
            <DFormulario
              // aprobar={aprobar}
              {...{ setConfirma, setDisputa, setDevolver, devolver }}
              idpedido={idpedido}
              iddevolucion={iddevolucion}
              fetchdata={fetchdata}
            />
          </CVPanel>
        </Container>
      ) : (
        // Backoffice
        <Modal onClose={onClosem} size='6xl' isOpen={isOpenm}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton style={{ color: '#004772' }} />
            <ModalBody>
              <DFormulario
                title={title}
                setDisputa={setDisputa}
                aprobar={aprobar}
                disputa={disputam}
                setDevolver={setDevolver}
                idpedido={idpedidom}
                iddevolucion={iddevolucionm}
                onClose={onClosem}
                fetchdata={fetchdata}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      <DConfirma
        fetchdata={async () =>
          await initdata(pagination?.page, pagination?.limit)
        }
        isOpen={confirma}
        onClose={() => setConfirma(false)}
        iddevolucion={title != 'bo' ? iddevolucion : iddevolucionm}
        title={title}
      />
      <DAprobar
        isOpen={devolver}
        onClose={() => setDevolver(false)}
        iddevolucion={title != 'bo' ? iddevolucion : iddevolucionm}
        title={title}
      />
      <DDisputa
        isOpen={disputa}
        onClose={() => setDisputa(false)}
        iddevolucion={title != 'bo' ? iddevolucion : iddevolucionm}
        title={title}
      />
    </>
  );
}

export default DevolucionProcesa;
