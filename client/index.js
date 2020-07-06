import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

console.log('hi in indes');
ReactDOM.render((
  <CookiesProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </CookiesProvider>
), document.getElementById('root'));

