import { PRODUCTS_RANDOM_PUBLIC } from '@/app/api/graphql/webpublic/products/HomeProducts';
import { CVCardProduct, CVLine, CVOverflow } from '@/common/CovendeTemplate';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { MyLoaderMedium } from '../../categoria/_styles';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function WProductosSimilares({ categories, products }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);

  const initData = async () => {
    const resp = await AxiosGQL(
      PRODUCTS_RANDOM_PUBLIC(6, categories, products)
    );

    setData(resp);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [categories]);

  return (
    <Grid item xs={12} sm={12} md={12}>
      <CVLine titles={['Productos Similares']} color='blue' />
      <CVOverflow>
        {loading
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
          : (data?.productsRandomPublic?.productsItemPublic || [] || []).map(
              (item) => (
                <CVCardProduct
                  variant='medium'
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
              )
            )}
      </CVOverflow>
    </Grid>
  );
}

export default WProductosSimilares;
