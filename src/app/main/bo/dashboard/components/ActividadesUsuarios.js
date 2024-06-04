import React from 'react';

// UI Components
import { Box, Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { CVColumn, CVImage, CVRow, CVText } from '@/common/CovendeTemplate';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import DatosWeb from './DatosWeb';
import { CVDateFormat } from '@CVPages/core/admin/seller/estadisticas/components/MVendidosUtils';

export const CVFormatLongDate = (date = new Date()) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const hours = date.toLocaleTimeString();
  const onlyDate = date.toLocaleDateString('es-ES', options);
  return `${hours} hrs. / ${onlyDate}`;
};

const DesempenhoVendedores = (props) => (
  <Box padding='1rem' backgroundColor='#FFFFFF' rounded='1rem'>
    <CVText textAlign='center' fontSize='1.5rem' fontWeight='bold' color='blue'>
      {props.stats.title}
    </CVText>
    <SizeBox />
    <CVRow justifyContent='space-between'>
      {props.stats.types.map((type, index) => (
        <Flex key={index} direction='column' alignItems='center'>
          <CVImage
            height='44px'
            width='auto'
            image={type.imageSrc}
            name='global'
          />
          <CVText fontSize='1.5rem' color='blue'>
            {type.quantity}
          </CVText>
        </Flex>
      ))}
    </CVRow>
  </Box>
);

const ActividadesRecientes = (props) => (
  <Box padding='1rem' backgroundColor='#FFFFFF' rounded='1rem'>
    <CVText textAlign='center' fontSize='1.5rem' fontWeight='bold' color='blue'>
      Actividades recientes
    </CVText>
    <CVColumn height='240px' wrap='nowrap'>
      {props.activities.map((activity) => (
        <Flex key={v4()} p='10px' borderBottom='1px solid #DEDEDE' w='100%'>
          <CVImage
            width='57px'
            height='57px'
            image={activity.photo}
            name='global'
            borderRadius='50%'
          />
          <SizeBox />
          <Flex direction='column' justifyContent='center'>
            <CVText fontSize='11' color='blue' fontWeight='500'>
              {activity.name}
            </CVText>
            <CVText fontSize='11' color='boldGray'>
              {activity.role}
            </CVText>
            <CVText fontSize='11' color='boldGray'>
              {CVFormatLongDate(new Date(activity.date))}
            </CVText>
          </Flex>
        </Flex>
      ))}
    </CVColumn>
  </Box>
);

function ActividadesUsuarios({ performance, twoBestProducts, activityUsers }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6}>
        <DesempenhoVendedores
          stats={{
            title: 'Desempeño de Vendedores',
            types: [
              {
                imageSrc: 'https://i.imgur.com/tQ3wG7g.png',
                gridArea: 'a',
                quantity: performance?.bad
              },
              {
                imageSrc: 'https://i.imgur.com/gKLHoP7.png',
                gridArea: 'b',
                quantity: performance?.regular
              },
              {
                imageSrc: 'https://i.imgur.com/UE32ZiF.png',
                gridArea: 'c',
                quantity: performance?.good
              }
            ]
          }}
        />
        <SizeBox />
        <ActividadesRecientes activities={activityUsers || []} />
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <DatosWeb {...{ twoBestProducts }} />
      </Grid>
    </Grid>
  );
}

export default ActividadesUsuarios;
