# ChatSpace  
A chat application built using socket.io and FERN stack (Firebase, Express, React, Node) with authentication. Users can sign in using either their Google account i.e. OAuth2.0 or an email id and password.  

----

## Description  
ChatSpace allows several users to communicate with each other at the same time when they are on the same chat window.  
   
This feature has been implemented using the `socket.io` library. The conversations are stored in the Firestore Database. All conversations on the chat window within 1 hour are stored in the same document (NoSQL). Any conversation which has a time difference of more than 1 hour since the first chat of the most recent conversation is stored in a new document. And similarly all chats up to 1 hour from this new chat will be stored in that newly created document.  
Documents are stored with a name corresponding to the timestamp of the first chat in that conversation (in other words, the time at which the new document was created).  
The chats are stored as a JSON of the username and chat message. One JSON per chat. And one document per conversation.   

(Terminology: Here by the term "chat" I mean to refer to a single message; while by "conversation" I mean to refer to a "series" or "collection" of messages/"chats" exchanged during the course of an interaction. In other words conversation is a collection of chats.)   

Prior to being able to chat, the user has to be authenticated. This is carried out using Firebase Auth. There is a feature to either use  
a) Google Account (OAuth2.0) or   
b) An email and password   
to sign in.   
Several features have been implemented for email-and-password sign in such as i) Verification e-mail on creating an account and ii) Reset Password

----

## Technology Stack   
(FERN stack)  
1. Firebase (Firebase Auth, Firestore database)   
2. Express.js    
3. React  
4. Node.js    
5. Materialize  

----

## Additional Tools (libraries)     
1. Socket.io    

----

## Configuration Files  
All configuration files are placed in a folder called `config` ( ChatSpace > server > config ) which sits right next to the `routes` ( ChatSpace > server > routes ) folder.  
In this folder you are supposed to place 2 files:   

```
ChatSpace  
 |-- server   
 |     |-- old  
 |     |-- routes  
 |     |-- config  
 |     |-- server.js
 |
 |-- client  
 |-- bin  
 
```

a) chatspaceServiceAccountKey.json  
b) config.js   

The contents of each are described below:  

1. chatspaceServiceAccountKey.json:   
The Service Account Key JSON file downloaded from Firebase for your project. Just rename it to `chatspaceServiceAccountKey.json`.  

2. config.js: 
```
const firebaseConfig = {
    apiKey: ...,
    authDomain: ...,
    databaseURL: ...,
    projectId: ...,
    storageBucket: ...,
    messagingSenderId: ...,
    appId: ...,
    measurementId: ...
  };

module.exports = firebaseConfig;
```
Of course, replace `...` with the API credentials of your Firebase app.   

----

## Setting up the project 
1. Make sure you have placed the configuration files in the appropriate folder as described above.   
2. In [chatClient.js](https://github.com/sonamkshenoy/ChatSpace/blob/master/client/app/components/Chat/chatClient.js)  (ChatSpace > client > app > components > Chat > chatClient.js), change the IP address in [Line 2](https://github.com/sonamkshenoy/ChatSpace/blob/f21c68f1bbf25a2eaa61332fa2e33ad5740d0c90/client/app/components/Chat/chatClient.js#L2) to the IP address of the server you are running this project on.   
If you retain it as `localhost` as in Line 1, you won't be able to connect to the socket on other devices. Hence, chatting won't work on other devices though the website still runs if you use `localhost` instead of the IP. In any case, everything will work on the browser in the system you are running the application on.    
3. Run these commands:   
```
npm install  
npm start
```  
4. Once the server begins running successfully, head over to the browser: `localhost:8000` or `<ip_address>:8000`.   


Note: OAuth will only work on the system you are running the website on (server) but not on other devices as long as you are running the website on your local system. This problem won't exist once the website is hosted. (This problem exists since in Firebase you can't add an IP as a JavaScript Origin but only a proper website or `localhost`).   
To be able to use Google to sign in using the IP address, add your own IP (say 192.168.2.2) in Firebase Console -> Authentication -> Sign in Tab -> Authorized Domains.



