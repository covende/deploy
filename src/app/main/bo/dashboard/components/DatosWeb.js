import React, { useEffect, useState } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVColumn,
  CVImage,
  CVPanel,
  CVText
} from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import { Grid } from '@material-ui/core';
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp
} from 'react-icons/hi';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { GOOGLE_ANALITICS_SERVICE } from '@CVApi/core/webbo/CovendeData/datosCovende';
import TraficWeb from './TraficWeb';

function DatosWeb({ twoBestProducts }) {
  const [visits, setVisits] = useState(0);
  const [users, setUsers] = useState(0);
  const [sesion, setSesion] = useState(0);
  useEffect(() => {
    AxiosGQL(GOOGLE_ANALITICS_SERVICE())
      .then(({ googleAnalyticService }) => {
        if (googleAnalyticService.status == 200) {
          setVisits(googleAnalyticService.CantVisits);
          setUsers(googleAnalyticService.CantUsers);
          setSesion(googleAnalyticService.CantSesions);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const lista = [
    {
      title: 'Núm. de visitas',
      value: visits,
      variation: 27,
      status: true,
      color: 'primary'
    },
    {
      title: 'Returning visits:',
      value: sesion,
      variation: 18,
      status: true,
      color: 'green'
    },
    {
      title: 'Núm. de compras:',
      value: '23',
      variation: 15,
      status: true,
      color: 'red'
    },
    {
      title: 'Subastas activas:',
      value: '74',
      variation: 45,
      status: true,
      color: 'yellow'
    }
  ];

  const Items = ({ item }) => (
    <Grid item xs={12} sm={12} md={6}>
      <Box>
        <CVText fontSize='11' color='blue' fontWeight='bold'>
          {item.title}
        </CVText>
        <Flex alignItems='center'>
          <Box w='50px'>
            <CVText
              marginRight='5px'
              textAlign='center'
              fontSize='15'
              color={item.color}>
              {item.value}
            </CVText>
          </Box>
          <CVButton
            backgroundColor={item.color}
            fontWeight='bold'
            height='auto'
            padding='0 5px'
            fontSize='10px'>
            {item.variation}% <SizeBox width='5px' />
            {item.status ? (
              <HiOutlineArrowNarrowUp />
            ) : (
              <HiOutlineArrowNarrowDown />
            )}
          </CVButton>
        </Flex>
      </Box>
    </Grid>
  );

  const Prods = ({ item }) => (
    <Flex margin='0.5rem 0'>
      <CVImage
        width='32px'
        height='auto'
        variant='avatar'
        image={item.photo}
        name='global'
      />
      <SizeBox />
      <CVColumn justifyContent='center'>
        <CVText fontSize='0.75rem' fontWeight='bold'>
          {item.name}
        </CVText>
        <CVText fontSize='0.75rem'>{item.id}</CVText>
      </CVColumn>
    </Flex>
  );

  return (
    <CVPanel itemDirection='column'>
      <CVText
        textAlign='center'
        fontSize='1.5rem'
        fontWeight='bold'
        color='blue'>
        Datos de la Web
      </CVText>
      <SizeBox />
      <Grid container spacing={1}>
        {lista.map((item) => (
          <Items key={v4()} item={item} />
        ))}
      </Grid>
      <SizeBox />
      <CVText textAlign='center' fontSize='1rem' color='blue' fontWeight='bold'>
        Los dos productos mas vendido:
      </CVText>
      {twoBestProducts &&
        twoBestProducts.map((item) => <Prods key={v4()} item={item} />)}
      <SizeBox />
      <CVText textAlign='center' fontSize='1rem' color='blue' fontWeight='bold'>
        Tráfico de la web
      </CVText>
      <TraficWeb percentage={users} />
    </CVPanel>
  );
}

export default DatosWeb;
