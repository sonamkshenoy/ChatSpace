var bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// configure firebase
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = require('./config.js');
firebase.initializeApp(firebaseConfig);
  

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.post('/signup',function(req, res){
        console.log(req.body.username, req.body.email, req.body.password);
        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var sess = req.session;
            sess.emailid = req.body.email;
            return res.redirect('/notify');
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            return res.redirect('/');
        });
    });

    app.post('/login',function(req, res){
        console.log(req.body.email, req.body.password);
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var sess = req.session;
            sess.emailid = req.body.email;
            // return res.redirect('/chat');
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            return res.redirect('/');
          });
    });
    
}

// MAGIC LINK!