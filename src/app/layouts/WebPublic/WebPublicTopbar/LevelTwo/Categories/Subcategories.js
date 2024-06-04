import React from 'react';

import { Wrap, WrapItem } from '@chakra-ui/react';
import { SubcategoriesContainer } from './Subcategories.styles';
import Subcategory from './Subcategory';

function Subcategories(props) {
  const { data } = props;

  return (
    <Wrap flexDirection='column-reverse'>
      {data && data.length ? (
        data.map((subcategory, index) => (
          <WrapItem>
            <Subcategory
              id={`Subcategory-${index}`}
              key={`Subcategory-${index}`}
              data={subcategory}
            />
          </WrapItem>
        ))
      ) : (
        <span>Ninguna subcategoría...</span>
      )}
    </Wrap>
  );
}

export default Subcategories;
