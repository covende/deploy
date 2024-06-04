import React from 'react';

import { NavCollapsingContentContainer } from './_styles';
import Offers from './Offers';
import Subcategories from './Subcategories';
import Stores from './Stores';

function Categories(props) {
  const { data, value } = props;
  return data && data.length ? (
    <ul>
      {data.map((category, index) => (
        <NavCollapsingContentContainer
          className='category-content'
          id={`NavCollapsingContent-${index}`}
          key={`NavCollapsingContent-${index}`}
          visible={category.id === value}
        >
          {/* <div className='category-content-inner'>
              <div className='category-content'> */}
          <Subcategories data={category.subcategories} />
          <Offers data={category.offers} />
          <Stores data={category.stores} />
          {/* </div>
            </div> */}
        </NavCollapsingContentContainer>
      ))}
    </ul>
  ) : null;
}

export default Categories;
