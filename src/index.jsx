/* eslint import/no-extraneous-dependencies: 'off' */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app/App';

const root = document.getElementById('root');

const bootstrap = (Component) => {
  render(
    <AppContainer>
      <Component />
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

