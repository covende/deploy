import { CVCardProduct } from '@/common/CovendeTemplate';
import React from 'react';
import ContentLoader from 'react-content-loader';
import { v4 } from 'uuid';

export const MyLoaderVertical = (props) => (
  <ContentLoader
    speed={2}
    width={198}
    height={284}
    viewBox='0 0 198 284'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}>
    <rect x='11' y='13' rx='0' ry='0' width='176' height='176' />
    <rect x='19' y='197' rx='0' ry='0' width='108' height='20' />
    <rect x='155' y='201' rx='0' ry='0' width='30' height='12' />
    <rect x='18' y='221' rx='0' ry='0' width='133' height='24' />
    <rect x='166' y='225' rx='100' ry='100' width='19' height='19' />
    <rect x='18' y='256' rx='0' ry='0' width='47' height='12' />
    <rect x='78' y='256' rx='8' ry='8' width='107' height='17' />
  </ContentLoader>
);

function ProductList(props) {
  const { limit, loading, error, data, onAdd } = props;
  return !loading || data.length > 0
    ? data.map((item, index) => {
        if (index < limit) {
          return (
            <CVCardProduct
              key={v4()}
              product_id={item?.product_id}
              product_photo={item?.product_photo || ''}
              precio={item?.precio}
              product_name={item?.product_name}
              precio_minimo={item?.precio_minimo}
              precio_maximo={item?.precio_maximo}
              offer={item?.offer}
              offer_type={item?.offer_type}
              offer_value={item?.offer_value}
              percentage_oferta={item?.percentage_oferta}
              puntuacion={item.stars}
              product_slug={item.product_slug}
              pedido_minimo={item?.pedido_minimo || 1}
              delivery_free={item?.delivery_free || false}
              item={item}
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
            <MyLoaderVertical />
          </div>
        ));
}

export default ProductList;
