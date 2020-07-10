import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import HeaderComponent from '../Header/header';
import axios from 'axios';
import {Link} from 'react-router-dom';



class ChatComponent extends Component{
  constructor(props){
    super(props);
    const cookies = new Cookies();
    this.state={
      username: cookies.get("username"),
      allChats: [],
      displayNum: 5,
      lastNum: 0,
      moreChats: true,
    }

    this.displayMore = this.displayMore.bind(this);
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
    
    axios.post('/retrieveChats', {displayNum:this.state.displayNum, lastNum:this.state.lastNum})
    .then((res)=>{
      // console.log(res);      
      this.setState({
        allChats : res.data.allChats,
        lastNum : this.state.lastNum+this.state.displayNum,
        moreChats: res.data.moreChats,
      });
    })
    .catch(e=>console.log(e));
  }

  displayMore(e){
    e.preventDefault();
    axios.post('/retrieveChats', {displayNum:this.state.displayNum, lastNum:this.state.lastNum})
    .then((res)=>{
      // console.log(res);
      var newChats = res.data.allChats; 
      var oldChatCollections = this.state.allChats;
      for(var j = newChats.length-1; j>=0; --j){
        oldChatCollections.unshift(newChats[j]);
      }     
      this.setState({
        allChats : oldChatCollections,
        lastNum : this.state.lastNum+this.state.displayNum,
        moreChats: res.data.moreChats,
      });
    })
    .catch((e)=>{console.log(e)});
  }

  render(){
    var cookies = new Cookies();
    const allChats = this.state.allChats;
    const allChatsList = allChats.map(chat=>{
      if(chat.person == cookies.get('username'))
        return(
          <p><strong style={{fontWeight:"900"}}>You: {chat.conv}</strong></p>
        );
      else
        return(
        <p>{chat.person}: {chat.conv}</p>
        );
    });

    var moreButton;
    if(this.state.moreChats){
      moreButton = <Link to=""><div style={{textAlign:"center"}}><i onClick={this.displayMore} className="material-icons" style={{textAlign: "center", fontSize:"30px", border:"2px solid black", borderRadius:"50%"}}>arrow_drop_up</i></div></Link>;
    }

    return (
      <div>
        <HeaderComponent history={this.props.history} page="chat"/>
        <div className="container section">
          <h3>Feeling bored?</h3>
          <p>Chat with your friends online! Make sure they are on this page.</p>
        </div>

        <div className="container section" style={{paddingTop:"0px"}}>
          {moreButton}
          <div id='output' className='section'>
            {allChatsList}
          </div>
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
