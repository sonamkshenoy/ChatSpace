$(document).ready(function(){
    $('.tabs').tabs();
    $("#createAccount").click(function(e) {
        e.preventDefault();
        $('ul.tabs').tabs('select', 'test-swipe-4');
    });
    $('.sidenav').sidenav();
});

// function onSignIn(googleUser) {
//     console.log('Google Auth Response', googleUser);
//     // We need to register an Observer on Firebase Auth to make sure auth is initialized.
//     var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
//       unsubscribe();
//       // Check if we are already signed-in Firebase with the correct user.
//       if (!isUserEqual(googleUser, firebaseUser)) {
//         // Build Firebase credential with the Google ID token.
//         var credential = firebase.auth.GoogleAuthProvider.credential(
//             googleUser.getAuthResponse().id_token);
//         // Sign in with credential from the Google user.
//         firebase.auth().signInWithCredential(credential).catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // The email of the user's account used.
//           var email = error.email;
//           // The firebase.auth.AuthCredential type that was used.
//           var credential = error.credential;
//           // ...
//         });
//       } else {
//         console.log('User already signed-in Firebase.');
//       }
//     });
//   }

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//   }
  