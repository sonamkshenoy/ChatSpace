import React, {Component} from 'react';
import axios from 'axios';


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
    }
    
    handleChange(e){
        const target = e.target;
        const field = target.name;
        const value = target.value;
        this.setState({
            field: value
        });
    }

    handleSignupSubmit(e){
        e.preventDefault();
        const user = {
            username : this.state.signupUsername,
            email : this.state.email,
            password : this.state.password
        };
        axios.post('/signup', {user})
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
    }

    handleLoginSubmit(e){
        e.preventDefault();
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
                                        <input className='validate' type='email' name='email' id='email' />
                                    </div>
                                    </div>
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <label htmlFor='password'>Enter your password</label>
                                        <input className='validate' type='password' name='password' id='password' />
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
                                        <input className='validate' type='text' name='username' onChange={this.handleChange} />
                                        <label htmlFor='username'>What would you like to be called?</label>
                                    </div>
                                    </div>
                        
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='email' name='email' onChange={this.handleChange} />
                                        <label htmlFor='email'>Enter your email</label>
                                    </div>
                                    </div>
                        
                                    <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' type='password' name='password' onChange={this.handleChange} />
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

export default AuthComponent;