import React from 'react';

// UI components
import { Typography } from '@/common/components';

import { GlobalFilter } from './TableFilter';
// Styles
import { HeaderView, SubHeaderView } from './Table.styles';

// Table filters advanced

function Table({
  color: colorTheme,
  nameListCRUD,
  inputData,
  inputColumns,
  renderRowSubComponent
}) {
  return (
    <>
      <HeaderView>
        <SubHeaderView>
          <Typography
            fontWeight='bold'
            fontSize='18px'
            lineHeight='27px'
            marginBottom='15px'
          >
            {nameListCRUD}
          </Typography>
        </SubHeaderView>
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </HeaderView>
    </>
  );
}

export default Table;
