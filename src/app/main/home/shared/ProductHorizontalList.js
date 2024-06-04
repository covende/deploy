import React from 'react';
import ContentLoader from 'react-content-loader';
import { v4 } from 'uuid';
import { CVCardProduct } from '@/common/CovendeTemplate';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={307}
    height={164}
    viewBox='0 0 307 164'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <rect x='16' y='16' rx='5' ry='5' width='128' height='23' />
    <rect x='16' y='45' rx='5' ry='5' width='118' height='21' />
    <rect x='16' y='75' rx='5' ry='5' width='50' height='14' />
    <rect x='16' y='95' rx='5' ry='5' width='43' height='17' />
    <rect x='16' y='123' rx='16' ry='16' width='128' height='21' />
    <rect x='155' y='16' rx='4' ry='4' width='130' height='130' />
  </ContentLoader>
);

function ProductList({
  limit,
  loading,
  error,
  data = [],
  imgWidth,
  width,
  height
}) {
  return !loading || data.length > 0
    ? data.map((item, index) => {
        if (index < limit) {
          return (
            <CVCardProduct
              variant='large'
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
              width={width}
              height={height}
              imgWidth={imgWidth}
            />
          );
        }
      })
    : Array(limit)
        .fill(0)
        .map((item, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              boxSizing: 'border-box',
              borderRadius: '14px'
            }}>
            <MyLoader />
          </div>
        ));
}

export default ProductList;
