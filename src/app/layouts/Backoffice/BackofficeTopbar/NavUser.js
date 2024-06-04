import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Box, Flex } from '@chakra-ui/react';

import { svgLogin } from '@/app/assets/images/SVG';
import { GiExitDoor } from 'react-icons/gi';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import { A_PRODUCTVIEW } from '@CVPages/core/admin/seller/productos/redux/ProductViewAction';
import { A_CARD_PRODUCT } from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
import { useDispatch } from 'react-redux';

function NavUser(props) {
  const userLogged = props.auth.user;
  const dispatch = useDispatch();

  return userLogged ? (
    <Flex wrap='wrap' alignItems='center'>
      {window.screen.width >= SCREEN.sm.min ? (
        <>
          <CVText textTransform='capitalize'>{userLogged.last_name}</CVText>{' '}
          <SizeBox />
          <CVText textTransform='capitalize'>{userLogged.first_name}</CVText>
          <SizeBox />
        </>
      ) : (
        <></>
      )}
      <CVImage
        name={userLogged.first_name}
        image={userLogged.image ? userLogged.image : null}
        width='50px'
        height='50px'
        variant='avatar'
      />
      <Box
        marginLeft='8px'
        marginRight='8px'
        onClick={async () => {
          await props.logout();
          dispatch(
            A_PRODUCTVIEW({
              product: {
                product_id: '',
                store_id: ''
              }
            })
          );
          window.localStorage.removeItem('mycart');
          window.localStorage.removeItem('menus');
          dispatch(A_CARD_PRODUCT({ lista_carrito: [] }));
        }}>
        <GiExitDoor style={{ fontSize: '3rem' }} />
      </Box>
    </Flex>
  ) : (
    <Link to='/iniciar-sesion'>{svgLogin}</Link>
  );
}

export default NavUser;
