import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/components/App/App';
import { BrowserRouter } from 'react-router-dom';

console.log('hi in indes');
ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'));

