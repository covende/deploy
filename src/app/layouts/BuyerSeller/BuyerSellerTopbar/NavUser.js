import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Text
} from '@chakra-ui/react';

import { GiExitDoor } from 'react-icons/gi';

import { svgLogin } from '@/app/assets/images/SVG';
import { CVImage } from '@/common/CovendeTemplate';
import { useDispatch } from 'react-redux';
import {
  A_CARD_PRODUCT,
  set_id_shopping_cart,
  set_number
} from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
import { A_PRODUCTVIEW } from '@CVPages/core/admin/seller/productos/redux/ProductViewAction';
import { getLoggedInUser } from '@/app/helpers/authUtils';

function NavUser({ auth, logout }) {
  let userLogged = auth.user;

  if (!userLogged) userLogged = getLoggedInUser();

  const dispatch = useDispatch();

  return userLogged ? (
    <Menu>
      <MenuButton>
        <CVImage
          name={
            userLogged.first_name != '' && userLogged.last_name != ''
              ? `${userLogged.first_name} ${userLogged.last_name}`
              : userLogged.email
          }
          image={userLogged?.image ? userLogged?.image : null}
          width='50px'
          height='50px'
          variant='avatar'
        />
      </MenuButton>
      <MenuList padding='0px'>
        <Box padding=' 12.8px 12.8px 6.4px 12.8px'>
          <Text fontWeight='bold'>Usuario</Text>
          <Text fontSize='sm'>{userLogged?.last_name}</Text>
          <Text fontSize='sm'>{userLogged?.first_name}</Text>
          <Text fontWeight='bold' marginTop='6.4px'>
            Email
          </Text>
          <Text fontSize='sm'>{userLogged?.email}</Text>
        </Box>
        <MenuDivider />
        <MenuItem
          onClick={async () => {
            await logout();
            dispatch(
              A_PRODUCTVIEW({
                product: {
                  product_id: '',
                  store_id: ''
                }
              })
            );

            // dispatch(
            //   A_CARD_PRODUCT({
            //     lista_carrito: [],
            //     id_car_pay: ''
            //   })
            // );
            dispatch(set_id_shopping_cart(''));
            dispatch(set_number(0));
            dispatch(A_CARD_PRODUCT({ lista_deseos: [] }));
          }}>
          <GiExitDoor />
          &nbsp; Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  ) : (
    <Link to='/iniciar-sesion'>{svgLogin}</Link>
  );
}

export default NavUser;
