import React from 'react';
// import { render, hydrate } from 'react-dom';

import * as ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { configureStore } from '@/app/redux/store';
import App from './App';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './custom.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();
// const mountNode = document.getElementById('app');

// if (mountNode.hasChildNodes()) {
//   hydrate(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     mountNode
//   );
// } else {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     mountNode
//   );
// }

ReactDOM.createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
