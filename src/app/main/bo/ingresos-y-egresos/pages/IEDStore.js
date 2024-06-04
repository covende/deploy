import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';
import React, { useState } from 'react';
import IEDSTable from './IEDStore/IEDSTable';

import { Box, Flex } from '@chakra-ui/react';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useParams } from 'react-router-dom';
import { CVFormatCutCode, CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVLink from '@CVTemplate/core/CVLink';
import CBOTotales from './IEDStore/IEBSTotales';

const IEDStore = () => {
  const { cut_code } = useParams();
  const [paymentStatus, setPaymentStatus] = useState('ALL');

  return (
    <CVPanel height='auto' variant='box'>
      <CBOTotales setPaymentStatus={setPaymentStatus} cut_code={cut_code} />
      <SizeBox />
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Corte quincenal por tienda
        </CVText>
        <CVText fontWeight='bold' color='green' fontSize='1.5rem'>
          {cut_code} | {CVFormatCutCode(cut_code)}
        </CVText>
        <Box>
          <CVLink
            href={`/bo/ingresos-y-egresos/depositos/${cut_code}/transaciones`}
            text={<CVButton>Ver transacciones</CVButton>}
          />
        </Box>
      </Flex>
      <SizeBox />
      <IEDSTable
        store_id={cut_code}
        paymentStatus={paymentStatus}
        setPaymentStatus={setPaymentStatus}
      />
    </CVPanel>
  );
};

export default IEDStore;
