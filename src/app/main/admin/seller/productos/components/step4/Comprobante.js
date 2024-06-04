import React from 'react';
import { Fragment } from 'react';
import { Container, Grid } from '@material-ui/core';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { TIPOVOUCHER } from '@/common/CovendeTemplate/CVThemes';
import { CVText } from '@/common/CovendeTemplate';
import { ProductSubTitle } from '../../ProductsStyle';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function Comprobante({ extra, setExtra, errors }) {
  return (
    <Fragment>
      <ProductSubTitle>4.1. Tipo de comprobante</ProductSubTitle>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <CVText color='gray'>
              Mostraremos a los compradores que puedes emitir:
            </CVText>
            <CVRadio
              itemDirection='column'
              value={extra.comprobante}
              onChange={(value) => setExtra({ ...extra, comprobante: value })}
              options={TIPOVOUCHER}
            />
            <SizeBox />
            {/* <CVText color='gray'>
              Para modificar esta información ingresa a Configuración.
            </CVText> */}
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12}>
            <Text>IGV</Text>
            <Typography>
              Selecciona el IGV aplicable para la facturación. Recuerda que el
              precio de tu producto debe incluir el IGV.
            </Typography>
            <CVRadio
              itemDirection='column'
              value={extra.igv}
              onChange={(value) => setExtra({ ...extra, igv: value })}
              options={[
                { text: '18%', value: '18' },
                { text: '0%', value: '0' }
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Fragment>
  );
}

export default Comprobante;
