import { PRODUCT_BY_SLUG } from '@/app/api/graphql/webpublic/products/ProductosPublicService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVLine } from '@/common/CovendeTemplate';
import { CVGoUp } from '@/common/CovendeTemplate/CVMethods';
import { Skeleton } from '@chakra-ui/react';
import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PCategoria from './components/PCategoria';
import PDescrition from './components/PDescrition';
import PFeedBack from './components/PFeedBack';
import PPresentacion from './components/PPresentacion';
import PRecomendado from './components/PRecomendado';
import PStore from './components/PStore';
import PTambienCompraron from './components/PTambienCompraron';
import { useLocation } from 'react-router-dom';
import arrayToTree from 'array-to-tree';
import SEO from '@/common/components/SEO/SEO';

function Producto(props) {
  const [product, setproduct] = useState(null);
  const [loading, setloading] = useState(true);
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const [idsCategories, setIdsCategories] = useState([]);
  const [totalcomment, settotalcomment] = useState(0);
  const [tienda, setienda] = useState({
    store_name: '',
    type_of_sale: '',
    _id: ''
  });

  const flattenTree = (tree) => {
    const flatArray = [];

    const flatten = (node) => {
      flatArray.push({ ...node, children: [] });
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => flatten(child));
      }
    };

    flatten(tree);
    return flatArray;
  };

  const initdata = async (slug) => {
    const { productBySlug } = await AxiosGQL(PRODUCT_BY_SLUG(slug));

    if (productBySlug?.product) {
      let categories = arrayToTree(productBySlug?.product?.categories, {
        parentProperty: 'parent_id',
        customID: '_id'
      });

      setproduct({
        ...productBySlug?.product,
        categories: categories.length > 0 ? flattenTree(categories[0]) : []
      });
      const idsCategories = categories.map((prod) => prod._id);
      setIdsCategories(idsCategories);
      localStorage.setItem('store', productBySlug?.product?.store_id || '');
      localStorage.setItem(
        'category',
        productBySlug?.product?.categories[0]._id || ''
      );
    }

    setloading(false);
  };

  useEffect(() => {
    initdata(props.match.params.slug);
    CVGoUp(props);
  }, [props.match.params.slug]);

  return (
    <>
      <SEO
        title={(product?.product_name || '') + ' ' + '| covende.com'}
        description={`Compra Online ${
          product?.product_name || ''
        } en covende.com`}
        name='covende.com'
        type='website'
        url={`${process.env.APP_URL}/producto/${product?.slug || ''}`}
        image={product?.thumbnail || ''}
      />
      {product != null && (
        <PCategoria
          calegorias={product.categories}
          product_id={product.product_id}
          campaign={searchParams.get('campaign')}
        />
      )}

      <Container style={{ scrollBehabior: 'smooth' }}>
        {!loading ? (
          <Grid container spacing={1}>
            {product != null ? (
              <>
                <PPresentacion
                  totalcomment={totalcomment}
                  tienda={tienda}
                  type_of_sale={product.type_of_sale}
                  product_name={product.product_name}
                  product_id={product.product_id}
                  wholesale={product.wholesale || []}
                  variations={product.variations || []}
                  product_attributes={product.product_attributes || []}
                  stock={product.stock}
                  price_unit={product.price_unit}
                  offer={product?.offer || false}
                  offer_type={product?.offer_type}
                  offer_value={product?.offer_value}
                  offer_percentage={product.offer_percentage}
                  offer_start_date={product.offer_start_date}
                  offer_end_date={product.offer_end_date}
                  preparation_time={product.preparation_time}
                  product_detail={product.product_detail}
                  store={product.store}
                  product_origin={product.product_origin}
                  product_condition={product.product_condition}
                  product_brand={product.product_brand}
                  store_id={product.store_id}
                  stars={product.stars || 0}
                  visits={product.visits || 0}
                  campaign={searchParams.get('campaign')}
                  delivery_free={product?.delivery_free || false}
                />
                <PDescrition product={product} />
                <PStore store={product.store_id} setienda={setienda} />
                <PFeedBack
                  product_id={product.product_id}
                  rating={product.stars || 0}
                  totalcomment={totalcomment}
                  settotalcomment={settotalcomment}
                />
                {idsCategories.length != 0 && (
                  <>
                    <PRecomendado
                      idsCategories={
                        product?.main_category
                          ? [product.main_category]
                          : idsCategories
                      }
                    />
                    <PTambienCompraron
                      store_id={product.store_id}
                      idsCategories={
                        product?.main_category
                          ? [product.main_category]
                          : idsCategories
                      }
                    />
                  </>
                )}
              </>
            ) : (
              <Grid item xs={12} sm={12} md={12}>
                Producto no Existe o retirado
              </Grid>
            )}
          </Grid>
        ) : (
          <Skeleton height='100vh' />
        )}
      </Container>
    </>
  );
}

export default Producto;
