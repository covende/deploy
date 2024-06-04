import { CVCardProduct, CVLine } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { v4 } from 'uuid';
import { MyLoaderMedium } from '../../_styles';

function MasCompradosCovende({ lista, onload }) {
  return (
    <div>
      <CVLine titles={['Los más vendidos']} />
      <Box display='flex' overflow='auto'>
        {onload
          ? Array(5)
              .fill(0)
              .map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: '#fff',
                    boxSizing: 'border-box',
                    borderRadius: '14px',
                    margin: '5px'
                  }}>
                  <MyLoaderMedium />
                </div>
              ))
          : lista.map((item) => (
              <CVCardProduct
                key={v4()}
                product_id={item?.product_id}
                product_photo={item?.product_photo || ''}
                precio={item?.precio}
                product_name={item?.product_name}
                precio_minimo={item?.precio_minimo}
                precio_maximo={item?.precio_maximo}
                offer={item?.offer}
                percentage_oferta={item?.percentage_oferta}
                puntuacion={item.stars}
                product_slug={item.product_slug}
                pedido_minimo={item?.pedido_minimo || 1}
                item={item}
              />
            ))}
      </Box>
    </div>
  );
}

export default MasCompradosCovende;
