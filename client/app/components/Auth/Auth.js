import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class AuthComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loginEmail:'',
            loginPassword: '',
            signupEmail:'',
            signupPassword:'',
            signupUsername:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    
    handleChange(e){
        const target = e.target;
        const field = target.name;
        const value = target.value;
        this.setState({
            [field]: value
        });
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
            console.log(res);
            console.log(res.data);
            this.props.history.push('/notify');
        });
    }

    handleLoginSubmit(e){
        e.preventDefault();
        const user = {
            email : this.state.loginEmail,
            password : this.state.loginPassword
        };
        console.log(this.props.cookies);
        axios.post('/login', user)
        .then(res => {
            console.log(res);
            console.log(res.data);
            console.log(this.props.cookies);
            cookies.set('name','Hoola',{path:'/'});
            console.log(cookies.get('name'));
            this.props.history.push('/chat');
        });
    }

    render(){
        return(
            <div>
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
                                    <a className='pink-text tab' href="" id='createAccount'>Create account</a>
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