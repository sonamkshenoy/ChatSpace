var socket = require('socket.io');

const admin = require('firebase-admin');
const serviceAccount = require('../config/chatspaceServiceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = function(app, server){

    // app.get('/chat', function(req, res){
    //     var sess = req.session;
    //     if(!sess.email){
    //         return res.redirect('/');
    //     }
    //     res.render('chatPage');
    // });

    async function readConversations(){
      const ConversationsCollection = db.collection('Conversations');
      const snapshot = await ConversationsCollection.get();
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    }

    async function storeConversations(name, conv){
      // "time" field in document only for ordering purposes, else wasn't required. Just Date.parse(document_name) is sufficient. That works! But converting each time string field to time is cumbersome
      
      var newchat = {'Name':name, "Conv":conv};

      const ConversationsCollection = db.collection('Conversations')
      const lastOneRes = await ConversationsCollection.orderBy('Time', 'desc').limit(1).get();
      // var DocsCollection;

      var date = new Date();
      var timestamp = date.getTime();
      console.log("Current timestamp", timestamp);
      var currenttime = timestamp;

      var latestDoc;
      var diffHours;

      var recenttime;
      lastOneRes.forEach(doc =>{
        console.log(doc.data(), doc.id);
        console.log("Last one:", doc.data().Time.toMillis());//+19780000);
        // Time.toMillis() same as Time._seconds*1000 (toMillis is a function on Time object. ._seconds is an attribute)
        recenttime = doc.data().Time._seconds * 1000;// + 19780000;
        diffHours = (currenttime - recenttime)/(60*60*1000);

        latestDoc = ConversationsCollection.doc(doc.id);
      })

      // console.log("Difference in milliseconds:", currenttime - recenttime);
      // console.log("Difference in hours:", (currenttime - recenttime)/(60*60*1000));
      // var diffHours = (currenttime - recenttime)/(60*60*1000);
      // console.log(DocsCollection.data());

      if(diffHours<=1){
        // store in last document if within 1 hour
        const unionRes = await latestDoc.update({
          Chats: admin.firestore.FieldValue.arrayUnion(newchat)
        });
      }
      // create new document if current time exceeds that of last document by 1 hour
      else{
        const data = {
            Time: date,
            Chats: [ newchat ]
        };

        // Add a new document in collection "cities" with ID 'LA'
        // const res = await db.collection('cities').doc('LA').set(data);
        // Give nothing in the brackets [.doc()] if you want to auto generate an id (like in Firebase)
        // const res = await ConversationsCollection.doc(date.toString()).set(data);

        const res = await ConversationsCollection.doc(date.toString()).set(data);
      }

      // const DocsCollection = ConversationsCollection.doc('CXML1qq0jTYJfX0NWfsU');
      // console.log(lastOneRes.items()[0]); // doesn't work
      // let documentRef = firestore.doc('col/doc');
    }

    var io = socket(server);
    io.on('connection', function(socket){
      console.log('made socket connection');
  
      socket.on('chat',function(data){
        console.log('Emitting  to all '  + data.username + " : "+ data.message);
      //   io.sockets.emit('chat', data);
        storeConversations(data.username, data.message);
        // readConversations();
        socket.broadcast.emit('chat', data);
      });
  
      socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
      });
    });   
}