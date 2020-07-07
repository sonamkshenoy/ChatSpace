import React, {Component} from 'react';
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import HeaderComponent from '../Header/header';


class AuthComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loginEmail:'',
            loginPassword: '',
            loginError:'',
            signupEmail:'',
            signupPassword:'',
            signupUsername:'',
            signupError:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    // reload the tab script since it's present in the footer, that's rendered just once. So when you reload the element, event listeners not re-added to it, since only changed part reloads and not the footer.
    componentDidMount(){
        const script = document.createElement("script");
        script.src = "/app/components/Auth/tab.js"
        script.async = true;
        document.body.appendChild(script);
      }
    
    handleChange(e){
        const target = e.target;
        const field = target.name;
        const value = target.value;
        this.setState({
            [field]: value,
            "loginError" : "",
            "signupError" : ""
        }); // last two lines to remove error msg when user starts correcting error
    }

    handleSignupSubmit(e){
        e.preventDefault(); // this is what prevents form parameters from appearing in the url (like in a get request)
        const user = {
            username : this.state.signupUsername,
            email : this.state.signupEmail,
            password : this.state.signupPassword
        };
        axios.post('/signup', user)
        .then(res => {
            if(res.status==200){
                console.log(res);
                console.log(res.data);
                this.props.history.push('/notify');
            }
            else{
                this.setState({
                    "signupError":res.data.errorMsg
                });
            }            
        })
        .catch(e => {
            console.log(e);
        });
    }

    handleLoginSubmit(e){
        e.preventDefault();
        const user = {
            email : this.state.loginEmail,
            password : this.state.loginPassword
        };        
        axios.post('/login', user)
        .then(res => {
            if(res.status==200){
                console.log(res);
                console.log(res.data);   
                const cookies = new Cookies();
                cookies.set('username', res.data.username, {path:'/'});
                console.log(cookies.get('username'));
                console.log(this.props);             
                this.props.history.push('/chat');
            }
            else{
                console.log(res.data);
                this.setState({
                    "loginError":res.data.errorMsg
                });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    render(){
        return(
            <div>
                <HeaderComponent/>
                <div className = "center">
                    <h5 className="indigo-text">Please, login into your account</h5>
                    <div className="col s12">
                        <ul className="tabs" id="tabs-swipe-demo">
                            <li className="tab col s3"><a className="indigo-text active" href="#test-swipe-2">Login</a></li>
                            <li className="tab col s3"><a className="indigo-text " href="#test-swipe-4">Signup</a></li>
                        </ul>
                    </div>

                    <div id="test-swipe-2" className="col s12">
                        <div className="container">
                            <div className="z-depth-1 grey lighten-4 row" style={{padding: "32px 48px 0px 48px", border: "1px solid #EEE"}}>
                                <form className="col s12" onSubmit={this.handleLoginSubmit}>
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <label htmlFor='email'>Enter your email</label>
                                        <input className='validate' type='email' name='loginEmail' onChange={this.handleChange} />
                                    </div>
                                    </div>
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <label htmlFor='password'>Enter your password</label>
                                        <input className='validate' type='password' name='loginPassword' onChange={this.handleChange} />
                                    </div>
                                    </div>
                                    <br />
                                    <div className="center">
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                    </div>
                                    <p className='red-text'>{this.state.loginError}</p><br/>
                                    <Link className='pink-text tab' to="" id='createAccount'>Create account</Link>
                                    <br/><br/><br/>
                                    </div>
                                </form>   
                            </div>
                        </div>
                    </div> 
                    <div id="test-swipe-4" className="col s12">
                        <div className="container">
                            <div className="z-depth-1 grey lighten-4 row" style={{padding: "32px 48px 0px 48px", border: "1px solid #EEE"}}>
                    
                                <form className="col s12" onSubmit={this.handleSignupSubmit}>
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='text' name='signupUsername' onChange={this.handleChange} />
                                        <label htmlFor='username'>What would you like to be called?</label>
                                    </div>
                                    </div>
                        
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='email' name='signupEmail' onChange={this.handleChange} />
                                        <label htmlFor='email'>Enter your email</label>
                                    </div>
                                    </div>
                        
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='signupPassword' onChange={this.handleChange} />
                                        <label htmlFor='password'>Enter your password</label>
                                    </div>
                                    </div>

                                    <div className="center">
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Sign up</button>
                                    </div>
                                    <p className='red-text'>{this.state.signupError}</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>  
                </div>          
            </div>            
        )
    }
}

export default withRouter(AuthComponent);