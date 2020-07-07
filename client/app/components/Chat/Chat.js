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

  // reload the tab script since it's present in the footer, that's rendered just once. So when you reload the element, event listeners not re-added to it, since only changed part reloads and not the footer.
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
      <HeaderComponent history={this.props.history}/>
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
      </div>
    </div>
  );
  }
}

export default ChatComponent;
