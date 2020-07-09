# Chat-Space  
A chat application built using socket.io with authentication with FERN stack (Firebase, Express, React, Node). Users can sign in using either their Google account i.e. OAuth2.0 or and email id and password.  


## Description  
ChatSpace allows several users to communicate with each other at the same time when they are on the same chat window. This feature has been implemented using the `socket.io` library. The conversations are stored in the Firestore Database. All conversations on the chat window within 1 hour are stored in the same document (NoSQL). Any conversation which has a time difference of more than 1 hour since the most recent conversation is stored in a new document. And similarly all conversations from that particular chat up to 1 hour from them will be stored in that newly created document. Documents are stored with a name corresponding to the time of the first conversation in the chat (in other words, the time at which the new document was created).  
The conversations are stored as a JSON of the username and chat message. One JSON per conversation.  

Prior to being able to chat, user has to be authenticated. This is carried out using Firebase Auth. There is a feature to either use  
a) Google Account (OAuth2.0) or 
b) An email and password  
to sign in.  
Several features have been implemented for email-and-password sign in such as i) Verification e-mail on creating an account and ii) Reset Password

## Technology Stack   
(FERN stack)  
1. Firebase (Firebase Auth, Firestore database)   
2. Express.js    
3. React  
4. Node.js    
5. Materialize  

## Additional Tools (libraries)     
1. Socket.io    

## Running the project  
```
node app
```

## Configuration Files
`dot.env` contains all the variables to be set before running the app.  
Create a `.env` file with these variables.


