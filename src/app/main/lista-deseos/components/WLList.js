import React, { useEffect, useState } from 'react';

import { Box, Flex } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/react/';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import { DELETE_WISH_FROM_LIST_F } from '@/app/api/graphql/webtopbar/WishlistService';
import { DeleteIconDisabled } from '@CVPages/core/bo/faq/components/assets/WarnIcon';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { PRODUCTS_WISH_LIST_BY_USER } from '@/app/api/graphql/webpublic/products/CartService';
import WLProduct from './WLProduct';
import { formatpaginate } from '@/common/utils/methods';
import CVDataTablePagination from '@CVTemplate/core/CVDataTable/CVDataTablePagination';

function WLList({ search, setLists }) {
  const [listproductos, setlistproductos] = useState([]);
  const [pagination, setPagination] = useState();
  const addToast = useToast();
  const dispatch = useDispatch();
  let us = getLoggedInUser();

  const { whislist_added } = useSelector((state) => state.CardProduct);

  const clearProducts = (productId = '') => {
    if (productId != '') {
      setlistproductos(
        listproductos.filter((product) => product.product_id != productId)
      );
    }
  };

  const initdata = async (page) => {
    if (us != null) {
      const { productsWishListByUser } = await AxiosGQL(
        PRODUCTS_WISH_LIST_BY_USER({ page, user_id: us.user_id, search })
      );
      if (productsWishListByUser.status) {
        setPagination(formatpaginate(productsWishListByUser.info));
        setlistproductos(productsWishListByUser?.productsItemPublic);
        setLists && setLists(productsWishListByUser?.productsItemPublic);
      }
    }
  };

  useEffect(() => {
    initdata(1);
    return () => setlistproductos([]);
  }, [search, whislist_added]);

  const deleteWish = (id) => {
    if (us) {
      DELETE_WISH_FROM_LIST_F({
        user_id: us.user_id,
        products: [id]
      })
        .then((res) => {
          if (res.id)
            CVAlertSuccess({
              addToast,
              message: 'Producto eliminado de la lista de deseo.'
            });
          initdata();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Box backgroundColor={COLORS['white']} padding='1rem' rounded='1rem'>
      {listproductos.map((item) => (
        <WLProduct
          key={v4()}
          item={item}
          update={() => initdata()}
          clearProducts={clearProducts}
          {...{ deleteWish }}
        />
      ))}
      <Flex align='center' justify='end'>
        {pagination ? (
          <CVDataTablePagination
            pagination={pagination}
            fetchdata={initdata}
            selectedPosition='topRight'
            backgroundColor='#00ADF6'
            Download={() => <Box></Box>}
          />
        ) : (
          <></>
        )}
      </Flex>
    </Box>
  );
}

export default WLList;
