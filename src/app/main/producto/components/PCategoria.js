import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVBreadcrumb } from '@/common/CovendeTemplate';
import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

function PCategoria({ calegorias, product_id, campaign }) {
  /*
categories{
      _id
      name
      slug
    }
*/
  const initdata = async () => {
    await AxiosGQL(`
  mutation{
    addVisitedProduct(product_id:"${product_id || ''}", campaign:"${
      campaign || ''
    }")
  }
  `);
  };

  useEffect(() => {
    if (product_id) initdata();
  }, [product_id]);

  return (
    <CVBreadcrumb
      data={[
        { text: 'Inicio', uri: '/' },
        ...calegorias.map((category, idx) => ({
          text: category.name,
          uri: `/productos-de-categoria/${category.slug}`
        }))
      ]}
    />
  );
}

export default PCategoria;
