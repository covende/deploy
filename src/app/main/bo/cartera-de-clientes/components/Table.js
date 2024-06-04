import React, { useState } from 'react';

// UI components
import { GlobalFilter } from './TableFilter';
import { CVDataTable, CVText } from '@/common/CovendeTemplate';

// Table filters advanced
function Table({ color: colorTheme, nameListCRUD, inputData, inputColumns }) {
  const [globalFilter, setGlobalFilter] = useState('');
  return (
    <div>
      <div>
        <div>
          <CVText fontWeight='bold' fontSize='1.5rem'>
            {nameListCRUD}
          </CVText>
        </div>
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <CVDataTable data={inputData} headers={inputColumns} />
    </div>
  );
}

export default Table;
