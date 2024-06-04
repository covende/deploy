import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react/'
import CVText from '@CVTemplate/core/CVText'
import CVPanel from '@CVTemplate/core/CVPanel'
import { Grid } from '@/../node_modules/@material-ui/core/index'


const IndicatorPercent = ({mb, translate, show}) => {
  const styleIndicator = {
    marginBottom: `${mb}`,
    transform: show ? `translate(${translate}px)` : '',
    transition: 'all 0.8s ease-in-out'
  }
  return (
    <svg style={styleIndicator} width="54" height="37" viewBox="0 0 54 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.6448 1.98257C25.846 0.46114 28.153 0.461122 29.3541 1.98253L53.1639 32.141C54.7171 34.1084 53.3158 37 50.8093 37H3.19058C0.684065 37 -0.717214 34.1084 0.835915 32.1411L24.6448 1.98257Z" fill="#004772"/>
    </svg>
  )
}

const ReTotales = ({ companyRep, loading }) => {
  const statusText = (percentaje = 0) => {
    if (percentaje >= 0 && percentaje < 85) {
      return {
        text: 'Malo',
        color: 'rgba(213,40,8,1)'
      };
    } else if (percentaje >= 85 && percentaje < 90) {
      return {
        text: 'Regular',
        color: 'rgb(224,235,10,1)'
      };
    } else if (percentaje >= 90 && percentaje < 95) {
      return {
        text: 'Bueno',
        color: 'rgb(224,235,10,1)'
      };
    } else {
      return {
        text: 'Excelente',
        color: 'rgba(41,161,76,1)'
      };
    }
  };
  return (
    <Box w='50%' px='2rem'>
      <CVText fontWeight='300' color='blue' fontSize='14px'>
        {companyRep.status
          ? `Esta es tu reputación en los últimos ${
              companyRep.days ?? ''
            } días:`
          : ' La tienda aún no registra ventas suficientes para el cálculo.'}
      </CVText>
      <Box
        background='linear-gradient(90deg, rgba(213,40,8,1) 7%, rgb(224,235,10,1) 50%, rgba(41,161,76,1) 93%)'
        w='90%'
        h='43px'
        mt='1rem'
        mb='0.5rem'
        mx='auto'
        borderRadius='25px'
      />
      <IndicatorPercent
        mb='-1rem'
        translate={(companyRep.percent ?? 0) * 4}
        show={!loading}
      />
      <CVPanel
        itemJustify='space-between'
        itemDirection='column'
        backgroundColor='blue'
        useBackgroundClip={true}
        height='19.5rem'>
        <Grid spacing={2} container>
          <Grid item lg={6}>
            <Box mt='6rem'>
              <CVText
                color='white'
                fontSize='20'
                fontWeight={600}
                textAlign='start'>
                Reputación en Covende
                <Box h='3px' w='100%' background='#fff' mt='1rem' />
              </CVText>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box
              mx='auto'
              textAlign='-webkit-right'
              transition='all 01s ease-in-out'
              transform={!loading ? 'scale(1)' : 'scale(0)'}>
              <CVText
                fontSize='60'
                color='white'
                fontWeight='bold'
                textAlign='end'>
                {companyRep.percent ?? 0}%
              </CVText>
              {companyRep.percent && (
                <Box
                  p='3px 31px'
                  background={statusText(Number(companyRep.percent)).color}
                  textAlign='end'
                  w='133px'>
                  <CVText color='white' textAlign='center'>
                    {statusText(Number(companyRep.percent)).text}
                  </CVText>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CVPanel>
    </Box>
  );
};

export default ReTotales