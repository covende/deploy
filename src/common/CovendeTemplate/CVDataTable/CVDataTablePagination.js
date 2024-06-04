import { Flex, HStack } from '@chakra-ui/react';
import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { BsTrash } from 'react-icons/bs';
import { left, leftleft, right, rightright } from './CVDataTableIcon';
import { LinkStyles } from './CVDataTableStyle';

function CVDataTablePagination({
  pagination,
  fetchdata,
  Download,
  selectable = false,
  selectedAction = () => {},
  selectedPosition = 'topLeft' || 'topRight' || 'bottomLeft',
  selectedComponente = <BsTrash />,
  backgroundColor
}) {
  const filtrosLs = JSON.parse(
    localStorage.getItem('filtros') || 'null',
    (key, value) => {
      if (
        typeof value === 'string' &&
        /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value)
      ) {
        return new Date(value);
      }
      return value;
    }
  );
  const Pages = () => (
    <Typography>
      {pagination.page} de {pagination.totalPages}
    </Typography>
  );
  const Enlaces = () => (
    <LinkStyles>
      <HStack>
        <Typography variant='caption'>Ir a la página</Typography>
        <Button
          onClick={() => fetchdata(1, 10, filtrosLs)}
          disabled={!pagination?.hasPrevPage}
          title='Primera página'>
          {leftleft(backgroundColor)}
        </Button>
        <Button
          onClick={() => fetchdata(pagination.prevPage, 10, filtrosLs)}
          disabled={!pagination?.hasPrevPage}
          title='Página anterior'>
          {left(backgroundColor)}
        </Button>
        <Button
          onClick={() => fetchdata(pagination.nextPage, 10, filtrosLs)}
          disabled={!pagination?.hasNextPage}
          title='Siguiente página'>
          {right(backgroundColor)}
        </Button>
        <Button
          disabled={pagination.page == pagination.totalPages}
          onClick={() => fetchdata(pagination.totalPages, 10, filtrosLs)}
          title='Última página'>
          {rightright(backgroundColor)}
        </Button>
      </HStack>
    </LinkStyles>
  );
  return (
    <Flex
      justifyContent='space-between'
      align='center'
      gap='5px'
      style={{ overflowX: 'auto', maxWidth: 'calc(100vw - 120px)' }}>
      {selectable && selectedPosition == 'bottomLeft' ? (
        <CVRow>
          <Box
            onClick={() => {
              console.log('onclick2,....');
              selectedAction(selecteds);
            }}>
            {selectedComponente}
          </Box>
        </CVRow>
      ) : (
        ''
      )}
      <Download />
      <Pages />
      <Enlaces />
    </Flex>
  );
}

export default CVDataTablePagination;
