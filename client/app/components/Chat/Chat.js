import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import HeaderComponent from '../Header/header';


class ChatComponent extends Component{
  constructor(props){
    super(props);
    const cookies = new Cookies();
    this.state={
      username: cookies.get("username"),
    }
  }

  componentDidMount(){
    const script = document.createElement("script");
    // script.src = "./chatClient.js";
    script.src = "/app/components/Chat/chatClient.js";
    script.async = true;
    document.body.appendChild(script);
    const script2 = document.createElement("script");
    // script.src = "./chatClient.js";
    script2.src = "/app/components/Auth/tab.js";
    script2.async = true;
    document.body.appendChild(script2);

    // console.log(this.props.location.pathname); // gives the current path
  }

  render(){
  return (
    <div>
      <HeaderComponent history={this.props.history} page="chat"/>
      <div className="container section">
        <h3>Feeling bored?</h3>
        <p>Chat with your friends online! Make sure they are on this page.</p>
      </div>


      <div className="container section" style={{paddingTop:"0px"}}>
        <div id='output' className='section'></div>
        <div id="feedback"></div>
        <div className='input-field'>
          <i className="material-icons prefix">chat</i>
          <p id = 'username' className = 'hide'>{this.state.username}</p>
          <input type="text" id='message'/>
          <label htmlFor="message">Message</label>
        </div>
        <div className="input-field center">
          <button className='btn deep-purple darken-4' id="send">Send</button>
        </div>
        <br/>
      </div>
    </div>
  );
  }
}

export default ChatComponent;
