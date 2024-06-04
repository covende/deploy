import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
import React, { Fragment } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import CVPanel from '@CVTemplate/core/CVPanel';
import CVButton from '@CVTemplate/core/CVButton';
import { COLORS, TIPODATE } from '@CVTemplate/core/CVThemes';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { desempenometrica, desempenostore } from './DCUtils';
import styled from 'styled-components';
import { v4 } from 'uuid';

const CellStyle = styled.div`
  padding: 1rem;
  color: ${({ color }) => color || 'black'};
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  border-radius: ${({ first, last }) => {
    if (first) return '1rem 0 0 1rem';
    if (last) return '0 1rem 1rem 0';
    return '0px';
  }};
  border-bottom: ${({ borderBottom }) => borderBottom || '1px solid #ECECEC'};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  font-size: 0.85rem;
  height: 100%;
  width: 100%;
  min-height: 40px;
`;

const DCCalificacionTable = ({ client }) => {
  const lista = {
    ultimos7dias: {
      title: '7 dias',
      dates: TIPODATE.find((item) => item.value == 'ultimos7dias').time()
    },
    hace1mes: {
      title: '30 dias',
      dates: TIPODATE.find((item) => item.value == 'hace1mes').time()
    },
    hace3meses: {
      title: '90 dias',
      dates: TIPODATE.find((item) => item.value == 'hace3meses').time()
    },
    hace6meses: {
      title: '180 dias',
      dates: TIPODATE.find((item) => item.value == 'hace6meses').time()
    }
  };

  const BHeader = ({ data }) => (
    <Flex
      paddingLeft='1rem'
      width='100%'
      marginBottom='1rem'
      justifyContent='end'>
      <CVButton backgroundColor='white' height='auto' width='100%'>
        <Box width='100%'>
          <CVText
            color='primary'
            fontWeight='semibold'
            fontSize='1.5rem'
            textAlign='center'>
            {lista[data].title}
          </CVText>
          <CVText color='blue' textAlign='center'>
            {'Del ' +
              CVFormatDate({ date: lista[data].dates.start_date }) +
              ' al ' +
              CVFormatDate({ date: lista[data].dates.end_date })}
          </CVText>
        </Box>
      </CVButton>
    </Flex>
  );

  return (
    <Box width='100%'>
      <SizeBox />

      <CVText color='primary' fontSize='1.5rem'>
        Métricas por periodos de tiempo
      </CVText>
      <SizeBox />
      <CVPanel variant='box' width='100%'>
        <SizeBox />
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th></th>
              <th>
                <BHeader data='ultimos7dias' />
              </th>
              <th>
                <BHeader data='hace1mes' />
              </th>
              <th>
                <BHeader data='hace3meses' />
              </th>
              <th>
                <BHeader data='hace6meses' />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <CellStyle
                  textAlign='left'
                  first={true}
                  backgroundColor={COLORS['blue']}
                  color={COLORS['white']}
                  borderBottom='none'>
                  {desempenostore.title}
                </CellStyle>
              </th>
              {desempenostore.values.map((it, idx) => (
                <th key={v4()}>
                  <CellStyle
                    last={idx == desempenostore.values.length - 1}
                    backgroundColor={COLORS['blue']}
                    color={COLORS['white']}
                    borderBottom='none'>
                    {it}
                  </CellStyle>
                </th>
              ))}
            </tr>
            <tr>
              <th colSpan={5}>
                <SizeBox />{' '}
              </th>
            </tr>
            {desempenometrica.map((item) => (
              <Fragment key={v4()}>
                <tr>
                  <td colSpan={4}>
                    <CellStyle
                      textAlign='left'
                      first={true}
                      backgroundColor='rgba(0, 71, 114, 0.08)'
                      color={COLORS['blue']}
                      borderBottom='none'>
                      {item.title}
                    </CellStyle>
                  </td>
                  <td>
                    <CellStyle
                      last={true}
                      backgroundColor='rgba(0, 71, 114, 0.08)'
                      color='rgba(0, 71, 114, 0.08)'
                      borderBottom='none'>
                      -
                    </CellStyle>
                  </td>
                </tr>

                {item.data.map((it) => (
                  <tr key={v4()}>
                    <td>
                      <CellStyle textAlign='left'>{it.title}</CellStyle>
                    </td>
                    {it.values.map((it) => (
                      <td key={v4()}>
                        <CellStyle>{it}</CellStyle>
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        <SizeBox />
      </CVPanel>
    </Box>
  );
};

export default DCCalificacionTable;
