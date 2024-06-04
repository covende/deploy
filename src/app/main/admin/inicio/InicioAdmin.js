import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { rolemenu } from '@/app/helpers';

function InicioAdmin(props) {
  const history = useHistory();

  useEffect(() => {
    history.push(rolemenu());
  }, []);
  return <div>InicioAdmin</div>;
}

export default InicioAdmin;
