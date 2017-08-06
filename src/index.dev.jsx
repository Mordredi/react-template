/* eslint import/no-extraneous-dependencies: 'off' */

import 'normalize-scss';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';
import App from './app/App';

const root = document.getElementById('root');

const bootstrap = (Component) => {
  render(
    <AppContainer>
      <Router>
        <Component />
      </Router>
    </AppContainer>,
    root,
  );
};

bootstrap(App);

if (module.hot) {
  module.hot.accept('./app/App', () => {
    bootstrap(App);
  });
}

