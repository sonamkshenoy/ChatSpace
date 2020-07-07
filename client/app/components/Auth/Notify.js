import React, {Component} from 'react';

export default class NotifyComponent extends Component{
    render(){
        return(
            <div className="container">
                <h5>An e-mail has been sent to your email. Please confirm your email id to continue</h5>
                <p> Once done, head over to <a href = "/"> login page </a> and login.</p>
            </div>            
        )
    }
}