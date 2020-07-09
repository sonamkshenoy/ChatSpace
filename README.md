# Chat-Space  
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
All configuration files are placed in a folder called `config` ( ChatSpace > server > routes ) which sits right next to the `routes` ( ChatSpace > server > routes ) folder.  
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
2. Run these commands:   
```
npm install  
npm start
```



