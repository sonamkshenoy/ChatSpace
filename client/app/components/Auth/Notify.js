import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderComponent from '../Header/header';

export default class NotifyComponent extends Component{
    render(){
        return(
            <div>
                <HeaderComponent/>
                <div className="container">
                    <h5>An e-mail has been sent to your email. Please confirm your email id to continue.</h5>
                    <p> Once done, head over to {/*<a href = "/">*/} <Link to='/'> login page </Link> and login.</p>
                </div> 
            </div>           
        )
    }
}