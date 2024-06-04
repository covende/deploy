import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVGridText from '@/common/CovendeTemplate/CVGridText';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Grid } from '@material-ui/core';
import { v4 } from 'uuid';
import {
  CustomHead,
  CustomRow,
  CustomTable,
  CustomTbody,
  CustomTD,
  CustomTH
} from './PStyles';
import { formatDate } from '@/common/utils/methods';

function PricesProduct({ producto }) {
  const customTH = (child) => (
    <CustomTH>
      <div>{child}</div>
    </CustomTH>
  );

  const customTD = (child) => (
    <CustomTD>
      <div>{child}</div>
    </CustomTD>
  );
  return (
    <Box>
      <Text fontWeight='bold' color='#174872'>
        Precio y Stock
      </Text>
      {producto.type_of_sale != 'RETAIL' ? (
        <>
          <Text color='#174872'>Venta al por mayor</Text>
          <CustomTable>
            <CustomHead>
              <CustomRow>
                {customTH('ID')}
                {customTH('Pedido Mínimo')}
                {customTH('Pedido Máximo')}
                {customTH('Precio')}
                {customTH('Preparacion')}
              </CustomRow>
            </CustomHead>
            <CustomTbody>
              {(producto?.wholesale || []).map((whos) => (
                <CustomRow key={v4()}>
                  {customTD(whos?.id || '')}
                  {customTD(whos?.minimum_order || '')}
                  {customTD(whos?.maximum_order_text || '')}
                  {customTD(whos?.price || '')}
                  {customTD(
                    whos?.preparation_time?.value +
                      ' ' +
                      whos.preparation_time?.type || ''
                  )}
                </CustomRow>
              ))}
            </CustomTbody>
          </CustomTable>
        </>
      ) : (
        <>
          <Text color='#174872'>Venta por menor.</Text>
          <Grid item xs={12} sm={6} md={4}>
            <CVGridText
              options={[
                {
                  title: 'Precio: ',
                  content: `S/ ${producto.price_unit || 0}`
                },
                { title: 'Stock: ', content: producto.stock },
                {
                  title: 'Oferta:',
                  content: producto.offer_percentage
                    ? `${producto.offer_percentage}%   -   ${formatDate(
                        producto.offer_start_date || ''
                      )} - ${formatDate(producto.offer_end_date || '')}`
                    : 'No hay oferta'
                }
              ]}
            />
          </Grid>
        </>
      )}
      <br />
      <Text fontWeight='bold' color='#174872'>
        Despacho
      </Text>
      {producto.type_of_sale != 'RETAIL' ? (
        <>
          <Text color='#174872'>Tiempo de preparación y entrega</Text>
          <CustomTable>
            <CustomHead>
              <CustomRow>
                {customTH('PM')}
                {customTH('Precio (S/)')}
                {customTH('Stock')}
                {customTH('Tiempo de Preparación')}
                {customTH('Tiempo de Entrega')}
              </CustomRow>
            </CustomHead>
            <CustomTbody>
              {(producto?.wholesale || []).map((whos) => (
                <CustomRow key={v4()}>
                  {customTD(whos.maximum_order_text || '-')}
                  {customTD(`S/ ${whos.price || '-'}`)}
                  {customTD(producto.stock || '-')}
                  {customTD(
                    `${whos.preparation_time?.value || '-'} ${
                      whos.preparation_time?.type || '-'
                    }`
                  )}
                  {customTD(whos.end_time || '-')}
                </CustomRow>
              ))}
            </CustomTbody>
          </CustomTable>
          <SizeBox />
        </>
      ) : (
        <Grid item xs={12} sm={6} md={4}>
          <CVGridText
            options={[
              {
                title: 'Tiempo de preparación: ',
                content: `${producto.preparation_time || 0} ${
                  producto.preparation_time == 1 ? 'dia' : 'días.'
                }`
              }
            ]}
          />
        </Grid>
      )}
      <CVGridText
        options={[
          {
            title: 'Tipo de paquete:',
            content: `${producto?.package_information?.package_type || ''}`
          },
          {
            title: 'Peso del paquete:',
            content: `${producto?.package_information?.package_weight || ''}`
          },
          {
            title: 'Dimensiones del paquete:',
            content: `Largo:
          ${producto?.package_information?.package_dimensions?.long || ''},
          ancho:
          ${producto?.package_information?.package_dimensions?.width || ''},
          alto:
          ${producto?.package_information?.package_dimensions?.high || ''}`
          }
        ]}
      />
    </Box>
  );
}

export default PricesProduct;
