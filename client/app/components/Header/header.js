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
        console.log(this.props);
        if(cookies.get('googleSignInClicked')){
            cookies.remove('googleSignInClicked',{path:'/'});
        }
        this.props.history.push('/');
    }

    render(){
        let Logoutbutton;
        let Homebutton;
        if(this.state.username){
            Logoutbutton = <li><Link onClick = {this.handleClick} to="/">Logout</Link></li>;
        }
        // if(!this.state.username){
        //     Homebutton = <li><Link to="/">Home</Link></li>;
        // }
        
        return(
            <div>
                <header>
                    <nav className="nav-wrapper deep-purple darken-3">
                        <div className="container">
                        <Link to="#" className="brand-logo">ChatSpace</Link>
                        <Link to="" className="sidenav-trigger" data-target="mobile-menu"><i className="material-icons">menu</i></Link>                        
                        <ul className="right hide-on-med-and-down">
                            {/* <li><a href="/">Home</a></li>
                            <li><a href="/chat">Converse</a></li> */}
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/chat">Converse</Link></li>
                            {Logoutbutton}                         
                            {/* <span class="addLogoutHere"></span> */}
                        </ul>
                        <ul className="sidenav purple darken-4" id="mobile-menu">
                            {/* <li><a href="/">Home</a></li>
                            <li><a href="/chat">Converse</a></li> */}
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/chat">Converse</Link></li>
                            {Logoutbutton}
                            {/* <span class="addLogoutHere"></span> */}
                        </ul>
                        </div>
                    </nav>
                    <h1 className='jumbotronTitle'>The World's Best Chatting Space!</h1>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;