import React from 'react';

// Redux
import { Provider } from 'react-redux';
import { configureStore } from '@/app/redux/store';

// Theme
import { ChakraProvider } from '@chakra-ui/react';
import themeChakraUI from '@/app/configs/themeConfig';

const store = configureStore();

const StyleGuideWrapper = function ({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={themeChakraUI}>{children}</ChakraProvider>
      {/* {children} */}
    </Provider>
  );
};

export default StyleGuideWrapper;
