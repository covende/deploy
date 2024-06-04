import { CVDateRangePicker } from '@/common/CovendeTemplate';
import CVButton from '@CVTemplate/core/CVButton';
import CVSearchInput from '@CVTemplate/core/CVSearchInput';
import { Grid } from '@material-ui/core';
import { Flex } from '@chakra-ui/react';
import React from 'react';

function DBOFiltros({ filtro, setfiltro }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={4} md={3}>
        <CVSearchInput
          placeholder=''
          value={filtro.search}
          onChange={(value) => {
            setfiltro({ ...filtro, search: value });
          }}
          onSubmit={() => setfiltro({ ...filtro, active: !filtro.active })}
        />
      </Grid>

      <Grid item xs={6} sm={5} md={4}>
        <CVDateRangePicker
          title='Tiempo'
          datestart={filtro.date_range?.desde}
          dateend={filtro.date_range?.hasta}
          disabledDate={null}
          height='3rem'
          onChange={(value) =>
            setfiltro({
              ...filtro,
              date_range: {
                desde: value[0],
                hasta: value[1]
              }
            })
          }
        />
      </Grid>

      <Grid item xs={6} sm={3} md={3}>
        <Flex justifyContent='space-around'>
          <CVButton
            onClick={() => {
              if (filtro.date_range?.desde && filtro?.date_range.hasta)
                setfiltro({ ...filtro, active: !filtro.active });
            }}
            height='3rem'
            backgroundColor='red'>
            Filtrar
          </CVButton>

          <CVButton
            height='3rem'
            variant='outlined'
            color='green'
            onClick={() =>
              setfiltro({
                active: !filtro.active,
                search: '',
                date_range: { desde: '', hasta: '' }
              })
            }>
            Limpiar
          </CVButton>
        </Flex>
      </Grid>
    </Grid>
  );
}

export default DBOFiltros;
