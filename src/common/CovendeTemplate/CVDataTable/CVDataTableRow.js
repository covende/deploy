import React, { useCallback, useMemo, useState } from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Fragment } from 'react';
import { v4 } from 'uuid';
import { CVCheck, CVText } from '..';
import { estadoColor } from '../../utils';
import { COLORS } from '../CVThemes';
import { RowStyle } from './CVDataTableStyle';
import { Box } from '@chakra-ui/react';

function CVDataTableRow({
  item,
  ExpandData,
  headers,
  selectable,
  selecteds,
  setselecteds,
  unSelecteds,
  setUnSelecteds,
  checkAll,
  expandIcon,
  collapseIcon
}) {
  const addselected = () => {
    setselecteds([...selecteds, item.params || '']);
    setUnSelecteds(unSelecteds.filter((unsel) => unsel !== item.params));
  };

  const remselected = () => {
    setselecteds(selecteds.filter((it) => it != (item.params || '')));
    if (checkAll) setUnSelecteds([...new Set([...unSelecteds, item.params])]);
  };

  const [expand, setExpand] = useState(false);

  headers = useMemo(
    () => [
      ...(selectable
        ? [{ label: '.', data: 'selectable', align: 'center', first: true }]
        : []),
      ...headers
    ],
    [selectable]
  );

  headers = useMemo(
    () =>
      headers.map((it, idx) =>
        selectable && idx == 0
          ? { ...it, first: true }
          : { ...it, first: selectable ? false : it.first }
      ),
    [selectable]
  );

  item = useMemo(
    () => ({
      ...(selectable
        ? {
            selectable: (
              <CVCheck
                value={selecteds.includes(item.params || '')}
                onChange={(value) => (value ? addselected() : remselected())}
              />
            )
          }
        : {}),
      ...item
    }),
    [selecteds]
  );

  let borderColor = useMemo(
    () =>
      item.borderColor
        ? COLORS[item.borderColor || 'gray']
        : estadoColor(
            item.status
              ? (item.status || 'IN_DRAFT').toString().toUpperCase()
              : 'IN_DRAFT'
          ),
    [item.borderColor, item.status]
  );
  //  console.log({headers})
  return (
    <Fragment>
      <TableRow>
        {headers.map((it) => (
          <TableCell
            key={v4()}
            component='th'
            scope='row'
            data-label={it.label}>
            <RowStyle
              textAlign={it.align || 'start'}
              last={it.last}
              first={it.first}
              borderColor={borderColor}
              selected={expand}>
              {it.type == 'render' ? (
                <>{item[it.data](expand, () => setExpand(!expand))}</>
              ) : (
                item[it.data]
              )}
            </RowStyle>
          </TableCell>
        ))}
      </TableRow>

      {expand ? (
        <TableRow>
          <TableCell component='th' scope='row' colSpan={headers.length}>
            <Box className='expanded'>
              <ExpandData
                params={item.params || { ...item }}
                item={{ ...(item.item || item) }}
              />
            </Box>
          </TableCell>
        </TableRow>
      ) : (
        <></>
      )}
    </Fragment>
  );
}

export default React.memo(CVDataTableRow);
