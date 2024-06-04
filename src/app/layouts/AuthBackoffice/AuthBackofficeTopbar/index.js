import React from 'react';
import { Link } from 'react-router-dom';

import { AuthBackofficeTopbarContainer, svgCovendeDotCom } from './_styles';

function AuthBackofficeTopbar(props) {
  return (
    <AuthBackofficeTopbarContainer>
      <Link to='/bo'>{svgCovendeDotCom}</Link>
      <Link to='/bo'>
        <span style={{ textColor: '#004772', fontSize: '30px' }}>
          BACKOFFICE DE ADMINISTRADORES
        </span>
      </Link>
    </AuthBackofficeTopbarContainer>
  );
}

export default AuthBackofficeTopbar;
