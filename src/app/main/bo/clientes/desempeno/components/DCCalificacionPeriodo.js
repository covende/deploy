import CVText from '@CVTemplate/core/CVText';
import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVSelect from '@CVTemplate/core/CVSelect';
import { TIPODATE } from '@CVTemplate/core/CVThemes';
import { Grid } from '@material-ui/core';
import CVButton from '@CVTemplate/core/CVButton';
import { qualitation } from './DCUtils';
import CVPanel from '@CVTemplate/core/CVPanel';
import { v4 } from 'uuid';

const DCCalificacionPeriodo = ({ client }) => {
  const [date, setdate] = useState('all');

  const ResultadosItems = ({ based }) => (
    <CVPanel height='auto' height='80%' variant='box'>
      <CVText color='blue' fontWeight='bold'>
        Basado en:
      </CVText>
      <SizeBox />
      {based.map((item, idx) => (
        <Flex
          key={v4()}
          justifyContent='space-between'
          alignItems='center'
          margin='0.5rem'
          padding='1rem'
          rounded='1rem'
          backgroundColor={
            idx % 2 != 0 ? 'rgba(0, 71, 114, 0.03)' : 'rgba(0, 71, 114, 0.08)'
          }>
          <CVText color='blue'>{item.title}</CVText>
          <Box>
            <CVText
              textAlign='center'
              color='blue'
              fontWeight='bold'
              fontSize='1.5rem'>
              {item.value}
            </CVText>
            <CVText color='blue'>
              {item.count} de {item.from} {item.item}
            </CVText>
          </Box>
        </Flex>
      ))}
    </CVPanel>
  );

  const Resultados = ({ datares }) => (
    <Grid item xs={12} sm={12} md={4}>
      <Flex width='100%'>
        <CVButton height='auto' backgroundColor='blue'>
          {datares.card.title}
        </CVButton>
        <SizeBox />
        <CVButton height='auto' backgroundColor='white'>
          <Flex>
            <Box>
              <CVText
                textAlign='center'
                fontSize='2rem'
                color={datares.card.color}>
                {datares.card.value}
              </CVText>
              <CVText textAlign='center' color='gray'>
                Nivel òptimo
              </CVText>
            </Box>
            <Box>
              <CVText textAlign='center'>{datares.card.icon}</CVText>
              <SizeBox height='0.5rem' />
              <CVText textAlign='center' color='gray'>
                {datares.card.optimo}
              </CVText>
            </Box>
          </Flex>
        </CVButton>
      </Flex>
      <SizeBox />
      <ResultadosItems based={datares.based} />
    </Grid>
  );

  return (
    <Box>
      <SizeBox />

      <Flex alignItems='center'>
        <CVText color='blue'>Esta es tu calificación los últimos</CVText>
        <SizeBox />
        <Box maxWidth='400px'>
          <CVSelect
            color='primary'
            value={date}
            onChange={(value) => setdate(value)}
            options={TIPODATE}
          />
        </Box>
      </Flex>
      <SizeBox />
      <Grid container spacing={2}>
        <Resultados datares={qualitation.desempeno} />
        <Resultados datares={qualitation.satisfaccion} />
        <Resultados datares={qualitation.evaluacion} />
      </Grid>
    </Box>
  );
};

export default DCCalificacionPeriodo;
