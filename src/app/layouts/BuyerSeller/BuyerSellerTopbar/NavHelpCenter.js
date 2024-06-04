import React from 'react';

import { Menu, MenuButton } from '@chakra-ui/react';

import { svgLogin } from '@/app/assets/images/SVG';
import { Link } from 'react-router-dom';
import { IoBagHandleOutline } from 'react-icons/io5';
import { CVBadge } from '@/common/CovendeTemplate';
import CVLink from '@CVTemplate/core/CVLink';
import { rolesidebar } from '@/app/helpers/role';
import { getLoggedInUser } from '@/app/helpers/authUtils';

function NavHelpCenter(props) {
  const userLogged = getLoggedInUser();
  const getRole =
    rolesidebar() == 'Vender'
      ? 'seller'
      : rolesidebar() == 'Comprar'
      ? 'buyer'
      : 'bo';
  return userLogged ? (
    <Menu>
      <CVLink href={`/${getRole}/CentroAyuda`}>
        <CVBadge
          icon={<IoBagHandleOutline style={{ fontSize: '3rem' }} />}
          text='Centro de Ayuda'
        />
      </CVLink>
    </Menu>
  ) : (
    <Link to='/iniciar-sesion'>{svgLogin}</Link>
  );
}

export default NavHelpCenter;
