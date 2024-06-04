import React from 'react';

import { Menu } from '@chakra-ui/react';

import { svgLogin } from '@/app/assets/images/SVG';
import { Link } from 'react-router-dom';
import { rolemenu } from '@/app/helpers';
import { CVBadge } from '@/common/CovendeTemplate';
import { BsEnvelope } from 'react-icons/bs';
import { getLoggedInUser } from '@/app/helpers/authUtils';

function NavMessage(props) {
  const userLogged = getLoggedInUser();
  return userLogged ? (
    <Menu>
      <Link to={`${rolemenu()}/mensajes`}>
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
