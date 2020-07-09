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
            displayLoginPasswordField:true,
        };

        // defines what the "this" will refer to in these functions. It will refer to the react component. Hence this.state.xxx will refer to the " React class' " state.

        this.handleChange = this.handleChange.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleInitiateResetPassword = this.handleInitiateResetPassword.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
        this.goBackToLogin = this.goBackToLogin.bind(this);
        this.setGoogleClickedCookie = this.setGoogleClickedCookie.bind(this);
    }

    // reload the tab script since it's present in the footer, that's rendered just once. So when you reload the element, event listeners not re-added to it, since only changed part reloads and not the footer.
    componentDidMount(){
        
        const script2 = document.createElement("script");
        script2.src = "https://apis.google.com/js/platform.js";
        script2.defer = true;
        script2.async = true;
        document.body.appendChild(script2);
        const script = document.createElement("script");
        script.src = "/app/components/Auth/tab.js";
        script.async = true;
        document.body.appendChild(script);

        // gapi.signin2.render('g-signin2', {
        //     'scope': 'https://www.googleapis.com/auth/plus.login',
        //     'width': 200,
        //     'height': 50,
        //     'longtitle': true,
        //     'theme': 'dark',
        //     'onsuccess': this. onSignIn
        //   }); 

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

    handleInitiateResetPassword(e){
        e.preventDefault();
        // console.log(e.target);
        // console.log(e.target.onclick);
        // e.target.onclick = this.handleResetPassword;
        this.setState({
            displayLoginPasswordField: false,
            loginError: "",
        });
    }

    handleResetPassword(e){
        e.preventDefault();
        // this.state.loginError = "xxx" // outdated way
        console.log("Inside reset");
        var user = {
            email: this.state.loginEmail,
        };

        axios.post('/resetPassword', user)
        // .then({ // no argument so no arrow (as in arrow function) nor () braces as in normal JS function 
        .then(res=>{
            if(res.status==200){ // status is not accessed as ".data."
                this.setState({
                    loginError : "A link to reset your password has been sent to your email."
                });
            }
            else{
                this.setState({
                    "loginError": res.data.errorMsg.message,
                });
                // console.log("There",res.data.errorMsg);
                // console.log("There",res.data.errorMsg.message);
            }
        })
        .catch(e => {
            console.log("Here",e);
        });
    }

    goBackToLogin(e){
        e.preventDefault();
        this.setState({
            displayLoginPasswordField: true,
            loginError: "",
        });
    }

    setGoogleClickedCookie(e){
        e.preventDefault();
        const cookies = new Cookies();
        cookies.set('googleSignInClicked', true, {path:'/'});
    }

    render(){
        var passwordField;
        var loginTabButton;
        if(this.state.displayLoginPasswordField){
            passwordField = <div className='row'>
                                <div className='input-field col s12'>
                                    <label htmlFor='password'>Enter your password</label>
                                    <input className='validate' type='password' name='loginPassword' onChange={this.handleChange} />
                                </div>
                            </div>;
            
            loginTabButton = <div>
                                <div className='row'>
                                    <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                </div>
                                <Link className='pink-text tab' to="" onClick={this.handleInitiateResetPassword}>Forgot Password?</Link><br/><br/>
                            </div>;
        }
        else{
            loginTabButton = <div>
                               <div className='row'>
                                    <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo' onClick = {this.handleResetPassword}>Reset Password</button>
                                </div>
                                <Link className='pink-text tab' to="" onClick={this.goBackToLogin}><i className="material-icons prefix" style={{verticalAlign:"bottom"}}>arrow_back</i>Back</Link><br/><br/>
                            </div>;
        }

        
        
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
                                    {passwordField}
                                    <br />
                                    <div className="center">
                                    {loginTabButton}
                                    <p className='red-text'>{this.state.loginError}</p><br/>
                                    <div className="g-signin2" onClick={this.setGoogleClickedCookie} data-onsuccess="onSignIn" data-theme="dark"></div>
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