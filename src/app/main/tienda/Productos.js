import React, { createContext, useContext, useState, useEffect } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Text } from '@chakra-ui/react';
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import Resultados from '../categoria/Resultados';
import {
  RESULT_QUERY_PRODUCTS_STORE,
  FULL_QUERY_PRODUCTS_STORE_PAGE
} from '@/app/api/graphql/webpublic/products/ProductosPublicService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  CATEGORY_BY_STORE_PUBLIC,
  CATEGORY_PRODUCT_BY_SLUG
} from '@/app/api/graphql/webpublic/category/CategoryService';

import CategoriesPanel from '../categoria/Filtros/CategoriesPanel';
import Filters from '@/app/components/Filters';
import arrayToTree from 'array-to-tree';
import CVPagination from '@/common/CovendeTemplate/CVPagination';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { CategoriesItem } from '@/app/components/Filters/_styles';
import { formatpaginate } from '@/common/utils/methods';
import { categoryProductsByID } from '@CVApi/core/categories/services/categoryservice';
import { CVGoUp } from '@CVTemplate/core/CVMethods';

const useStyles = makeStyles({
  ExteriorBox: {
    paddingLeft: '15%',
    width: '150%'
  },

  Box: {
    textTransform: 'capitalize',
    marginBottom: '6%',
    '&:hover': {
      color: COLORS.skyblue
    }
  },
  MuiAccordionroot: {
    '&.MuiAccordion-root:before': {
      backgroundColor: 'white'
    }
  }
});

export const initfiltro = {
  //category_id: '',
  filtro: {
    marca_id: '',
    marca_ids: [],
    condicion: '',
    price_range: {
      desde: '',
      hasta: ''
    },
    type_sale: 'BOTH'
  },
  filtro_o: {
    mayor_precio: false,
    menor_precio: false,
    novedades: false,
    mas_vendido: false,
    mejor_calificado: false
  },
  offer: false,
  firstTime: true
};

const Productos = ({ codTienda }) => {
  const [filtro, setfiltro] = useState({ ...initfiltro, codTienda });
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [paginate, setPaginate] = useState();
  const [productsItem, setProductsItem] = useState([]);
  const [category, setcategory] = useState({ _id: '' });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categoriID, setCategoriID] = useState('');

  const classes = useStyles();

  const getItemFilter = async () => {
    const { categoriesByStorePublic } = await AxiosGQL(
      CATEGORY_BY_STORE_PUBLIC(codTienda)
    );
    const treeCategories = arrayToTree(categoriesByStorePublic, {
      customID: '_id',
      parentProperty: 'parent_id'
    });
    setCategories(treeCategories);
  };

  useEffect(() => {
    getItemFilter();
    return () => setCategories([]);
  }, []);

  const initData = async (filtro) => {
    const { productsPublic } = await AxiosGQL(
      FULL_QUERY_PRODUCTS_STORE_PAGE(codTienda, page, filtro, categoriID)
    );
    if (productsPublic) {
      setPaginate(productsPublic.info);

      setProductsItem(productsPublic.productsItemPublic);
      CVGoUp({});
    }
  };

  useEffect(() => {
    initData(filtro);
  }, [page, setfiltro]);

  const getDataFilter = async () => {
    try {
      setLoading(true);
      let foundCategory = await categoryProductsByID({ _id: categoriID });
      if (!foundCategory) return;
      setcategory(foundCategory);

      const { productsPublic } = await AxiosGQL(
        RESULT_QUERY_PRODUCTS_STORE(codTienda, filtro, categoriID, page)
      );
      if (productsPublic) {
        setProductsItem(productsPublic.productsItemPublic);
        setPaginate(productsPublic.info);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !filtro.firstTime && getDataFilter();
    setfiltro({ ...filtro, firstTime: false });
    return () => setProductsItem([]);
  }, [categoriID]);

  return (
    <Box ml={35}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} md={3}>
          <Box
            bg='white'
            padding='1rem'
            borderRadius='1rem'
            mb={3}
            mt={9}
            overflow='auto'>
            <CVText color='blue' fontSize='18' fontWeight={600} margin='17px'>
              Categorías
            </CVText>
            {categories.map((item, index) => (
              <Accordion
                elevation={0}
                classes={{
                  root: classes.MuiAccordionroot
                }}
                key={index}
                expanded={expanded === index}
                onChange={(event, isExpanded) =>
                  (item.children || []).length > 0
                    ? setExpanded(isExpanded ? index : false)
                    : {}
                }>
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      style={{
                        fill:
                          (item.children || []).length > 0
                            ? COLORS.blue
                            : COLORS.white,
                        fontSize: 30
                      }}
                    />
                  }
                  id='panel1a-header'>
                  <span
                    onClick={() => {
                      setPage(1);
                      setCategoriID(item._id);
                    }}
                    style={{ textTransform: 'capitalize' }}>
                    {item.name}
                  </span>
                </AccordionSummary>

                {(item.children || []).length > 0 && (
                  <AccordionDetails>
                    <CategoriesItem>
                      {(item.children || []).map((itemChild, index) => (
                        <Box marginLeft='4rem' lineHeight='4rem' key={index}>
                          {itemChild.parent_id == item._id && (
                            <Box
                              onClick={() => {
                                setPage(1);
                                setCategoriID(itemChild._id);
                              }}
                              fontSize='12px'
                              color='#4D4D4D'
                              fontWeight='500'
                              mt='-1rem'
                              className={classes.Box}>
                              {itemChild.name}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </CategoriesItem>
                  </AccordionDetails>
                )}
              </Accordion>

              // <Box
              //   ml={4}
              //   title={item.name}
              //   backgroundColor='#FFFFFF'
              //   key={item._id}
              //   onClick={() => getIdCategory(item.slug)}>
              //   <CVText variant='maxtext' lines={2}>
              //     {item.name}
              //   </CVText>

              //   <CategoriesPanel
              //     setblug={setblug}
              //     category={item}
              //     hide={true}
              //     key={item._id}
              //     allCategorysStore={allCategorysStore}
              //   />
              // </Box>
            ))}
          </Box>

          <CVPanel variant='box' height='auto'>
            <Filters
              category={category}
              filtro={filtro}
              setfiltro={setfiltro}
              fetchdata={initData}
              blug={categoriID}
            />
          </CVPanel>
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          <Box padding='1rem' borderRadius='1rem'>
            <SizeBox />
            <Resultados
              data={productsItem}
              data2={productsItem}
              onload={loading}
            />
            <SizeBox />

            <CVPagination
              setPage={setPage}
              page={page}
              pageNumber={paginate?.pages || 0}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Productos;
