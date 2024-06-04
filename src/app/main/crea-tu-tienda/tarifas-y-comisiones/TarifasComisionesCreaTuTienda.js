import React from 'react';

// UI components
import { Fieldset, Label, Legend } from '@/common/components';
import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

// Assets
import { svgStore } from '@/app/assets/images/SVG';
import { CVButton, CVText } from '@/common/CovendeTemplate';

export const ContentPage = styled.div`
  width: 100%;
  height: fit-content;
  min-height: calc(100vh - 135px);
  padding: 15px;
  background-color: #f2f2f2;
  box-sizing: border-box;
`;

function TarifasComisionesCreaTuTienda(props) {
  return (
    <ContentPage>
      <Box
        margin='auto'
        padding='10px 24px'
        maxW='640px'
        background='#FFFFFF'
        borderWidth='1px'
        borderRadius='16px'
        overflow='hidden'>
        <Fieldset>
          <Legend
            color='default'
            margin='auto'
            fontWeight='bold'
            fontSize='26px'
            lineHeight='40px'>
            Abre tu tienda a tán solo:
          </Legend>
          <div
            style={{
              display: 'grid',
              justifyContent: 'center'
            }}>
            {svgStore}
          </div>
          <div
            style={{ margin: 'auto', display: 'block', width: 'max-content' }}>
            <div
              style={{ margin: 'auto', display: 'flex', alignItems: 'center' }}>
              <CVText fontWeight='bold' fontSize='36px' lineHeight='54px'>
                S/ 199
              </CVText>
              &nbsp;
              <CVText fontWeight='bold' fontSize='15px' lineHeight='30px'>
                / Plan Anual
              </CVText>
            </div>
            <CVText
              margin='auto'
              fontWeight='bold'
              fontSize='12px'
              lineHeight='18px'>
              + Comisiones por ventas
            </CVText>
          </div>
        </Fieldset>
        <Fieldset padding='20px 24px'>
          <Legend
            margin='auto'
            fontWeight='bold'
            fontSize='14px'
            lineHeight='20px'>
            Accede a los todos beneficios de nuestra plataforma:
          </Legend>
          <Label marginRight='16px' width='525px' float='left'>
            Publica productos ilimitados.*
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Acepta múltiples opciones de pago (VISA, MasterCard, Dinners, Yape,
            Plin y BIM).
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Sistema de facturación y mensajería para atención de clientes.
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Servicio de Entrega y seguimiento de Pedidos.
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Publicidad y exposición de tu marca en nuestra plataforma y otras
            redes de negocios.
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Publica productos ilimitados.*
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Agrega hasta 4 usuarios a tu cuenta.
          </Label>
          <Label marginRight='16px' width='525px' float='left'>
            Obtén reportes y estadísticas de ventas.
          </Label>
          <CVText
            color='default'
            margin='initial'
            fontWeight='bold'
            fontSize='12px'
            lineHeight='18px'>
            * Sólo por lanzamiento. Disponible hasta el 31/03/21
          </CVText>
          <CVButton type='submit' margin='0px auto' width='176px'>
            Comprar
          </CVButton>
        </Fieldset>
        <Fieldset padding='8px 24px'>
          <Legend
            margin='auto'
            fontWeight='bold'
            fontSize='14px'
            lineHeight='20px'>
            Comisiones por Ventas
          </Legend>
          <Label marginRight='16px' width='525px' float='left'>
            Covende cobra comisiones por cada venta dependiendo de la categoría
            del producto. Por lanzamiento, las siguientes comisiones aplican a
            todas las categorías:
          </Label>
          <table
            style={{
              boxSizing: 'border-box',
              borderRadius: '10px',
              borderSpacing: '0px'
            }}>
            <thead>
              <tr>
                <th></th>
                <th
                  style={{
                    padding: '8px 16px',
                    color: '#fff',
                    background: '#004772',
                    boxSizing: 'border-box',
                    // border: '1px solid #004772',
                    borderRadius: '10px 0px 0px 0px',
                    fontFamily: ' Poppins',
                    fontStyle: ' normal',
                    fontWeight: ' 600',
                    fontSize: ' 14px',
                    lineHeight: ' 21px',
                    textAlign: ' center'
                  }}>
                  Comisión Fija *
                </th>
                <th
                  style={{
                    padding: '8px 16px',
                    color: '#fff',
                    background: '#004772',
                    boxSizing: 'border-box',
                    // border: '1px solid #004772',
                    borderRadius: '0px 10px 0px 0px',
                    fontFamily: ' Poppins',
                    fontStyle: ' normal',
                    fontWeight: ' 600',
                    fontSize: ' 14px',
                    lineHeight: ' 21px',
                    textAlign: ' center'
                  }}>
                  Comisión Variable *
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    border: '1px solid #004772',
                    boxSizing: 'border-box',
                    borderRadius: '10px 0px 0px 0px'
                  }}>
                  Transacción menor a S/ 200
                </td>
                <td
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    textAlign: 'center',
                    border: '1px solid #004772',
                    boxSizing: 'border-box'
                  }}>
                  S/ 8
                </td>
                <td
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    textAlign: 'center',
                    border: '1px solid #004772',
                    boxSizing: 'border-box'
                  }}>
                  8%
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    border: '1px solid #004772',
                    boxSizing: 'border-box',
                    borderRadius: '0px 0px 0px 10px'
                    // borderRadius: '10px',
                  }}>
                  Transacción menor a S/ 200
                </td>
                <td
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    textAlign: 'center',
                    border: '1px solid #004772',
                    boxSizing: 'border-box'
                  }}>
                  S/ 6
                </td>
                <td
                  style={{
                    padding: '8px 16px',
                    background: '#FFFFFF',
                    textAlign: 'center',
                    border: '1px solid #004772',
                    borderRadius: '0px 0px 10px 0px',
                    boxSizing: 'border-box'
                  }}>
                  6%
                </td>
              </tr>
            </tbody>
          </table>
          <CVText
            color='default'
            margin='initial'
            fontWeight='bold'
            fontSize='12px'
            lineHeight='18px'>
            *Comisiones sujetas a cambio.
          </CVText>
        </Fieldset>
      </Box>
    </ContentPage>
  );
}

export default TarifasComisionesCreaTuTienda;
