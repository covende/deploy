import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { Grid } from '@material-ui/core';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import { MenuItemStyle } from '../index.styles';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex } from '@chakra-ui/layout';
import { useHistory } from 'react-router';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import CVCardProduct from '@CVTemplate/core/CVCardProduct';

const CategoryMenuItem = (props) => {
  const history = useHistory();
  const gotoCategory = (route) => history.push(route);
  return (
    <Box
      onClick={() => {
        gotoCategory(props.route);
        props.setseemenu(false);
      }}
      display='flex'
      alignItems='center'
      width='100%'
      height='100%'>
      <CVImage image={props.icon} width='35px' height='auto' />
      <SizeBox />
      <span> {props.label}</span>
    </Box>
  );
};

const SubcategoryColumn = ({ setseemenu, data }) => {
  const history = useHistory();
  const gotoCategory = (route) => history.push(route);

  return data.map((subcategory) => (
    <Grid item xs={12} sm={12} md={7} key={v4()} gap='normal'>
      <Box
        fontWeight='bold'
        onClick={() => {
          setseemenu(false);
          gotoCategory('/productos-de-categoria/' + subcategory.slug);
        }}>
        <MenuItemStyle>
          {/* <CVImage image={subcategory.image} width='35px' /> */}
          <SizeBox />
          <span> {subcategory.name}</span>
        </MenuItemStyle>
      </Box>
      {subcategory.children
        ? subcategory.children.map((section) => (
            <Box
              key={v4()}
              paddingLeft='1rem'
              onClick={() => {
                setseemenu(false);
                gotoCategory('/productos-de-categoria/' + section.slug);
              }}>
              <MenuItemStyle>
                {/* <CVImage image={section.image} width='35px' /> */}
                <SizeBox />
                <span> {section.name}</span>
              </MenuItemStyle>
            </Box>
          ))
        : ''}
    </Grid>
  ));
};

const OffersColumn = ({ data = [] }) => (
  <Flex justifyContent='center' overflow='auto' width='100%' height='70%'>
    <Grid container>
      {data ? (
        data.map((item) => (
          <Grid item xs={6} sm={6} md={6} id={v4()} key={v4()}>
            <CVCardProduct
              key={v4()}
              variant='small'
              width='208px'
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
              item={item}
              height='157px'
              imgWidth='157px'
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={6} sm={6} md={6} id={v4()} key={v4()}>
          <span>Ninguna subcategoría...</span>
        </Grid>
      )}
    </Grid>
  </Flex>
);

export const DataMenus = (treecategorys, setseemenu) => {
  return treecategorys.map((tree) => {
    return {
      key: v4(),
      label: (
        <CategoryMenuItem
          label={tree.name}
          icon={tree.image}
          setseemenu={setseemenu}
          route={'/productos-de-categoria/' + tree.slug}
        />
      ),
      items: (
        <Grid container spacing={1}>
          <Grid item xs={12} md={5}>
            <Grid container>
              <SubcategoryColumn
                setseemenu={setseemenu}
                data={tree.children || []}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Link to={'/productos-de-categoria/' + tree.slug}>
              <CVImage
                image={tree.banner}
                width='100%'
                height='auto'
                borderRadius='1rem'
              />
            </Link>
            <SizeBox />
            <OffersColumn data={tree.products} />
          </Grid>
          <Grid item xs={12} md={2}>
            <CVText textAlign='center' fontSize='1.5rem' fontWeight='bold'>
              Tiendas
            </CVText>
            <SizeBox />
            <Flex
              padding='0.5rem'
              // border={'1px solid ' + COLORS['red']}
              gap='10px'
              direction='column'
              width='100%'>
              {tree.stores ? (
                tree.stores.map((store) => (
                  <Flex key={v4()} direction='column' align='center' gap='5px'>
                    <CVImage
                      link={`/tienda/${store._id}/${store.comercial_name}`}
                      width='6rem'
                      image={store.logo}
                    />
                    <CVText>{store.comercial_name}</CVText>
                  </Flex>
                ))
              ) : (
                <Flex
                  justifyContent='center'
                  padding='1rem'
                  fontSize='3rem'
                  backgroundColor={COLORS['red']}
                  width='100%'>
                  A
                </Flex>
              )}
            </Flex>
          </Grid>
        </Grid>
      )
    };
  });
};
