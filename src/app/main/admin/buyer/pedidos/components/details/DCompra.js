import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVPanel } from '@/common/CovendeTemplate';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React from 'react';

const style = {
  display: 'flex',
  justifyContent: 'center',
  color: COLORS['white'],
  fontSize: '1rem',
  width: '100%'
};
function DCompra({ pedido, product }) {
  return (
    <Box>
      <SizeBox />
      <CVPanel backgroundColor='red'>
        <Grid container spacing={1}>
          <Grid item xs={1} sm={1} md={1} style={style}>
            Nº
          </Grid>
          <Grid item xs={4} sm={4} md={4} style={style}>
            Nombre del Producto
          </Grid>
          <Grid item xs={2} sm={2} md={2} style={style}>
            Cantidad
          </Grid>
          <Grid item xs={1} sm={1} md={1} style={style}>
            Unidad
          </Grid>
          <Grid item xs={2} sm={2} md={2} style={style}>
            Precio Unitario
          </Grid>
          <Grid item xs={1} sm={1} md={1} style={style}>
            Envío
          </Grid>
          <Grid item xs={1} sm={1} md={1} style={style}>
            Total
          </Grid>
        </Grid>
      </CVPanel>
      <SizeBox />
      <CVPanel>
        <Grid container spacing={1}>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            style={{ ...style, color: COLORS['black'] }}>
            1
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            style={{ ...style, justifyContent: 'start', color: COLORS['red'] }}>
            <Flex alignItems='center'>
              <Box>
                <CVImage
                  height='32px'
                  width='32px'
                  borderRadius='2px'
                  image={product?.photo || 'https://via.placeholder.com/150'}
                />
              </Box>
              <SizeBox />
              {product?.name || ''}
            </Flex>
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            style={{ ...style, color: COLORS['black'] }}>
            {CVMoneyFormat({ amount: pedido.cantidad, currency: '' }) || ''}
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            style={{ ...style, color: COLORS['black'] }}>
            {pedido.unidad == '' ? 'Unidad' : pedido.unidad}
          </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            md={2}
            style={{ ...style, color: COLORS['black'] }}>
            {CVMoneyFormat({ amount: pedido.final_unit_price }) || ''}
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            style={{ ...style, color: COLORS['black'] }}>
            {CVMoneyFormat({ amount: pedido.precio_envio }) || ''}
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            style={{ ...style, color: COLORS['black'] }}>
            {CVMoneyFormat({ amount: pedido.total }) || ''}
          </Grid>
        </Grid>
      </CVPanel>
      <SizeBox />
      <CVPanel backgroundColor='red'>
        <Grid container spacing={1}>
          <Grid
            item
            xs={11}
            sm={11}
            md={11}
            style={{
              ...style,
              justifyContent: 'flex-end',
              fontWeight: 'bold'
            }}>
            PRECIO TOTAL DEL PEDIDO
          </Grid>
          <Grid
            item
            xs={1}
            sm={1}
            md={1}
            style={{ ...style, fontWeight: 'bold' }}>
            {CVMoneyFormat({ amount: pedido.total }) || ''}
          </Grid>
        </Grid>
      </CVPanel>
    </Box>
  );
}

export default DCompra;
