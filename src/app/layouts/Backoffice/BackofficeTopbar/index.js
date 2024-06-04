import React, { useEffect, useState } from 'react';

import { Grid, Container } from '@chakra-ui/react';

// Components
import { svgHamburguesa, svgCovendeBO } from '@/app/assets/images/SVG';
import NavMessage from './NavMessage';
import NavNotification from './NavNotification';
import NavUser from './NavUser';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { MESSAGE_NEWER } from '@/app/api/graphql/webtopbar/MessageManager';

// Assets

function BackofficeTopbar(props) {
  const { sideBarCollapse, setSideBarCollapse } = props;
  const [messages, setmessages] = useState(0);
  const [notifications, setnotifications] = useState(0);
  const collapseSideBar = () => {
    setSideBarCollapse(!sideBarCollapse);
  };
  const initdata = async () => {
    let us = getLoggedInUser();
    if (us) {
      props.auth.user = us;
      const { MessageNewer, NotificacionNewer } = await AxiosGQL(
        MESSAGE_NEWER()
      );
      setmessages(MessageNewer || 0);
      setnotifications(NotificacionNewer || 0);
    }
  };
  useEffect(() => {
    initdata();
  }, [props]);
  return (
    <Container
      backgroundColor='#ffffff'
      maxWidth='100%'
      width='100%'
      padding='8px 10px'
      boxSizing='border-box'
      position='fixed'
      zIndex='50'>
      <Grid templateColumns='repeat(2, 1fr)' gap='8px'>
        <Grid
          templateColumns='repeat(2, max-content)'
          gap='22px'
          alignItems='center'>
          <span onClick={collapseSideBar}>{svgHamburguesa}</span>
          <Link to='/bo'>{svgCovendeBO}</Link>
        </Grid>
        <Grid
          templateColumns='repeat(3, max-content)'
          gap='8px'
          justifyContent='end'>
          <NavMessage {...props} messages={messages} />
          <NavNotification {...props} notifications={notifications} />
          <NavUser {...props} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BackofficeTopbar;
