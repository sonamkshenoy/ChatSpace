import React, {Component} from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import '../css/App.css';

import ChatComponent from '../Chat/Chat';
import AuthComponent from '../Auth/Auth';

// class AuthComponent extends Component{
//   render(){
//     return(
//       <div>
//         <h1>hello</h1>
//         </div>
//     );
//   }
// }

class App extends Component{
  render(){
    return(
        <div>
          <Switch>
            <Route exact path='/' component={AuthComponent}></Route>
            <Route path='/chat' component={ChatComponent}></Route>
          </Switch>
        </div>    
    );
  }
}

export default App;
