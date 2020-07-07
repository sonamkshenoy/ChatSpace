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
                sess.userName = user.displayName;
                return res.status(200).send({"login":"successful"});
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
    
}

// MAGIC LINK!