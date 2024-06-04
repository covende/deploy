import { Box, Button } from '@chakra-ui/react';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';

import {
  AuthBuyerSellerTopbarContainer,
  svgCovendeDotCom,
  referencias
} from './_styles';

function AuthBuyerSellerTopbar(props) {
  const [collapse, setcollapse] = useState(window.screen.width < SCREEN.sm.min);
  return (
    <AuthBuyerSellerTopbarContainer
      marginBottom={!collapse ? '40px' : 'initial'}>
      <Link to='/'>{svgCovendeDotCom}</Link>

      {window.screen.width < SCREEN.sm.min ? (
        <Box
          alignItems='end'
         
          width='calc( 100% - 200px)'
          justifyContent='end'
          display='flex'>
          <Button onClick={() => setcollapse(!collapse)}>
            <GiHamburgerMenu />
          </Button>
        </Box>
      ) : (
        ''
      )}

      {!collapse ? (
        <>
          {referencias.map((referencia, index) => (
            <Link to={referencia.route} key={index}>
              <span style={{ textColor: '#4D4D4D', fontSize: '14px' }}>
                {referencia.name}
              </span>
            </Link>
          ))}
        </>
      ) : (
        ''
      )}
    </AuthBuyerSellerTopbarContainer>
  );
}

export default AuthBuyerSellerTopbar;
