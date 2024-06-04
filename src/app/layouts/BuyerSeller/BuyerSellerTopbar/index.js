import React, { useEffect, useState } from 'react';

import { Grid, Container, Box } from '@chakra-ui/react';

// Components
import { svgCovende } from '@/app/assets/images/SVG';
import Sidebar from './Sidebar';
import NavMessage from './NavMessage';
import NavNotification from './NavNotification';
import NavHelpCenter from './NavHelpCenter';
import NavUser from './NavUser';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { MESSAGE_NEWER } from '@/app/api/graphql/webtopbar/MessageManager';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import MCartList from '../../WebPublic/WebPublicTopbar/LevelOne/modals/MCartList';

// Assets

function BuyerSellerTopbar(props) {
  const [messages, setmessages] = useState(0);
  const [notifications, setnotifications] = useState(0);

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
    return () => {
      setmessages(0);
      setnotifications(0);
    };
  }, [props]);
  return (
    <>
      <Container
        backgroundColor='#ffffff'
        maxWidth='100%'
        width='100%'
        display='flex'
        padding='8px 18px'
        justifyContent={
          window.screen.width < SCREEN.xs.max ? 'center' : 'space-between'
        }
        alignItems='center'
        boxSizing='border-box'
        position='fixed'
        zIndex='50'>
        <Box display={window.screen.width < SCREEN.xs.max ? 'none' : 'inherit'}>
          <Link to='/'>{svgCovende}</Link>
        </Box>
        <Grid
          templateColumns='repeat(4, max-content)'
          gap='8px'
          justifyContent='end'>
          <NavMessage {...props} messages={messages} />
          <NavNotification {...props} notifications={notifications} />
          <NavHelpCenter {...props} />
          <NavUser {...props} />
          <MCartList auth={props.auth} />
        </Grid>
      </Container>
    </>
  );
}

export default BuyerSellerTopbar;
