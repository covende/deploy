import React from 'react';

// Assets
import {
  svgCanFirstPage,
  svgCanPreviousPage,
  svgCanNextPage,
  svgCanLastPage
} from '@/app/assets/images/SVG';

// Common components
import {
  StylePagination,
  StyledButton,
  StyledSelect,
  StyledInput
} from './Table.styles';

const TablePagination = (props) => {
  const {
    color: colorTheme,
    pageIndex,
    pageSize,
    pageCount,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize
  } = props;

  const numberRegistersByPage = (
    <div style={{ display: 'flex' }}>
      {'Mostrar filas:'}
      <StyledSelect
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </StyledSelect>
    </div>
  );

  const pageIndexed = (
    <div>
      <span>
        <strong>
          {pageIndex + 1} de {pageOptions.length}
        </strong>
      </span>{' '}
    </div>
  );

  const pageNavigation = (
    <div style={{ display: 'flex' }}>
      <span style={{ display: 'flex' }}>
        Ir a:{' '}
        <StyledInput
          type='number'
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '42px', backgroundColor: 'white' }}
        />
      </span>
      <StyledButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {svgCanFirstPage}
      </StyledButton>{' '}
      <StyledButton onClick={() => previousPage()} disabled={!canPreviousPage}>
        {svgCanPreviousPage}
      </StyledButton>{' '}
      <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>
        {svgCanNextPage}
      </StyledButton>{' '}
      <StyledButton
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        {svgCanLastPage}
      </StyledButton>{' '}
    </div>
  );

  return (
    <StylePagination color={colorTheme}>
      {numberRegistersByPage}
      {pageIndexed}
      {pageNavigation}
    </StylePagination>
  );
};

export default TablePagination;
