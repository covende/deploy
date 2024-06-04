import React, { Suspense } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { allFlattenRoutes as routes } from '@/app/configs/routesConfig';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
// Components
import Loading from '@/app/components/Loading';

// Helpers
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { isSomeUserRole } from '@/app/helpers/role';
import useGoogleAnalytics from '@/common/hooks/useGoogleAnalytics';
import googleAnalyticsConfig from '@/app/configs/googleAnalyticsConfig';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

const loading = () => <Loading>Cargando...</Loading>;

const currentUser = getLoggedInUser();

function Routes(props) {
  console.log({ props });
  // useGoogleAnalytics(googleAnalyticsConfig);
  // Renderiza el router con la diseño incluido en las rutas
  return (
    <Suspense fallback={<div>Cargando desde Routes.js..</div>}>
      <Switch>
        {routes.map(
          (route, index) =>
            !route.children &&
            (route.roles === undefined ||
              currentUser === null ||
              currentUser === undefined ||
              isSomeUserRole(currentUser, route.roles)) && (
              <route.route
                key={index}
                path={route.path}
                roles={route.roles}
                exact={!!route.exact}
                component={(props) => {
                  const crumbs = routes
                    .filter(({ path }) => props.match.path.includes(path))
                    .map(({ path, ...rest }) => ({
                      path: Object.keys(props.match.params).length
                        ? Object.keys(props.match.params).reduce(
                            (path, param) =>
                              path.replace(
                                `:${param}`,
                                props.match.params[param]
                              ),
                            path
                          )
                        : path,
                      ...rest
                    }))
                    .sort((a, b) => {
                      if (a.path > b.path) {
                        return 1;
                      }
                      if (a.path < b.path) {
                        return -1;
                      }
                      return 0;
                    });
                  return (
                    <Suspense fallback={loading()}>
                      <route.layout crumbs={crumbs} {...props}>
                        <route.component {...props} />
                      </route.layout>
                    </Suspense>
                  );
                }}></route.route>
            )
        )}
        <Route
          component={() => (
            <div
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                color: '#ffffff',
                zIndex: '1000',
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: '0',
                left: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
              <h1>404 - ¡No se encontró!</h1>
              <SizeBox />
              <Link to='/'>
                <HiOutlineArrowNarrowLeft /> <SizeBox /> Home
              </Link>
            </div>
          )}
        />
      </Switch>
    </Suspense>
  );
}

export default Routes;
