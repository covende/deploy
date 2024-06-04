import { PRODUCT_ATTRIBUTES_DETAILS } from '@/app/api/graphql/webseller/ProductService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import themeCovende from '@/themeCovende';
import { Flex } from '@chakra-ui/layout';
import { Box, Button, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import {
  ContainerAttr,
  ContainerAttrDts,
  ProductSubTitle
} from '../../ProductsStyle';
import * as User from '@/app/helpers/authUtils';
import { Trash } from '@/app/assets/icons';
import CVSelectMultiple from '@CVTemplate/core/CVSelectMultiple';
import CVText from '@CVTemplate/core/CVText';
import { useSelector } from 'react-redux';

function Atributos({
  attributes,
  setProducto,
  allattributes,
  setOpenAtributos,
  resetAttrs
}) {
  const { client } = useSelector((state) => state.Clients);

  const removeAttr = (id) =>
    setProducto({
      attributes: attributes.filter((da) => da.product_attribute_id != id)
    });

  const selecteds = (ls) => ls.filter((sd) => sd.selected);

  const detailsselected = (values, product_attribute_id) => {
    let da = [...attributes];
    da = da.map((dit) => {
      if (dit.product_attribute_id == product_attribute_id) {
        let dd = [...dit.attributes_details];
        const isExist = (_id) => {
          let res = values.filter(
            (ddd) => ddd.product_attribute_detail_id == _id
          );
          return res.length != 0;
        };
        dd = dd.map((ddit) => {
          ddit = { ...ddit, selected: false };
          if (isExist(ddit.product_attribute_detail_id)) {
            ddit = { ...ddit, selected: true };
          }
          return ddit;
        });
        dit.attributes_details = dd;
      }
      return dit;
    });
    setProducto({ attributes: da });
  };

  const initdata = async () => {
    const { productAttributes } = await AxiosGQL(
      PRODUCT_ATTRIBUTES_DETAILS(client?.store_id?._id || '')
    );
    let attrs = [];

    if (!productAttributes) return;

    if (attributes.length > 0) {
      attrs = attributes.map((sattr) => {
        let battr = productAttributes.filter(
          (it) => it.product_attribute_id == sattr.product_attribute_id
        );
        if (battr.length > 0) {
          battr[0].attributes_details.forEach((element) => {
            let dddattr = sattr.attributes_details.filter(
              (el) =>
                el.product_attribute_detail_id ==
                element.product_attribute_detail_id
            );
            if (dddattr.length == 0) {
              sattr.attributes_details.push(element);
            }
          });
        }
        return sattr;
      });
    }

    setProducto({
      allattributes: productAttributes,
      attributes: attrs,
      reset_attrs: true
    });
  };

  useEffect(() => {
    if (allattributes?.length === 0) {
      initdata();
    } else {
      if (attributes.length > 0 && !resetAttrs) {
        console.log('Volviendo a editar');
        let attrs = [];
        attrs = attributes.map((sattr) => {
          let battr = allattributes.filter(
            (it) => it.product_attribute_id == sattr.product_attribute_id
          );
          if (battr.length > 0) {
            battr[0].attributes_details.forEach((element) => {
              let dddattr = sattr.attributes_details.filter(
                (el) =>
                  el.product_attribute_detail_id ==
                  element.product_attribute_detail_id
              );
              if (dddattr.length == 0) {
                sattr.attributes_details.push(element);
              }
            });
          }
          return sattr;
        });
        setProducto({ attributes: attrs, reset_attrs: true });
      }
    }
  }, [attributes, allattributes]);

  return (
    <Box>
      <ProductSubTitle>1.4. Atributos del producto</ProductSubTitle>
      <Container>
        <CVText color='boldGray'>
          Los atributos son las características de tus productos como talla,
          color o género. Selecciona los que aplican a tus productos.
        </CVText>
        <CVText color='boldGray'>
          Si aún no has personalizado los atributos de tus productos haz{' '}
          {/* <Link to='/seller/productos/attributes'> */}
          <span
            onClick={() => setOpenAtributos(true)}
            style={{ color: themeCovende.colors.celeste, cursor: 'pointer' }}>
            click aquí
          </span>
          {/* </Link> */}
        </CVText>

        <br />

        {allattributes.length > 0 && (
          <ContainerAttr>
            <CVSelectMultiple
              options={allattributes}
              value={attributes}
              height='100%'
              multiple={true}
              itemText='name'
              itemValue='product_attribute_id'
              onChange={(values) => {
                setProducto({ attributes: values });
              }}
            />
          </ContainerAttr>
        )}
        <br />

        {/* {JSON.stringify(attributes.length)} */}
        {attributes.length > 0 && (
          <ContainerAttrDts>
            {attributes.map((it) => (
              <Grid key={v4()} container spacing={3}>
                <Grid item xs={12} sm={4} md={3}>
                  <CVText>{it.name}</CVText>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Flex alignItems='center' width='100%'>
                    <CVSelectMultiple
                      options={it?.attributes_details || []}
                      value={selecteds(it?.attributes_details || [])}
                      multiple={true}
                      itemText='name'
                      itemValue='product_attribute_detail_id'
                      onChange={(values) =>
                        detailsselected(values, it.product_attribute_id)
                      }
                    />
                    <Button onClick={() => removeAttr(it.product_attribute_id)}>
                      {Trash}
                    </Button>
                  </Flex>
                </Grid>
              </Grid>
            ))}
          </ContainerAttrDts>
        )}
      </Container>
    </Box>
  );
}

export default Atributos;
