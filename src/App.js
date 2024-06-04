import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import Routes from '@/common/routes/Routes';
import { LightMode } from '@chakra-ui/color-mode';
import themeChakraUI from '@/app/configs/themeConfig';
import { ThemeProvider } from '@material-ui/core';
import { themeMaterialUI } from './app/configs/MUIThemeConfig';
import * as moment from 'moment';
import { HelmetProvider } from 'react-helmet-async';

const { StaticRouter } = require('react-router-dom');

const isClient =
  typeof window !== 'undefined' && typeof document !== 'undefined';

function App({ location }) {
  const helmetContext = {};
  moment.locale('es');
  return isClient ? (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider theme={themeMaterialUI}>
        <ChakraProvider theme={themeChakraUI}>
          <BrowserRouter>
            <LightMode>
              <Routes />
            </LightMode>
          </BrowserRouter>
        </ChakraProvider>
      </ThemeProvider>
    </HelmetProvider>
  ) : (
    <StaticRouter location={location}>
      <LightMode>
        <Routes />
      </LightMode>
    </StaticRouter>
  );
}

export default App;
