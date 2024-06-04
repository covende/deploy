import React from 'react';
import { Grid } from '@material-ui/core';
import CVInput from '@CVTemplate/core/CVInput';
import CVDateRangePicker from '@CVTemplate/core/CVDateRangePicker';

const RCFiltros = ({ filtro, setfiltro }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <CVDateRangePicker
          title='Tiempo'
          dateend={filtro.daterange[1]}
          datestart={filtro.daterange[0]}
          onChange={(value) => setfiltro({ ...filtro, daterange: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CVInput
          placeholder='Busca lo que deseas'
          value={filtro.search}
          onChange={(value) => setfiltro({ ...filtro, search: value })}
          iconFind={true}
        />
      </Grid>
    </Grid>
  );
};

export default RCFiltros;
