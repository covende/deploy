import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { CVDataTableStyle } from './CVDataTable/CVDataTableStyle';
import { Box } from '@material-ui/core';
import CVDataTableRow from './CVDataTable/CVDataTableRow';
import { v4 } from 'uuid';
import CVDataTablePagination from './CVDataTable/CVDataTablePagination';
import { Skeleton } from '@chakra-ui/react';
import { CVRow } from '.';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { COLORS } from './CVThemes';
import CVText from './CVText';

const formatoheader = [
  {
    label: '',
    last: false || true,
    first: false || true,
    data: '',
    align: 'left',
    type: 'text' || 'render'
  }
];

const allheadervalues = {};

const formatodata = [
  {
    ...allheadervalues,
    acciones: (isOpen, onClose) => {},
    expand: false,
    params: 'id',
    item: 'Object',
    borderColor: 'COLORS[:borderColor]',
    status: 'STATUS'
  }
];

const datavalue = formatodata[formatoheader.data];

/**
 *
 * @param {Object} param0
 * @param {[{label:String, first:Boolean, last:Boolean, data:String, align:('left' | 'center' | 'right'), type:('text' | 'render')}]} param0.headers
 * @param {[{[data]:any,acciones: Function, expand: Boolean, params: String, item: Object, borderColor: ('primary' |'skyblue' |'blue' |'red' |'yellow' |'green' |'gray' |'white' |'black'), status: String}]} param0.data
 * @param {Function} param0.fetchdata
 * @param {Object} param0.pagination
 * @param {Number|String} param0.pagination.totalDocs
 * @param {Number|String} param0.pagination.limit
 * @param {Number|String} param0.pagination.totalPages
 * @param {Number|String} param0.pagination.page
 * @param {Number|String} param0.pagination.pagingCounter
 * @param {Boolean} param0.pagination.hasPrevPage
 * @param {Boolean} param0.pagination.hasNextPage
 * @param {Number|String} param0.pagination.prevPage
 * @param {Number|String} param0.pagination.nextPage
 * @param {React.ReactElement} param0.ExpandData
 * @param {React.ReactElement} param0.Download
 * @param {Boolean} param0.loading
 * @param {Boolean} param0.selectable
 * @param {Function} param0.selectedAction
 * @param {('topLeft' | 'topRight' | 'bottomLeft')} param0.selectedPosition
 * @param {React.ReactElement} param0.selectedComponente
 * @param {React.ReactElement} param0.collapseIcon
 * @param {React.ReactElement} param0.expandIcon
 * @returns
 */
const CVDataTable = React.memo(MemoCVDataTable);

function MemoCVDataTable({
  hideheaders = false,
  headers,
  data,
  fetchdata = (page, limit) => {},
  pagination = false,
  ExpandData = (params) => <Box>{JSON.stringify(params)}</Box>,
  Download = () => <Box></Box>,
  loading = false,
  selectable = false,
  selectedAction = () => {},
  selectedPosition = 'topLeft' || 'topRight' || 'bottomLeft',
  selectedComponente = <BsTrash />,
  collapseIcon = <FaEye />,
  expandIcon = <FaEyeSlash />,
  eliminar = true,
  checkAll = false
}) {
  // const [lista, setlista] = useState([]);
  // const [load, setload] = useState(false);

  const [selecteds, setselecteds] = useState([]);
  const [unSelecteds, setUnSelecteds] = useState([]);

  useEffect(() => {
    if (checkAll) {
      setselecteds([
        ...new Set([
          ...selecteds,
          ...data
            .map((item) => item.params)
            .filter((item) => !unSelecteds.includes(item))
        ])
      ]);
    }

    // if (loading != load) setload(loading);
    // if (JSON.stringify(data) != JSON.stringify(lista)) setlista(data);
  }, [data, loading]);

  useEffect(() => {
    if (checkAll)
      setselecteds([...selecteds, ...data.map((item) => item.params)]);
    else {
      setselecteds([]);
      setUnSelecteds([]);
    }
  }, [checkAll]);

  const THeaders = React.memo(({ headers }) => {
    headers = [
      ...(selectable
        ? [
            {
              label: <CVText color='transparent'>.</CVText>,
              data: 'selectable',
              first: true
            }
          ]
        : []),
      ...headers
    ];
    return (
      !hideheaders && (
        <TableRow>
          {headers.map((item) => (
            <TableCell key={v4()} scope='col'>
              <Box
                style={{
                  alignItems: item.align || 'start',
                  paddingRight: item.width || '',
                  paddingLeft: item.width || ''
                }}>
                {item.label || item.render()}
              </Box>
            </TableCell>
          ))}
        </TableRow>
      )
    );
  });

  const backgroundColor =
    COLORS[location.href.toString().includes('buyer') ? 'red' : 'blue'];

  // const [selecteds, setselecteds] = useState([]);
  // console.log({ExpandData})
  return (
    <CVDataTableStyle backgroundColor={backgroundColor}>
      {selectable &&
      eliminar &&
      (selectedPosition == 'topLeft' || selectedPosition == 'topRight') ? (
        <CVRow>
          <Box onClick={() => selectedAction(selecteds, unSelecteds)}>
            {selectedComponente}
          </Box>
        </CVRow>
      ) : (
        ''
      )}
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <THeaders headers={headers} />
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 10 }).map((v) => (
                  <TableRow key={v4()}>
                    <TableCell colSpan={headers.length + (selectable ? 1 : 0)}>
                      <Skeleton key={v4()} height='60px' />
                    </TableCell>
                  </TableRow>
                ))
              : data.map((item) => (
                  <CVDataTableRow
                    key={v4()}
                    item={item}
                    headers={headers}
                    ExpandData={ExpandData}
                    selectable={selectable}
                    selecteds={selecteds}
                    setselecteds={setselecteds}
                    unSelecteds={unSelecteds}
                    checkAll={checkAll}
                    setUnSelecteds={setUnSelecteds}
                    expandIcon={expandIcon}
                    collapseIcon={collapseIcon}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {pagination ? (
        <CVDataTablePagination
          pagination={pagination}
          fetchdata={fetchdata}
          Download={Download}
          selectable={selectable}
          selectedAction={selectedAction}
          selectedComponente={selectedComponente}
          selectedPosition={selectedPosition}
          backgroundColor={backgroundColor}
        />
      ) : (
        <></>
      )}
    </CVDataTableStyle>
  );
}

export default CVDataTable;
