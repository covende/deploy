import React from 'react';

import { Container } from '@chakra-ui/react';

import LevelOne from './LevelOne';
import LevelTwo from './LevelTwo';
import MCartList from './LevelOne/modals/MCartList';
import MWishList from './LevelOne/modals/MWishList';
import MLogin from './LevelOne/modals/MLogin';

function WebPublicTopbar(props) {
  return (
    <Container
      padding='0px'
      maxWidth='100%'
      width='100%'
      position='fixed'
      display='grid'
      gridTemplateRows='max-content max-content'
      alignItems='center'
      backgroundColor='#00adf6'
      zIndex='50'
      boxSizing='border-box'
      boxShadow='0px 4px 4px rgba(0, 0, 0, 0.11)'>
      <LevelOne {...props} />
      <LevelTwo />
      <MCartList auth={props.auth} />
      <MWishList auth={props.auth} />
      <MLogin />
    </Container>
  );
}

export default WebPublicTopbar;
