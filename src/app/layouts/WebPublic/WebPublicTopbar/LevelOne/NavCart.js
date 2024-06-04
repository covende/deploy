import React, { useContext, useEffect } from 'react';
import { Menu, Box } from '@chakra-ui/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  A_CARD_PRODUCT,
  set_number
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { fromBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { CVBadge } from '@/common/CovendeTemplate';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CVValidLogin } from '@/common/CovendeTemplate/CVMethods';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { QUANTITY_PRODUCTS_SHOPPING_CART } from '@CVApi/core/webpublic/products/CartService';

function NavCart({ auth }) {
  const { cant_carrito } = useSelector((state) => state.CardProduct);
  // const { BuyerSeller } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const id_car_pay = window.localStorage.getItem('id_car_pay') || '';

  const getNumberItems = async (id, user) => {
    if ((id == '' && user) || id !== '') {
      const { quantityProductsShoppingCart } = await AxiosGQL(
        QUANTITY_PRODUCTS_SHOPPING_CART(id)
      );
      if (quantityProductsShoppingCart)
        dispatch(set_number(quantityProductsShoppingCart));
    }
  };

  useEffect(() => {
    let isMounted = true;

    getNumberItems(id_car_pay, auth.user);

    return () => {
      isMounted = false;
    };
  }, [id_car_pay]);

  const redirection = () => history.push('/carrito-de-compras');

  return (
    <Menu>
      <Box cursor='pointer' onClick={() => redirection()} height='100%'>
        <CVBadge
          content={cant_carrito}
          text='Carrito de Compra'
          icon={
            <svg
              width='40'
              height='29'
              viewBox='0 0 83 75'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_2_9)'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M20.1998 64.1399C18.7584 64.1399 17.5898 65.3084 17.5898 66.7499C17.5898 68.1914 18.7584 69.3599 20.1998 69.3599C21.6413 69.3599 22.8098 68.1914 22.8098 66.7499C22.8098 65.3084 21.6413 64.1399 20.1998 64.1399ZM12.0898 66.7499C12.0898 62.2709 15.7208 58.6399 20.1998 58.6399C24.6789 58.6399 28.3098 62.2709 28.3098 66.7499C28.3098 71.2289 24.6789 74.8599 20.1998 74.8599C15.7208 74.8599 12.0898 71.2289 12.0898 66.7499Z'
                  fill='#004772'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M67.9098 64.1399C66.4683 64.1399 65.2998 65.3084 65.2998 66.7499C65.2998 68.1914 66.4683 69.3599 67.9098 69.3599C69.3513 69.3599 70.5198 68.1914 70.5198 66.7499C70.5198 65.3084 69.3513 64.1399 67.9098 64.1399ZM59.7998 66.7499C59.7998 62.2709 63.4308 58.6399 67.9098 58.6399C72.3888 58.6399 76.0198 62.2709 76.0198 66.7499C76.0198 71.2289 72.3888 74.8599 67.9098 74.8599C63.4308 74.8599 59.7998 71.2289 59.7998 66.7499Z'
                  fill='#004772'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12.2413 7.97974L80.2313 13.7097C81.0594 13.7795 81.8115 14.22 82.2774 14.9081C82.7434 15.5962 82.8732 16.4581 82.6305 17.2529L73.3505 47.6529C72.9974 48.8097 71.9299 49.6 70.7204 49.6H15.838L18.7996 54.31H34.7104V59.81H17.2804C16.3348 59.81 15.4556 59.3243 14.9523 58.5239L8.53234 48.3139C7.99948 47.4664 7.96919 46.3964 8.45327 45.5202C8.93735 44.644 9.85932 44.1 10.8604 44.1H68.6846L76.3759 18.9043L11.7794 13.4603L12.2413 7.97974Z'
                  fill='#004772'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M37.9502 57.0601C37.9502 55.5413 39.1814 54.3101 40.7002 54.3101H49.3002C50.819 54.3101 52.0502 55.5413 52.0502 57.0601C52.0502 58.5788 50.819 59.8101 49.3002 59.8101H40.7002C39.1814 59.8101 37.9502 58.5788 37.9502 57.0601Z'
                  fill='#004772'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M56 54.3101H80V59.8101H56V54.3101Z'
                  fill='#004772'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0 0H12C13.3481 0 14.4974 0.977244 14.7142 2.30781L21.8842 46.3178L16.4558 47.2022L9.66177 5.5H0V0Z'
                  fill='#004772'
                />
              </g>
              <defs>
                <clipPath id='clip0_2_9'>
                  <rect width='83' height='75' fill='white' />
                </clipPath>
              </defs>
            </svg>
          }
          // icon={<AiOutlineShoppingCart style={{ fontSize: '3rem' }} />}
        />
      </Box>
    </Menu>
  );
}

export default NavCart;
