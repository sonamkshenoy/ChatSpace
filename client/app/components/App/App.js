import React, {Component} from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import '../css/App.css';

import ChatComponent from '../Chat/Chat';
import AuthComponent from '../Auth/Auth';
import NotifyComponent from "../Auth/Notify";

class App extends Component{
  render(){
    return(
        <div>
          <Switch>
            <Route exact path='/' component={AuthComponent}></Route>
            <Route path='/chat' component={ChatComponent}></Route>
            <Route path='/notify' component={NotifyComponent}></Route>
          </Switch>
        </div>    
    );
  }
}

export default App;
