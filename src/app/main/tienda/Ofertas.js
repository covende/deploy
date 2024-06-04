import React, { useEffect, useState } from 'react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { MyLoader } from '@/common/components/Loaders/MyLoader';
import { v4 } from 'uuid';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Flex } from '@chakra-ui/react';
import { FULL_QUERY_PRODUCTS_OFERT_BY_STORE } from '@/app/api/graphql/webpublic/products/ProductosPublicService';
import { Container } from '@material-ui/core';
import CVPagination from '@/common/CovendeTemplate/CVPagination';
import { CVCardProduct } from '@/common/CovendeTemplate';
const Ofertas = ({ codTienda }) => {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [infoPagination, setInfoPagination] = useState([]);
  const initdata = async () => {
    setLoading(true);
    const { productsPublic } = await AxiosGQL(
      FULL_QUERY_PRODUCTS_OFERT_BY_STORE(codTienda, page)
    );

    if (!productsPublic) return;

    setproducts(productsPublic?.productsItemPublic);
    setInfoPagination(productsPublic?.info);
    setLoading(false);
  };
  useEffect(() => {
    initdata();
  }, [page]);

  return (
    <Container>
      <SizeBox />
      <Flex flexWrap='wrap'>
        {loading
          ? Array(15)
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
              ))
          : products.map((item, index) => (
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
                offer_type={item?.offer_type}
                offer_value={item?.offer_value}
                puntuacion={item.stars}
                product_slug={item.product_slug}
                pedido_minimo={item?.pedido_minimo || 1}
                item={item}
              />
            ))}
      </Flex>
      <CVPagination
        marginTop='16px'
        setPage={setPage}
        page={page}
        pageNumber={infoPagination.pages}
      />

      <SizeBox />
    </Container>
  );
};
export default Ofertas;
