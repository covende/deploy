import CVRow from '@CVTemplate/core/CVRow';
import { COLORS } from '@CVTemplate/core/CVThemes';
import React from 'react';
import { Box, Progress } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import CVText from '@CVTemplate/core/CVText';
import CVPanel from '@CVTemplate/core/CVPanel';
import { Grid } from '@material-ui/core';
import CVImage from '@CVTemplate/core/CVImage';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

const DCCalificacion = ({ client }) => {
  return (
    <Box>
      <CVPanel variant='box' padding='2rem' height='auto'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4}>
            <CVRow height='auto'>
              <CVImage
                variant='avatar'
                name={client?.store?.comercial_name}
                height='75px'
                width='75px'
                image={client?.store?.logo}
              />
              <SizeBox />
              <Box>
                <CVText>{client?.store?.comercial_name}</CVText>
                <CVText color='green'>Embajador</CVText>
              </Box>
            </CVRow>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CVRow alignItems='center'>
              <Box width='100%'>
                <Progress
                  colorScheme='green'
                  size='lg'
                  value={60}
                  rounded='5px'
                />
              </Box>
            </CVRow>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CVRow alignItems='center' justifyContent='center'>
              <FaCheckCircle
                style={{ fontSize: '3.5rem', color: COLORS['green'] }}
              />
              <SizeBox />
              <Box>
                <CVText fontSize='2rem' fontWeight='bold'>
                  94%
                </CVText>
                <CVText color='green'>Bueno</CVText>
              </Box>
            </CVRow>
          </Grid>
        </Grid>
      </CVPanel>
    </Box>
  );
};

export default DCCalificacion;
