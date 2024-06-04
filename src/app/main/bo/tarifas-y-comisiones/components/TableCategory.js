import React, { useEffect, useState } from 'react';
import { PencilAltIcon } from '@/app/assets/icons';
import { HeaderView, SubHeaderView } from './Table.styles';
import { Button, Heading } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { v4 as uuidv4 } from 'uuid';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import CVButton from '@CVTemplate/core/CVButton';
import { CVDateRangePicker, CVText } from '@/common/CovendeTemplate';
import { Grid } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
function TableCategory({
  addcategory,
  addsubcategory,
  editarcomision,
  permisions = { editar: true },
  date,
  setdate
}) {
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );

  const [filterDate, setFilterDate] = useState([null, null, false]);

  function filterByDate(datos, ini, fin) {
    return datos.filter((cat) => {
      return cat.children.some(
        (child) =>
          child.datestart?.substring(0, 10) === ini.substring(1, 11) ||
          child.dateends?.substring(0, 10) === fin.substring(1, 11)
      );
    });
  }

  const handleFilter = () => {
    const ini = JSON.stringify(date[0]);
    const fin = JSON.stringify(date[1]);
    const show = date[2];

    const catsFiltradas = filterByDate(treecategorys, ini, fin);
    setFilterDate([date[0], date[1], show ? catsFiltradas : treecategorys]);
  };

  const handleClearFilter = () => {
    setFilterDate([null, null, false]);
  };
  const data = filterDate[2] ? filterDate[2] : treecategorys;

  const tbodies = data.map((cats, index) => {
    const categorys = [
      {
        ...cats,
        children: []
      },
      ...(cats.children || [])
    ];
    const subcats = categorys.map((sca, i) => {
      const orden =
        i === 0 ? <Td rowSpan={categorys.length + 1}>{index + 1}</Td> : null;
      const category =
        i === 0 ? <Td rowSpan={categorys.length + 1}>{cats.name}</Td> : null;
      return (
        <Tr key={uuidv4()} style={{ fontWeight: i == 0 ? 'bold' : 'initial' }}>
          {orden}
          {category}
          <Td>{sca.name}</Td>
          <Td>S/ {sca.mimimun}</Td>
          <Td>{sca.percent} %</Td>
          <Td>
            {permisions.editar && (
              <Button variant='link' onClick={() => editarcomision(sca)}>
                {PencilAltIcon}
              </Button>
            )}
          </Td>
        </Tr>
      );
    });
    return <Tbody key={uuidv4()}>{subcats}</Tbody>;
  });
  return (
    <Box>
      <Grid item xs={12} sm={12} md={12}>
        <Flex alignItems='center'>
          <CVText color='blue' fontSize='1.2rem'>
            Vigencia:
          </CVText>
          <SizeBox />
          <CVDateRangePicker
            disabledDate={false}
            datestart={date[0]}
            dateend={date[1]}
            onChange={(value) => setdate([...value, true])}
          />
          <SizeBox />

          <CVButton backgroundColor='red' onClick={handleFilter}>
            Filtrar
          </CVButton>
          <SizeBox />
          <CVButton
            fontWeight='bold'
            variant='outlined'
            backgroundColor='green'
            onClick={handleClearFilter}>
            Limpiar{' '}
          </CVButton>
        </Flex>
        <SizeBox />
      </Grid>
      <Table variant='striped' style={{ fontSize: '1rem' }}>
        <Thead style={{ backgroundColor: '#004772' }}>
          <Tr>
            <Th style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Nro°</Th>
            <Th style={{ color: '#FFFFFF', fontWeight: 'bold' }}>CATEGORIA</Th>
            <Th style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              SUBCATEGORIA
            </Th>
            <Th style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              COMISIÓN FIJA (S/)
            </Th>
            <Th style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              COMISIÓN VARIABLE (%)
            </Th>
            <Th style={{ color: '#FFFFFF', fontWeight: 'bold' }}>ACCIONES</Th>
          </Tr>
        </Thead>
        {tbodies}
      </Table>
    </Box>
  );
}

export default TableCategory;
