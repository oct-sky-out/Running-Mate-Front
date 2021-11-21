import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './modules/index';
import App from './App';
import './index.css';

render(
  <React.StrictMode>
    <Provider store={store()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
