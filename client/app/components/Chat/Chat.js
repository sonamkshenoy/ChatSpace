import React, {Component} from 'react';
import '../css/App.css';

class ChatComponent extends Component{

  componentDidMount(){
    const script = document.createElement("script");
    // script.src = "./chatClient.js";
    script.src = "/app/components/Chat/chatClient.js"
    script.async = true;
    document.body.appendChild(script);
  }

  render(){
  return (
    <div>
      <div className="container section">
        <h3>Feeling bored?</h3>
        <p>Chat with your friends online! Make sure they are on this page.</p>
      </div>


      <div className="container section" style={{paddingTop:"0px"}}>
        <div id='output' className='section'></div>
        <div id="feedback"></div>
        <div className='input-field'>
          <i className="material-icons prefix">chat</i>
          <input type="text" id='message'/>
          <label htmlFor="message">Message</label>
        </div>
        <div className="input-field center">
          <button className='btn deep-purple darken-4' id="send">Send</button>
        </div>
      </div>
    </div>
  );
  }
}

export default ChatComponent;
