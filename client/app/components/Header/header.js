import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

class HeaderComponent extends Component{
    constructor(props){
        super(props);
        var cookies = new Cookies();
        var username = cookies.get('username');
        this.state = {
            username : username,
        }
        console.log("Signout decider",this.state.username);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        e.preventDefault();
        var cookies = new Cookies();
        cookies.remove('username',{'path':'/'});
        this.props.history.push('/');
    }

    render(){
        // let button;
        // if(this.state.username){
        //     button = <li><a onClick = {this.handleClick} href="/">Logout</a></li>;
        // }
        
        return(
            <div>
                <header>
                    <nav className="nav-wrapper deep-purple darken-3">
                        <div className="container">
                        <a href="#" className="brand-logo">The ChatSpace</a>
                        <a href="" className="sidenav-trigger" data-target="mobile-menu"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            {/* <li><a href="/">Home</a></li>
                            <li><a href="/chat">Converse</a></li> */}
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/chat">Converse</Link></li>
                            {/* {button}                          */}
                            <span class="addLogoutHere"></span>
                        </ul>
                        <ul className="sidenav purple darken-4" id="mobile-menu">
                            {/* <li><a href="/">Home</a></li>
                            <li><a href="/chat">Converse</a></li> */}
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/chat">Converse</Link></li>
                            {/* {button} */}
                            <span class="addLogoutHere"></span>
                        </ul>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;