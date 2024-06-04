import { FULL_QUERY_PRODUCTS } from '@/app/api/graphql/webpublic/category/CategoryService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CVGoUp } from '@/common/CovendeTemplate/CVMethods';
import ProductsList from './ProductsList';

function Categoria() {
  const [loading, setloading] = useState(false);
  const [lista, setlista] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const { slug } = useParams();

  const initdata = async (filtro, codigoCategoria, page, setInfoPagination) => {
    try {
      if (codigoCategoria?._id == '') return;

      CVGoUp({});
      setloading(true);
      const productsByCategoryPublic = await AxiosGQL(
        FULL_QUERY_PRODUCTS(filtro, codigoCategoria, page, sortBy, 20)
      );

      setlista(productsByCategoryPublic.productsPublic.productsItemPublic);
      setInfoPagination(productsByCategoryPublic.productsPublic.info);
      setloading(false);
      // CVGoUp({});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ProductsList
      loading={loading}
      setloading={setloading}
      lista={lista}
      slug={slug}
      search={''}
      fetchdata={initdata}
      setSortBy={setSortBy}
      sortBy={sortBy}
    />
  );
}

export default Categoria;
