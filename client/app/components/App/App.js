import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ChatComponent from '../Chat/Chat';
import AuthComponent from '../Auth/Auth';
import NotifyComponent from "../Auth/Notify";
import Cookies from 'universal-cookie';
import LayoutComponent from '../Layout/layout';


const PrivateRoute = function({ component: Component, ...rest }){
  var cookies = new Cookies();
  // console.log("Check private route: ", cookies.get("username"), typeof cookies.get('username'));
  return (<Route {...rest} render={(props) => (
    typeof cookies.get('username') !== 'undefined'
      ? <Component {...props} />
      // : <Redirect to='/' />
      : props.history.push('/')
  )} />);
}

// const PrivateRoute2 = function({ component: Component, ...rest }){
//   var cookies = new Cookies();
//   console.log("Check private route: ", cookies.get("username"), typeof cookies.get('username'));
//   return (<Route {...rest} render={(props) => (
//     typeof cookies.get('username') === 'undefined'
//       ? <Component {...props} />
//       // : <Redirect to='/' />
//       : props.history.push('/chat')
//   )} />);
// }

function App(){
    return(
        <div>
          <LayoutComponent>
            <div>
              <Switch>
                {/* <PrivateRoute2 exact path='/' component={AuthComponent}></PrivateRoute2> */}
                <Route exact path='/' component={AuthComponent}></Route>
                <PrivateRoute path='/chat' component={ChatComponent}></PrivateRoute>
                <Route path='/notify' component={NotifyComponent}></Route>
              </Switch>
            </div>          
          </LayoutComponent>
        </div>    
    );
}

export default App;
