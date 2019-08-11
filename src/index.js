import React from 'react';
import { render } from 'react-dom';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';

/* eslint-disable */
if (process.env.NODE_ENV === `production`) {
  console.log = function() {};
  console.info = function() {};
}
/* eslint-enable */

process.on('unhandledRejection', reason => {
  console.warn(`Reason: ${reason}`);
});

window.addEventListener('unhandledrejection', event => {
  event.preventDefault();
  console.warn(`Reason: ${event.reason}`);
});

const target = document.querySelector('#root');
const template = <App />;

render(template, target);
serviceWorker.unregister();
