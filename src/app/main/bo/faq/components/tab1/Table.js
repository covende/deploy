import React, { useState } from 'react';

import { GlobalFilter } from '../TableFilter';
// Styles
import { HeaderView } from '../Table.styles';
import { CVButton, CVDataTable } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Flex } from '@chakra-ui/layout';
import PreguntaFaq from '../PreguntaFaq';
// Table filters advanced
function Table({ setOpenModal, setOpenModal2, inputData, inputColumns }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const ExpandData = ({ params, item }) => (
    <PreguntaFaq id={params} item={item} />
  );
  return (
    <div>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Flex justifyContent='end'>
        <CVButton onClick={() => setOpenModal()}>Crear Categoria</CVButton>
        <SizeBox />
        <CVButton onClick={() => setOpenModal2()}>Crear Preguntas</CVButton>
      </Flex>
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
