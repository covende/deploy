import React from 'react';
import { Grid } from '@material-ui/core';
import { CVCheck, CVInput } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/layout';

function CMFiltros({ filtro, setfiltro }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={4}>
        <CVInput
          value={filtro.search}
          onChange={(value) => setfiltro({ ...filtro, search: value })}
          iconFind={true}
          buttonColor='white'
          iconColor='primary'
        />
      </Grid>
      {/* <Grid item xs={12} sm={12} md={4}>
        <Flex justifyContent='space-around'>
          <CVCheck
            title='V'
            alignTitle='left'
            value={filtro.seller}
            onChange={(value) =>
              setfiltro({ ...filtro, seller: value || false })
            }
          />
          <CVCheck
            title='C'
            alignTitle='left'
            value={filtro.buyer}
            onChange={(value) =>
              setfiltro({ ...filtro, buyer: value || false })
            }
          />
        </Flex>
      </Grid> */}
      <Grid item xs={12} sm={12} md={4}></Grid>
    </Grid>
  );
}

export default CMFiltros;
