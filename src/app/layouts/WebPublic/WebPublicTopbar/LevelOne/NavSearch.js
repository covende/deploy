import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import { CVRenderHTML } from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

const ItemStyle = styled.div`
  width: 100%;
  padding: 5px;
  & a {
    color: black;
  }
  &:hover {
    background-color: ${COLORS['primary'] + 10};
    color: ${COLORS['primary']};
  }
`;

const consult = (search) => `{
	productSearchPublic(search:"${search}"){
    store{
      _id
      social_razon
      comercial_name
      logo
    }
    categories{
      _id
      name
      slug
    }
    product_name
    slug
  }
}`;

function NavSearch({ search }) {
  const [data, setdata] = useState({
    productos: [],
    categorias: [],
    tiendas: []
  });

  const searchdata = async (search) => {
    let products = [];
    let cats = [];
    let stores = [];

    const { productSearchPublic } = await AxiosGQL(consult(search));
    productSearchPublic.forEach((item) => {
      products.push({
        slug: item.slug,
        product_name: item.product_name
          .toLowerCase()
          .replaceAll(search, `<b>${search}</b>`)
      });
      cats = [...cats, ...item.categories];
      stores.push(item.store);
    });

    setdata({
      productos: products,
      categorias: cats.filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      ),
      tiendas: stores.filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      )
    });
  };

  useEffect(() => {
    searchdata(search.toLowerCase());
  }, [search]);

  return (
    <Flex
      borderRadius='0 0 1rem 1rem'
      padding='1rem'
      border={'2px solid ' + COLORS['primary']}
      borderTop='none'
      width='100%'
      height='100%'
      maxHeight={data.productos.length == 0 ? '50px' : '400px'}
      backgroundColor='white'
      position='absolute'
      zIndex={2}
      overflowY='auto'>
      {data.productos.length == 0 ? (
        <Flex>
          <CVText color='gray'>No se encontraron resultados</CVText>
        </Flex>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={4}>
            {data.productos.map((item) => (
              <ItemStyle key={v4()}>
                <Link to={'/producto/' + item.slug}>
                  <CVRenderHTML children={item.product_name} />
                </Link>
              </ItemStyle>
            ))}
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CVText color='gray' fontWeight='bold'>
              Categorías Relacionadas
              <SizeBox />
              {data.categorias.map((item) => (
                <ItemStyle key={v4()}>
                  <Link to={'/productos-de-categoria/' + item.slug}>
                    <Flex>{item.name}</Flex>
                  </Link>
                </ItemStyle>
              ))}
            </CVText>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <CVText color='gray' fontWeight='bold'>
              Tiendas Relacionadas
              <SizeBox />
              {data.tiendas.map((item) => (
                <ItemStyle key={v4()}>
                  <Link to={`/tienda/${item._id}/${item.comercial_name}`}>
                    <Flex alignItems='center'>
                      <CVImage
                        width='32px'
                        height='32px'
                        image={item.logo}
                        // name={item?.comercial_name || 'NNN'}
                        // variant='avatar'
                      />
                      <SizeBox />
                      {item.comercial_name}
                    </Flex>
                  </Link>
                </ItemStyle>
              ))}
            </CVText>
          </Grid>
          {data.productos.length == 10 && (
            <Grid item xs={12}>
              <Flex
                justifyContent='right'
                paddingRight='1rem'
                paddingBottom='1.2rem'>
                <Link to={'/productos-de-busqueda/' + search}>
                  <CVText fontSize='1.1rem' fontWeight='bold' color='blue'>
                    Ver todo
                  </CVText>
                </Link>
              </Flex>
            </Grid>
          )}
        </Grid>
      )}
    </Flex>
  );
}

export default NavSearch;
