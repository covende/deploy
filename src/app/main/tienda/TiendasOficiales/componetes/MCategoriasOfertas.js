import { Box } from '@chakra-ui/react';

import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CATEGORY_MAIN_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import { CVImage, CVOverflow, CVText } from '@/common/CovendeTemplate';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

function MCategoriasOfertas({ setcategory, fetchdata }) {
  const [bestCategorys, setBestCategorys] = useState([]);
  const [idActive, setIdActive] = useState('');
  const topCategory = async () => {
    const listCategorys = await AxiosGQL(CATEGORY_MAIN_PUBLIC());
    setBestCategorys(listCategorys.categoriesOfferPublic);
  };

  const showData = (id) => {
    setcategory(id);
    fetchdata();
    setIdActive(id);
  };

  useEffect(() => {
    topCategory();
  }, []);
  return (
    <CVOverflow>
      {bestCategorys.map((item) => (
        <Box
          onClick={() => showData(item._id)}
          title={item.name}
          backgroundColor='#FFFFFF'
          padding='1.5rem'
          margin='0 0.5rem'
          key={v4()}
          borderRadius='1rem'
          width='130px'
          border={idActive == item._id ? '2px solid #00ADF6' : ''}
          _hover={{ backgroundColor: COLORS['primary'] + '10' }}>
          <CVImage
            width='75px'
            height='75px'
            image={item.slider || item.image || item.banner}
            name={item.name}
            variant='avatar'
          />

          <CVText variant='maxtext' lines={2} textAlign='center' width='75px'>
            {item.name}
          </CVText>
        </Box>
      ))}
    </CVOverflow>
  );
}

export default MCategoriasOfertas;
