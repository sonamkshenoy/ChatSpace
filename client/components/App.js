import React, {Component} from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import '../css/App.css';

import ChatComponent from './Chat';


class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/' component={IndexComponent}></Route>
          <Route path='/chat' component={ChatComponent}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

var IndexComponent = function() {
  return (
    <div>
    </div>
  );
}

export default App;
