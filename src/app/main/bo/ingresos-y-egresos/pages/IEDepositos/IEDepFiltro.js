import React from 'react';
import { Grid } from '@material-ui/core';
import CVInput from '@CVTemplate/core/CVInput';

const IEDFiltro = ({ filtro, setfiltro }) => {
  return (
    <Grid container spacing={2}>
      <Grid item sx={12} sm={6} md={4}>
        <CVInput
          value={filtro.search}
          onChange={(value) => setfiltro({ ...filtro, search: value })}
          iconFind={true}
        />
      </Grid>
      <Grid item sx={12} sm={6} md={4}></Grid>
      <Grid item sx={12} sm={6} md={4}></Grid>
    </Grid>
  );
};

export default IEDFiltro;
