import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import '../css/App.css';

import ChatComponent from '../Chat/Chat';
import AuthComponent from '../Auth/Auth';
import NotifyComponent from "../Auth/Notify";
import { withCookies } from 'react-cookie';


class App extends Component{
  constructor(props) {
    super(props);
    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth() {
    var cookie = this.props.cookies;
    var name = cookie.get('name')
    if(!name){
      replace('/');
    }
  }

  render(){
    return(
        <div>
          <Switch>
            {/* <Route exact path='/' component={AuthComponent}></Route> */}
            <Route exact path='/' render = {() => (<AuthComponent cookies = {this.props.cookies}/>)}></Route>
            <Route path='/chat' component={ChatComponent}></Route>
            <Route path='/notify' component={NotifyComponent}></Route>
          </Switch>
        </div>    
    );
  }
}

export default withCookies(App);
// export default App;
