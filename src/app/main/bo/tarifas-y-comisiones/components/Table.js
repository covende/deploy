import React from 'react';

// UI components
import { Button, Heading } from '@chakra-ui/react';

// Styles
import { HeaderView, SubHeaderView } from './Table.styles';
import { CVDataTable } from '@/common/CovendeTemplate';
import useGetPermisions from '@/common/hooks/useGetPermisions';

// Table filters advanced
function Table({
  color: colorTheme,
  setOpenModal,
  nameListCRUD,
  inputData,
  inputColumns
}) {
  const { crear } = useGetPermisions('Backoffice', 'Tarifas y Comisiones');
  return (
    <div>
      <HeaderView>
        <SubHeaderView>
          <Heading size='md' fontSize='18px'>
            {nameListCRUD}
          </Heading>
        </SubHeaderView>
        {crear && (
          <Button variant='bo-primary' onClick={() => setOpenModal()}>
            Agregar Plan
          </Button>
        )}
      </HeaderView>
      <CVDataTable headers={inputColumns} data={inputData} />
    </div>
  );
}

export default Table;
