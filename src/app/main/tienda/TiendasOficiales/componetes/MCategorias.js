import { Box, Center, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CATEGORY_HEADER_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import { CVImage, CVOverflow, CVText } from '@/common/CovendeTemplate';
import { COLORS, SCREEN } from '@/common/CovendeTemplate/CVThemes';
import { useHistory } from 'react-router';
import CVCarrusel from '@CVTemplate/core/CVCarrusel';
import { breakpointsCCategories } from '@CVPages/core/home/MejorValorados/breakpoints';
import ContentLoader from 'react-content-loader';

function MCategorias({
  SCategoriesHeaderPublic = [],
  loading = false,
  id_category = 'all'
}) {
  const [bestCategorys, setBestCategorys] = useState([]);
  const [isload, setisload] = useState(false);
  const topCategory = async () => {
    // console.log('Llamando a la api de lista categories');
    // const listCategorys = await AxiosGQL(CATEGORY_HEADER_PUBLIC());
    // setBestCategorys(listCategorys.categoriesHeaderPublic);
    loading = true;
  };
  const history = useHistory();
  // const { categorys } = useSelector((state) => state.CategoryProducts);

  // const {goto} = (slug) => {
  //   history.push('/productos-de-categoria/' + slug);
  // };

  useEffect(() => {
    if (!isload) {
      if (
        SCategoriesHeaderPublic.length == 0 &&
        bestCategorys.length == 0 &&
        !loading
      ) {
        topCategory();
        setisload(!isload);
      } else {
        // setBestCategorys([
        //   ...SCategoriesHeaderPublic.filter((data) => data.parent_id == '')
        // ]);
        setBestCategorys(SCategoriesHeaderPublic);
      }
    }
  }, [SCategoriesHeaderPublic, loading]);

  const getColorCategory = (id_cat) => {
    if (id_cat === id_category)
      return {
        background: 'blue',
        color: 'white'
      };
    return {
      background: 'white',
      color: 'black'
    };
  };

  return !loading ? (
    // <Flex align='center'>
    <>
      <CVCarrusel
        pagination={false}
        navigation={true}
        breakPoints={breakpointsCCategories}
        delay={3000}
        datalist={bestCategorys.map((item) => (
          <Box
            // onClick={() => history.push('/tienda-oficiales/' + item._id)}
            onClick={() =>
              history.push('/productos-de-categoria/' + item?.slug)
            }
            title={item.name}
            backgroundColor={
              id_category == 'all'
                ? COLORS['white']
                : COLORS[getColorCategory(item._id).background]
            }
            padding='1.5rem'
            margin='0 0.5rem'
            key={v4()}
            borderRadius='1rem'
            width='130px'
            _hover={{
              backgroundColor: COLORS['primary'] + '10',
              color: 'black',
              border: '1px solid #00ADF6'
            }}>
            <Flex flexDirection='column' alignItems='center' width='100px'>
              <CVImage
                variant='avatar'
                // image={item.slider || item.image || item.banner}
                image={item.logo || ''}
                name={item.name}
                width='75px'
                height='75px'
              />
              <CVText
                color={getColorCategory(item._id).color}
                variant='maxtext'
                lines={2}
                textAlign='center'>
                {item.name}
              </CVText>
            </Flex>
          </Box>
        ))}
      />
    </>
  ) : (
    <Flex overflow='hidden' gap='10px'>
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              boxSizing: 'border-box',
              borderRadius: '14px'
            }}>
            <ContentLoader
              speed={2}
              width={100}
              height={120}
              viewBox='0 0 307 164'
              backgroundColor='#f3f3f3'
              foregroundColor='#ecebeb'>
              <circle cx='150' cy='65' r='65' />
              <rect x='80' y='155' rx='50' ry='50' width='150' height='10' />
            </ContentLoader>
          </div>
        ))}
    </Flex>
  );
}

export default MCategorias;
