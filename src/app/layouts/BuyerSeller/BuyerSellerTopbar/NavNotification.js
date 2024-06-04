import React from 'react';

import { Menu, Box } from '@chakra-ui/react';

import { svgLogin } from '@/app/assets/images/SVG';
import { Link, useHistory } from 'react-router-dom';
import { rolemenu } from '@/app/helpers';
import { CVBadge } from '@/common/CovendeTemplate';
import { BsBell } from 'react-icons/bs';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { READ_NOTIFICATION } from '@CVApi/core/webtopbar/MessageManager';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

function NavNotification(props) {
  const userLogged = getLoggedInUser();
  const history = useHistory();

  const readNotification = () => {
    AxiosGQL(READ_NOTIFICATION())
      .then((res) => console.log({ res }))
      .catch((err) => console.log({ err }));
  };
  return userLogged ? (
    <Menu>
      <Box
        cursor='pointer'
        onClick={() => {
          if (props?.notifications) readNotification();
          history.push(`${rolemenu()}/notificaciones`);
        }}>
        <CVBadge
          content={props.notifications || 0}
          icon={<BsBell style={{ fontSize: '3rem' }} />}
          text='Notificaciones'
        />
      </Box>
    </Menu>
  ) : (
    <Link to='/iniciar-sesion'>{svgLogin}</Link>
  );
}

export default NavNotification;
