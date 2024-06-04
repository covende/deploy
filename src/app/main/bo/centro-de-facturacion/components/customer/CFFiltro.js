import CVPanel from '@CVTemplate/core/CVPanel';
import React from 'react';
import { Grid } from '@material-ui/core';
import CVInput from '@CVTemplate/core/CVInput';
import CVSelect from '@CVTemplate/core/CVSelect';
import CVButton from '@CVTemplate/core/CVButton';
import CVDateRangePicker from '@CVTemplate/core/CVDateRangePicker';
import CVTotales from '@CVTemplate/core/CVTotales';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CFSTATUS, CFTYPESALE } from './CFUtils';

const CFFiltro = ({ filtro, setfiltro }) => {
  return (
    <CVPanel height='auto' variant='box'>
      <CVTotales
        value={filtro.status}
        onChange={(value) => setfiltro({ ...filtro, status: value })}
        lista={CFSTATUS.filter((item) => item.value != 'ALL').map((item) => ({
          value: item.value,
          text: `${item.text} (${item.total})`,
          color: item.color
        }))}
      />
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CVInput
            title='Buscar: '
            iconFind={true}
            iconColor='primary'
            buttonColor='white'
            placeholder='ID de Pedido'
            value={filtro.search}
            onChage={(value) => setfiltro({ ...filtro, search: value })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CVDateRangePicker
            title='Tiempo: '
            datestart={filtro.daterange[0]}
            dateend={filtro.daterange[1]}
            onChange={(range) => setfiltro({ ...filtro, daterange: range })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CVSelect
            title='Estado: '
            value={filtro.status}
            onChange={(value) => setfiltro({ ...filtro, status: value })}
            options={[...CFSTATUS]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <CVSelect
            title='Tipo de venta: '
            value={filtro.type_sale}
            onChange={(value) => setfiltro({ ...filtro, type_sale: value })}
            options={[...CFTYPESALE]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <CVButton variant='outlined' color='primary'>
            FILTRAR
          </CVButton>
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <CVButton variant='outlined' color='green'>
            LIMPIAR
          </CVButton>
        </Grid>
      </Grid>
    </CVPanel>
  );
};

export default CFFiltro;
