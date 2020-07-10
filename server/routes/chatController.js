var socket = require('socket.io');

// configure firebase
const admin = require('firebase-admin');
const serviceAccount = require('../config/chatspaceServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Log
const log = require('simple-node-logger').createSimpleFileLogger('project.log');
log.setLevel('info');

module.exports = function(app, server){

    // app.get('/chat', function(req, res){
    //     var sess = req.session;
    //     if(!sess.email){
    //         return res.redirect('/');
    //     }
    //     res.render('chatPage');
    // });

    // additional function to see all conversations if developer wants to
    async function readConversations(){
      const ConversationsCollection = db.collection('Conversations');
      const snapshot = await ConversationsCollection.get();
      snapshot.forEach(doc => {
        log.info(doc.id, '=>', doc.data());
      });
    }

    async function storeConversations(name, conv){
      // "time" field in document only for ordering purposes, else wasn't required. Just Date.parse(document_name) is sufficient. That works! But converting each time string field to time is cumbersome
      
      var newchat = {'Name':name, "Conv":conv};

      // **** Get the latest conversation to check if it took place a long time ago or recently ****
      const ConversationsCollection = db.collection('Conversations')
      const lastOneRes = await ConversationsCollection.orderBy('Time', 'desc').limit(1).get();
      // var DocsCollection;

      // ***** Get current time ****
      var date = new Date();
      var timestamp = date.getTime();
      // console.log("Current timestamp", timestamp);
      var currenttime = timestamp;

      var latestDoc;
      var diffHours;

      // **** Find if the time difference between the latest conversation and current time ****
      var recenttime;
      lastOneRes.forEach(doc =>{
        // console.log("The latest one is",doc.data(), doc.id);
        // console.log("Last one:", doc.data().Time.toMillis());//+19780000);
        // Time.toMillis() same as Time._seconds*1000 (toMillis is a function on Time object. ._seconds is an attribute)
        recenttime = doc.data().Time._seconds * 1000;// + 19780000;
        diffHours = (currenttime - recenttime)/(60*60*1000);

        latestDoc = ConversationsCollection.doc(doc.id);
      })

      /* Extra
      // console.log("Difference in milliseconds:", currenttime - recenttime);
      // console.log("Difference in hours:", (currenttime - recenttime)/(60*60*1000));
      // var diffHours = (currenttime - recenttime)/(60*60*1000);
      // console.log(DocsCollection.data());
      */

      // **** Store in last document if within 1 hour ****
      if(diffHours<=1){
        const unionRes = await latestDoc.update({
          Chats: admin.firestore.FieldValue.arrayUnion(newchat)
        });
      }
      // **** Create new document if current time exceeds that of last document by 1 hour ****
      else{
        const data = {
            Time: date,
            Chats: [ newchat ]
        };

        /* Additional info
        // Add a new document in collection "cities" with ID 'LA'
        // const res = await db.collection('cities').doc('LA').set(data);
        // Give nothing in the brackets [.doc()] if you want to auto generate an id (like in Firebase)
        // const res = await ConversationsCollection.doc(date.toString()).set(data);
        */

        const res = await ConversationsCollection.doc(date.toString()).set(data);
      }

      /* Extra
      // const DocsCollection = ConversationsCollection.doc('CXML1qq0jTYJfX0NWfsU');
      // console.log(lastOneRes.items()[0]); // doesn't work
      // let documentRef = firestore.doc('col/doc');
      */
    }

    var io = socket(server);
    io.on('connection', function(socket){
      log.info('made socket connection');
  
      socket.on('chat',function(data){
        log.info('Emitting  to all '  + data.username + " : "+ data.message);
      //   io.sockets.emit('chat', data);
        storeConversations(data.username, data.message);
        // readConversations();
        socket.broadcast.emit('chat', data);
      });
  
      socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
      });
    });   

    // post request since don't want user to go to this path.
    app.post('/retrieveChats', function(req, res){
      var displayNum = req.body.displayNum;
      var lastNum = req.body.lastNum;
      var startind = 0;
      var countind = 0;
      var sent = false;
      var moreChats = true;

      async function retrieve(){
        try{
          const ConversationsCollection = db.collection('Conversations')
          const allChats = await ConversationsCollection.orderBy('Time','desc').get();
          var allChatsRetrieved = [];
          allChats.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            // console.log(doc.data().Conv);
            var chatsInDoc = doc.data().Chats;
            chatsInDoc.reverse();
            chatsInDoc.forEach((obj)=>{
              ++startind;
              if(startind>lastNum && countind!=displayNum){
                var chatDetail = {person:obj.Name, conv: obj.Conv};
                allChatsRetrieved.unshift(chatDetail); // unshift, not push
                ++countind;
              }
            });           
          });
          // console.log(allChatsRetrieved);
          if(allChatsRetrieved.length==0)
            moreChats = false;

          // line required here too, since sometimes not all displayNum of chats available in which condition the counind = displayNum condition won't be satisfied
          return res.status(200).send({retrieve:"successful",allChats:allChatsRetrieved, moreChats: moreChats});
        }
        catch(e){
          console.log(e);
          return res.status(202).send({error:e});
        }
      }
      
      retrieve();
    })
}