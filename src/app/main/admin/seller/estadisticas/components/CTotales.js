import React from 'react';
import CardTotal from './CardTotal';
import { Grid } from '@material-ui/core';
import { CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import MVendidos from './MVendidos';
import { moneyformat } from '@/common/utils/methods';

function CTotales({ abstract, topListProduct }) {
  return (
    <Grid item xs={12} sm={12} md={6}>
      <CVText color='blue' fontSize='1rem'>
        Encuentra el resumen de los logros de tu tienda.
      </CVText>
      <SizeBox height='2.5rem' />
      <Grid container spacing={2}>
        <CardTotal
          title='Ingreso por Venta'
          value={`S/ ${moneyformat(abstract.salesAmount) || 0}`}
          backgroundColor='primary'
        />
        <CardTotal
          title='Monto de ventas promedio'
          value={`S/ ${moneyformat(abstract.salesAmountAverage) || 0}`}
          backgroundColor='yellow'
        />
        <CardTotal
          title='Número de Ventas'
          value={`${abstract.salesQuantity || 0}`}
          backgroundColor='green'
        />
        <CardTotal
          title='Número de compradores'
          value={`${abstract.buyersQuantity || 0}`}
          backgroundColor='red'
        />
      </Grid>
      <SizeBox />
      <CVText color='blue' fontSize='1rem'>
        Productos más vendidos
      </CVText>
      <SizeBox />
      <MVendidos topListProduct={topListProduct} />
    </Grid>
  );
}

export default CTotales;
