import { CVCardProduct } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { v4 } from 'uuid';
import { MyLoaderMedium } from '../_styles';

function Resultados({ data, onload }) {
  return (
    <Flex flexWrap='wrap' justify='center'>
      {onload
        ? Array(10)
            .fill(0)
            .map((_, index) => (
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
        : (data || []).map((item) => (
            <CVCardProduct
              width='220px'
              key={v4()}
              product_id={item?.product_id}
              product_photo={item?.product_photo || ''}
              precio={item?.precio}
              product_name={item?.product_name}
              precio_minimo={item?.precio_minimo}
              precio_maximo={item?.precio_maximo}
              offer_type={item?.offer_type}
              offer_value={item?.offer_value}
              offer={item?.offer}
              percentage_oferta={item?.percentage_oferta}
              puntuacion={item.stars}
              product_slug={item.product_slug}
              pedido_minimo={item?.pedido_minimo || 1}
              item={item}
              delivery_free={item?.delivery_free || false}
            />
          ))}
    </Flex>
  );
}

export default Resultados;
