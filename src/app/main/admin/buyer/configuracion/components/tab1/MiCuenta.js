import React from 'react';
import { useState } from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import MiProfile from './MiProfile';
import RequestModification from './RequestModification';
import { Flex } from '@chakra-ui/react';
import CVCheck from '@CVTemplate/core/CVCheck';

function MiCuenta() {
  const [inWhatapp, setInWhatapp] = useState(false);
  return (
    <>
      <MiProfile />
      <RequestModification />
      {/* <Flex alignItems='center'>
        <CVCheck
          titleAlign='left'
          value={inWhatapp}
          onChange={(value) => setInWhatapp(value)}
          title='Quiero recibir alertas sobre el estado de mis pedidos por WhatsApp'
        />
        <span style={{ color: 'green', fontSize: '2rem' }}>
          <BsWhatsapp />
        </span>
      </Flex> */}
    </>
  );
}

export default MiCuenta;
