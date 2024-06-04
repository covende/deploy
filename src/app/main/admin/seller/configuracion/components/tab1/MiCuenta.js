import useGetPermisions from '@/common/hooks/useGetPermisions';
import { Box, Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import MiManager from './MiManager';
import MiProfile from './MiProfile';
function MiCuenta({ storeID }) {
  const permissions = useGetPermisions('Vender', 'Configuración');
  return (
    <Box>
      <MiProfile storeID={storeID} permissions={permissions} />
      <MiManager storeID={storeID} />
      <br />
      {permissions.crear && (
        <Link to='/seller/configuracion/subcuentas'>
          <Button
            variant='contained'
            style={{
              background: '#004772',
              boxShadow: '2px 5px 9px rgba(0, 0, 0, 0.25)',
              borderRadius: '14px',
              color: '#FFFFFF'
            }}>
            Gestionar Sub-cuentas
          </Button>
        </Link>
      )}
    </Box>
  );
}

export default MiCuenta;
