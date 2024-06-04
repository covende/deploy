import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import LoadingToRedirect from './LoadingToRedirect';

// Helpers
import { isUserAuthenticated, getLoggedInUser } from '@/app/helpers/authUtils';
import { isSomeUserRole } from '@/app/helpers/role';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const currentUser = getLoggedInUser();
      const isAuthTokenValid = isUserAuthenticated();
      const isBo = rest.location.pathname.split('/')[1] === 'bo';

      if (!isAuthTokenValid) {
        // No ha iniciado sesión
        return (
          <Redirect
            to={{
              pathname: `${isBo ? '/bo/iniciar-sesion' : '/iniciar-sesion'}`,
              state: { from: props.location }
            }}
          />
        );
      }

      // Comprobar si la ruta está restringida por función

      if (roles && !isSomeUserRole(currentUser, roles)) {
        // Rol no autorizado, redirigir a la página de inicio
        // return <Redirect to={{ pathname: '/no-autorizado' }} />;
        // return <LoadingToRedirect />;
      }

      // Autorizado para devolver el componente
      return <Component {...props} />;
    }}
  />
);
