import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, Flex, Box } from '@chakra-ui/react';
import { RiShutDownLine } from 'react-icons/ri';
import { BiUser } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { CVBadge, CVButton, CVImage, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  A_CARD_PRODUCT,
  set_id_shopping_cart,
  set_number
} from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
import { A_PRODUCTVIEW } from '@CVPages/core/admin/seller/productos/redux/ProductViewAction';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function NavUser({ auth, logout }) {
  const [isHover, setisHover] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  return auth.user ? (
    <Menu>
      <MenuButton>
        <Box height='100%'>
          <Flex flexDirection='column' alignItems='center'>
            <CVImage
              height='3.5rem'
              width='3.5rem'
              variant='avatar'
              image={auth.user.image ? auth.user.image : null}
              name={
                auth.user.first_name != '' && auth.user.last_name != ''
                  ? `${auth.user.first_name} ${auth.user.last_name}`
                  : auth.user.email
              }
            />
            <CVText color='blue' fontSize='0.75rem'>
              {auth.user.first_name}
            </CVText>
          </Flex>
        </Box>
      </MenuButton>
      <MenuList padding='0px'>
        <Box padding='1rem' border='1px solid #ECECEC'>
          <CVText>
            <Link to='/admin'>Mi Cuenta</Link>
          </CVText>
          <CVText>
            <Link to='/admin'>Editar Perfil</Link>
          </CVText>
          <SizeBox />
          <CVText fontWeight='bold'>Usuario</CVText>
          <CVText>
            {auth.user.last_name} {auth.user.first_name}
          </CVText>
        </Box>
        <Box
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
            dispatch(set_id_shopping_cart(''));
            dispatch(set_number(0));
            dispatch(A_CARD_PRODUCT({ lista_deseos: [] }));
            history.push('/');
            // window.localStorage.removeItem('mycart');
            // dispatch(A_CARD_PRODUCT({ lista_carrito: [] }));
          }}
          padding='0'
          border='1px solid #ECECEC'>
          <CVButton
            width='100%'
            fontWeight='bold'
            backgroundColor={isHover ? 'blue' : 'lightGray'}
            color={isHover ? 'white' : 'black'}
            borderRadius='0'
            onHover={(hover) => setisHover(hover)}>
            <RiShutDownLine />
            <SizeBox /> Cerrar sesión
          </CVButton>
        </Box>
      </MenuList>
    </Menu>
  ) : (
    // <Link to='/iniciar-sesion'>
    <Box height='100%' cursor='pointer'>
      <Link to='/iniciar-sesion'>
        <CVBadge
          text='Identifícate'
          icon={
            <svg
              width='40'
              height='29'
              viewBox='0 0 80 81'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M39.8004 5.5C30.881 5.5 23.6504 12.7306 23.6504 21.65C23.6504 30.5694 30.881 37.8 39.8004 37.8C48.7198 37.8 55.9504 30.5694 55.9504 21.65C55.9504 12.7306 48.7198 5.5 39.8004 5.5ZM18.1504 21.65C18.1504 9.69304 27.8434 0 39.8004 0C51.7574 0 61.4504 9.69304 61.4504 21.65C61.4504 33.607 51.7574 43.3 39.8004 43.3C27.8434 43.3 18.1504 33.607 18.1504 21.65Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M22.2887 41.8412C23.2005 41.3938 24.2847 41.4855 25.1085 42.0796C29.2463 45.0635 34.317 46.8201 39.81 46.8201C45.2921 46.8201 50.3534 45.064 54.4824 42.0889C55.3066 41.495 56.3912 41.4039 57.3029 41.852C70.4771 48.3264 79.56 61.8813 79.56 77.5701V80.0301H74.06V77.5701C74.06 64.6207 66.8795 53.3487 56.2762 47.5163C51.5222 50.5535 45.8717 52.3201 39.81 52.3201C33.7383 52.3201 28.077 50.553 23.312 47.5059C13.4487 52.9224 6.54468 63.0369 5.60869 74.8301H52.49V80.3301H2.75C1.23122 80.3301 0 79.0989 0 77.5801C0 61.8806 9.09365 48.3153 22.2887 41.8412Z'
                fill='#004772'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M56.21 77.5801C56.21 76.0613 57.4412 74.8301 58.96 74.8301H67.63C69.1487 74.8301 70.38 76.0613 70.38 77.5801C70.38 79.0989 69.1487 80.3301 67.63 80.3301H58.96C57.4412 80.3301 56.21 79.0989 56.21 77.5801Z'
                fill='#004772'
              />
            </svg>
          }
        />
      </Link>
    </Box>
    // </Link>
  );
}

export default NavUser;
