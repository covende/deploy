import React from 'react';
import CVText from '@CVTemplate/core/CVText';
import { Grid } from '@material-ui/core';
import { BsSearch } from 'react-icons/bs';
import { COLORS } from '@CVTemplate/core/CVThemes';
import CVDateRangePicker from '@/common/CovendeTemplate/CVDateRangePicker';
import { CVInput } from '@/common/CovendeTemplate';

function FiltrosFacturacion({ filtro, setFiltro }) {
  const setDateRange = (range) => {
    const [startDate, endDate] = range;
    setFiltro({
      ...filtro,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CVInput
          iconFind={true}
          submit
          placeholder='Busque aquí por facturación'
          icon={
            <CVText>
              <BsSearch color={COLORS['white']} />
            </CVText>
          }
          value={filtro.search}
          onChange={(value) =>
            setFiltro({
              ...filtro,
              search: value,
            })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <CVDateRangePicker
          title='Tiempo:'
          dateend={filtro.endDate}
          datestart={filtro.startDate}
          onChange={setDateRange}
          height='3rem'
          disabled={false}
        />
      </Grid>
    </Grid>
  );
}

export default FiltrosFacturacion;




