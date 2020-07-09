var bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();

// configure firebase
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = require('../config/config.js');
firebase.initializeApp(firebaseConfig);
  

module.exports = function(app){

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.post('/signup',function(req, res){
        console.log(req.body.username, req.body.email, req.body.password);

        async function allAuthProcedure(){
            // Create account
            try{
                await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password);
            }
            catch(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage);
                return res.status(202).send({"errorMsg":errorMessage});
            }

            var user = firebase.auth().currentUser;

            // Set display name
            try{
                await user.updateProfile({
                    displayName: req.body.username
                })
            }
            catch(e){
                console.log(e);
                return res.status(202).send({"errorMsg":e}); // returning so doesn't go till res.status(200)
            }

            // Send confirmation email
            try{
                // https://firebase.google.com/docs/auth/web/manage-users
                await user.sendEmailVerification();
            }
            catch(e){
                console.log(e);
                return res.status(202).send({"errorMsg":e});
            }

            // execute inside the async function and not after the call, since that may get executed first
            return res.status(200).send({"signup":"successful"});
        }

        allAuthProcedure();        
    });

    app.post('/login',function(req, res){
        console.log(req.body.email, req.body.password);
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .then(function(){
            var user = firebase.auth().currentUser;
            if(user.emailVerified){
                var sess = req.session;
                sess.emailid = req.body.email;
                // sess.userName = user.displayName;
                return res.status(200).send({"login":"successful", "username": user.displayName});
            }
            else{
                console.log("Not verified");
                return res.status(202).send({"errorMsg":"You have not confirmed your email address. Please confirm you email address by clicking on the verification link sent to your email."});
            }
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            return res.status(202).send({"errorMsg":errorMessage});
          });
    });

    app.post('/resetPassword', function(req, res){
        // https://firebase.google.com/docs/auth/web/manage-users
        var auth = firebase.auth();
        var sess = req.session;
        var emailAddress = req.body.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log("Reset link sent successfully");
            return res.status(200).send({"resetSend":"successful"});
        }).catch(function(error) {
            return res.status(202).send({errorMsg:error});
        });
    });
    
    app.post('/authWithGoogle', function(req, res){

        async function createGoogleUser(){
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(req.body.id_token);

            // Sign in with credential from the Google user.
            try{
                var resp = await firebase.auth().signInWithCredential(credential);            
                console.log("User created using Google");
            }
            catch(error){
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            }
            var user = firebase.auth().currentUser;
            console.log(user.displayName);

            // Don't have to set display name (Google already does it for us - hence it's displaying in the console.log above though I didn't add)
            // try{
            //     await user.updateProfile({
            //         displayName: req.body.username
            //     })
            // }
            // catch(e){
            //     console.log(e);
            //     return res.status(202).send({"errorMsg":e}); // returning so doesn't go till res.status(200)
            // }
        }

        createGoogleUser();            
          
    });
}

// MAGIC LINK!