import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, MenuButton, MenuList, Box, Text } from '@chakra-ui/react';

import { svgLogin } from '@/app/assets/images/SVG';
import { CVBadge } from '@/common/CovendeTemplate';
import { BsEnvelope } from 'react-icons/bs';
import { rolemenu } from '@/app/helpers/role';

function NavMessage(props) {
  const userLogged = props.auth.user;
  return userLogged ? (
    <Menu>
      <Link to={`${rolemenu()}centro-de-mensajeria`}>
        <CVBadge
          content={props.messages || 0}
          icon={<BsEnvelope style={{ fontSize: '3rem' }} />}
          text='Mensajería'
        />
      </Link>
    </Menu>
  ) : (
    <Link to='/iniciar-sesion'>{svgLogin}</Link>
  );
}

export default NavMessage;
