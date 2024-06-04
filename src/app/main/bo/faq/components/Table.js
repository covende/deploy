import React, { useState } from 'react';

import { GlobalFilter } from './TableFilter';
// Styles
import { HeaderView } from './Table.styles';
import { CVButton, CVDataTable } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Flex } from '@chakra-ui/layout';
import { Button, Box } from '@chakra-ui/react';
import PreguntaFaq from './PreguntaFaq';
import useGetPermisions from '@/common/hooks/useGetPermisions';
// Table filters advanced
function Table({ setOpenModal, setOpenModal2, inputData, inputColumns }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const TableFaqPermisions = useGetPermisions(
    'Backoffice',
    'Preguntas Frecuentes'
  );
  const ExpandData = ({ params, item }) => (
    <PreguntaFaq id={params} item={item} />
  );
  return (
    <div>
      {TableFaqPermisions.crear && (
        <Flex justifyContent='end'>
          <CVButton onClick={() => setOpenModal()}>Crear Categoria</CVButton>
          <SizeBox />
          <CVButton onClick={() => setOpenModal2()}>Crear Preguntas</CVButton>
        </Flex>
      )}
      <SizeBox />

      <CVDataTable
        ExpandData={ExpandData}
        data={inputData}
        headers={inputColumns}
      />
    </div>
  );
}

export default Table;
