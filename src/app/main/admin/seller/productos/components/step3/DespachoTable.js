import { Trash } from '@/app/assets/icons';
import { Box, Flex } from '@chakra-ui/react';
import { Table, Td, Th, Thead, Tr, Tbody } from '@chakra-ui/table';
import { Input, Center } from '@chakra-ui/react';
import { Button } from '@material-ui/core';
//import { lstat } from 'fs';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { TableDespacho } from './DespachoStyles';
import { useToast } from '@chakra-ui/toast';
import { CVText } from '@CVTemplate/core/index';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { onlyNumber } from '@CVTemplate/core/CVValidation';

function DespachoTable({ despacha, setDespacha }) {
  const [state, setstate] = useState(despacha.wholesales);
  const addToast = useToast();
  const removeItem = (ind) => {
    let ls = state.filter((da, idx) => ind != idx);
    setstate(ls);
    setDespacha({ ...despacha, wholesales: ls });
  };

  const updateDayDespacho = (id, day) => {
    const value = onlyNumber(day);

    if (value > 7) {
      CVAlertError({
        addToast,
        message: 'Este campo no pude ser mayor que 7 días'
      });

      value = 7;
    }

    let dato = state.map((dispatch) =>
      dispatch.id === id
        ? {
            ...dispatch,
            preparation_time: {
              value: value == 0 ? 0 : Number(value),
              type: 'días'
            }
          }
        : dispatch
    );

    setstate(dato);

    setDespacha({ ...despacha, wholesales: dato });
  };

  return (
    <Box>
      <TableDespacho>
        <Table variant='simple' size='lg'>
          <Thead>
            <Tr>
              <Th>
                <CVText># Mínimo</CVText>
              </Th>
              <Th>
                <CVText># Máximo</CVText>
              </Th>
              <Th>
                <CVText>Precio (S/)</CVText>
              </Th>

              <Th>
                <Box>Tiempo de Preparación</Box>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.map((it, ind) => (
              <Tr key={v4()}>
                <Td>
                  <CVText>{it.minimum_order}</CVText>
                </Td>
                <Td>
                  <CVText>{it.maximum_order_text}</CVText>
                </Td>
                <Td>
                  <CVText>{it.price}</CVText>
                </Td>

                <Td>
                  <Center>
                    <Box py={22}>
                      <Input
                        w='12'
                        borderRadius={6}
                        value={it?.preparation_time?.value || ''}
                        onChange={(e) =>
                          updateDayDespacho(it.id, e.target.value || '')
                        }
                        size='xs'
                      />
                      &nbsp;&nbsp;días
                    </Box>
                  </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableDespacho>
      {/* DATA MOSTRADA DATO EN EL PANEL CARAHDOIJF
      {JSON.stringify(despacha)} */}
    </Box>
  );
}
export default DespachoTable;
