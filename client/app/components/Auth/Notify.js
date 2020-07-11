import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import HeaderComponent from '../Header/header';

export default class NotifyComponent extends Component{
    render(){
        return(
            <div>
                <HeaderComponent/>
                <div className="container">
                    <h5 style={{margin:"150px 0 150px 0", textAlign:"center"}}>An e-mail has been sent to your email. Please confirm your email id to continue.</h5>
                    <br/>
                    <p style={{textAlign:"center"}}> Once done, head over to {/*<a href = "/">*/} <Link to='/'> login page </Link> and login.</p>
                    <br/><br/>
                </div> 
            </div>           
        )
    }
}