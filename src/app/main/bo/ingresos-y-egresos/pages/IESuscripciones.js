import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';
import React, { useEffect, useState } from 'react';
import IESTable from './IESuscripciones/IESTable';

import { Box, Flex } from '@chakra-ui/react';
import CVButton from '@CVTemplate/core/CVButton';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import IESFiltro from './IESuscripciones/IESFiltro';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { TOTAL_SUBSCRIPTIONS } from '@CVApi/core/faq/ClienteAsist/HelpService';
import { formatFecha } from '@/common/utils/methods';

const IESuscripciones = () => {
  const [total, settotal] = useState(0);
  const [filtro, setfiltro] = useState({
    search: '',
    daterange: [new Date(), new Date()]
  });

  const download = async () => {
    const { subscriptionsCSV } = await AxiosGQL(`{
       subscriptionsCSV(
       search: "${filtro.search}"
        ${
          formatFecha(filtro.startdate) != formatFecha(filtro.enddate)
            ? `date_range: { desde: "${filtro.startdate}", hasta: "${filtro.enddate}" }`
            : ``
        }
      )}`);
    return JSON.parse(subscriptionsCSV);
  };

  useEffect(() => {
    AxiosGQL(TOTAL_SUBSCRIPTIONS())
      .then(({ totalSubscriptions }) => settotal(totalSubscriptions))
      .catch((err) => console.log(err));
  }, [filtro]);

  return (
    <CVPanel height='auto' variant='box'>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Ingresos por suscripciones
        </CVText>
        <Box>
          <CVButton variant='outlined'>
            <Flex>
              <CVText fontWeight='bold' color='blue'>
                Total ingresado:
              </CVText>
              <SizeBox width='2rem' />
              <CVText>{CVMoneyFormat({ amount: total })}</CVText>
            </Flex>
          </CVButton>
        </Box>
      </Flex>
      <SizeBox />
      <IESFiltro filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <IESTable filtro={filtro} download={download} />
    </CVPanel>
  );
};

export default IESuscripciones;
