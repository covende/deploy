import React from 'react';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { CVRating, CVSelect } from '@/common/CovendeTemplate';
import { ORIGINPROD } from '@/common/CovendeTemplate/CVThemes';

function TOFiltros({ filtros, setfiltros }) {
  const { categorys, treecategorys } = useSelector(
    (state) => state.CategoryProducts
  );
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Flex color='#000000' alignItems='center'>
          <CVSelect
            title='Categoria'
            value={filtros.categoria}
            onChange={(value) => setfiltros({ ...filtros, categoria: value })}
            options={categorys.map((item) => ({
              title: item.name,
              value: item._id
            }))}
          />
        </Flex>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Flex color='#000000' alignItems='center'>
          <CVSelect
            options={ORIGINPROD}
            title='Origin: '
            value={filtros.origin}
            onChange={(value) => setfiltros({ ...filtros, origin: value })}
          />
          <CVSelect
            options={[{ value: '', text: '' }]}
            title='Ubicación: '
            value={filtros.ubicacion}
            onChange={(value) => setfiltros({ ...filtros, ubicacion: value })}
          />
        </Flex>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Flex color='#000000' alignItems='center'>
          Por reputación:
          <CVRating
            puntuation={filtros.rating}
            height='2.2rem'
            readOnly={false}
            precision={1}
            onChange={(value) =>
              setfiltros({ ...filtros, rating: eval(value) })
            }
          />
        </Flex>
      </Grid>
    </Grid>
  );
}

export default TOFiltros;
