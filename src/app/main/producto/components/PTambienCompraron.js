import { PRODUCTS_RANDOM_PUBLIC } from '@/app/api/graphql/webpublic/products/HomeProducts';
import { CVLine, CVOverflow } from '@/common/CovendeTemplate';
import { useQueryGQL } from '@/common/hooks';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProductList from '../../home/shared/ProductVerticalList';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function PTambienCompraron({ idsCategories, store_id }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  let initData = async () => {
    let { productsRandomPublic } = await AxiosGQL(
      PRODUCTS_RANDOM_PUBLIC(5, idsCategories, [], store_id)
    );

    if (productsRandomPublic?.status) setError(false);
    else setError(true);

    if (productsRandomPublic?.productsItemPublic)
      setData(productsRandomPublic?.productsItemPublic);

    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, [store_id]);

  return (
    <Grid item xs={12} sm={12} md={12}>
      <CVLine titles={['Otros Productos de la tienda']} color='blue' />
      <CVOverflow>
        <ProductList
          limit={5}
          loading={loading}
          error={error}
          data={data || []}
        />
      </CVOverflow>
    </Grid>
  );
}

export default PTambienCompraron;
