import React from 'react';

// UI components
import CVCarrusel from '@/common/CovendeTemplate/CVCarrusel';
import cocina from '@/app/assets/img/categoria.png';
import { v4 } from 'uuid';
import { Flex } from '@chakra-ui/layout';
import { ItemOfertaSemanal } from '../../_styles';
import { Box } from '@chakra-ui/react';
import { CVImage, CVLine } from '@/common/CovendeTemplate';

const images = [
  {
    src: 'https://source.unsplash.com/random/966x226?product&sig=1'
  },
  {
    src: 'https://source.unsplash.com/random/966x226?product&sig=2'
  },
  {
    src: 'https://source.unsplash.com/random/966x226?product&sig=3'
  },
  {
    src: 'https://source.unsplash.com/random/966x226?product&sig=4'
  }
];

const lista = [
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' },
  { src: cocina, title: 'Cocina' }
];

function OfertasSemanal(props) {
  return (
    <>
      <CVLine titles={['Ofertas de esta categoría']} />
      <CVCarrusel
        datalist={images.map((item, index) => (
          <CVImage key={index} image={item.src} height='auto' width='100%' />
        ))}
      />
      <br />
      <Box
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          padding: 'rem'
        }}>
        <Flex flexWrap='wrap'>
          {lista.map((it) => (
            <ItemOfertaSemanal key={v4()}>
              <CVImage image={it.src} />
              <span>{it.title}</span>
            </ItemOfertaSemanal>
          ))}
        </Flex>
      </Box>
    </>
  );
}

export default OfertasSemanal;
