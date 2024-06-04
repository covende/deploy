import React, { useEffect } from 'react';

import { Menu, Box } from '@chakra-ui/react';

import { useHistory } from 'react-router';
import { iconwishlist } from './Iconos';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { WISH_LIST_BY_USER_ID } from '@/app/api/graphql/webtopbar/WishlistService';
import { A_CARD_PRODUCT } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { CVBadge } from '@/common/CovendeTemplate';
import { FiHeart } from 'react-icons/fi';
import { CVValidLogin } from '@/common/CovendeTemplate/CVMethods';

function NavWishList({ auth }) {
  const { lista_deseos } = useSelector((state) => state.CardProduct);
  const { BuyerSeller } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const initdata = async (isMounted) => {
    // let us = getLoggedInUser();
    if (auth.user != null && isMounted) {
      const { wishListByUserID } = await AxiosGQL(
        WISH_LIST_BY_USER_ID(auth.user.user_id)
      );
      dispatch(
        A_CARD_PRODUCT({ lista_deseos: wishListByUserID?.products || [] })
      );
    }
  };

  const redirection = () => {
    let url = '/wish-list';
    if (auth.user != null || BuyerSeller.user != null) {
      history.push(url);
    } else {
      CVValidLogin(dispatch, url);
    }
  };

  useEffect(() => {
    let isMounted = true;
    initdata(isMounted);
    return () => (isMounted = false);
  }, []);

  return (
    <Menu>
      <Box
        cursor='pointer'
        onClick={() => redirection()}
        height='100%'
        textAlign='center'>
        <CVBadge
          textAlign='center'
          content={lista_deseos.length || 0}
          text='Lista de Deseos'
          margin='auto'
          icon={
            <svg
              width='40'
              height='29'
              viewBox='0 0 81 73'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M41.09 72.59L37.46 68.46L39.91 66.31C43.05 63.54 46.01 61.02 49.02 58.45L49.21 58.29C56.8 51.8 63.36 46.2 67.83 40.85C72.61 35.15 74.84 29.91 74.84 24.35C74.81 19.28 73.11 14.56 70.05 11.08C66.89 7.48 62.51 5.5 57.7 5.5C50.98 5.5 46.69 9.59 44.28 13.02C43.65 13.91 43.08 14.83 42.59 15.76C42.12 16.66 41.19 17.22 40.17 17.22H40.16C39.15 17.22 38.22 16.67 37.74 15.78C37.2 14.77 36.62 13.85 36.04 13.03C33.63 9.59 29.35 5.5 22.61 5.5C17.82 5.5 13.43 7.48 10.26 11.08C7.19 14.57 5.5 19.29 5.5 24.35C5.5 29.91 7.73 35.16 12.5 40.84C15.96 44.95 20.49 48.96 26.07 53.79L22.47 57.95C16.71 52.96 12.01 48.8 8.3 44.38C2.64 37.65 0 31.28 0 24.35C0 17.95 2.18 11.94 6.13 7.44C10.36 2.64 16.21 0 22.61 0C31.35 0 36.93 4.95 40.15 9.33C43.38 4.96 48.96 0 57.69 0C64.1 0 69.95 2.64 74.17 7.45C78.11 11.93 80.3 17.93 80.33 24.34C80.33 31.28 77.69 37.64 72.04 44.38C67.29 50.07 60.57 55.82 52.79 62.46L52.59 62.63C49.6 65.18 46.65 67.69 43.54 70.43L41.09 72.59Z'
                fill='#004772'
              />
              <path
                d='M33.8999 66.6001C33.2599 66.6001 32.6299 66.38 32.1099 65.93C31.4599 65.37 30.5599 64.6 29.6499 63.83C28.6599 62.99 27.6599 62.14 26.9799 61.54C25.8299 60.55 25.6999 58.8101 26.6999 57.6601C27.6899 56.5101 29.4299 56.38 30.5799 57.37C31.2599 57.95 32.2399 58.7901 33.2299 59.6301C34.1499 60.4101 35.0599 61.18 35.7099 61.75C36.8599 62.74 36.9899 64.4801 35.9999 65.6301C35.4399 66.2801 34.6699 66.6001 33.8999 66.6001Z'
                fill='#004772'
              />
            </svg>
          }
        />
      </Box>
    </Menu>
  );
}

export default NavWishList;
